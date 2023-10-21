import os
import json
import query_APIs
from remove_params import filter_json
from dotenv import load_dotenv
from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from models import Base, City, Shelter, Medicare
from geopy.distance import geodesic
from tqdm import tqdm

load_dotenv("../.env")
user = os.getenv("db_username")
password = os.getenv("db_password")
url = os.getenv("db_url")
port = os.getenv("db_port")
database = os.getenv("db_database")
# Define the MySQL connection URL
mysql_url = f"mysql+mysqlconnector://{user}:{password}@{url}:{port}/{database}"

# Create a SQLAlchemy engine
engine = create_engine(mysql_url)

# Drop all existing tables so we can make new ones
print("dropping tables")
Base.metadata.drop_all(engine)

# Create the tables in the database
print("creating new tables")
Base.metadata.create_all(engine)

with open("coords.json") as city_coords:
    city_longitude_latitudes = json.load(city_coords)

# Add to city table
print("adding cities")
cities = filter_json(query_APIs.query_API("cities"), ["CSA_Label", "Total_Unsheltered_Pop", 
    "Total_Sheltered_Pop", "Total_Pop", "Square_Miles", "Density_Unsheltered", " Density_Sheltered", "Density_Total"])
with Session(engine) as session:
    for city_info in cities:
        if city_info["csa_label"] not in city_longitude_latitudes:
            print("Skipping city", city_info["csa_label"])
            continue
        city = City(**city_info)
        session.add(city)
    session.commit()

# Add to shelter table
print("adding shelters")
shelters = filter_json(query_APIs.query_API("shelters"), ["Name", "addrln1", "hours", 
    "phone", "url", "post_id", "description", "zip", "link", "latitude", "longitude", "date_updated"])
with Session(engine) as session:
    for shelter_info in shelters:
        shelter = Shelter(**shelter_info)
        session.add(shelter)
    session.commit()

# Add to medicare table
print("adding medicare")
medicares = filter_json(query_APIs.query_API("medicare"), ["Name", "addrln1", "addrln2", 
    "hours", "phones", "post_id", "description", "zip", "latitude", "longitude", "date_updated"])
with Session(engine) as session:
    for medicare_info in medicares:
        medicare = Medicare(**medicare_info)
        session.add(medicare)
    session.commit()

def find_closest(location, all_locations):
    closest_location = None
    closest_distance = float("inf")
    # Shelters and Medicare offices have a latitude and longitude, city objects
    # do not, so we need to read them from the city longitude latitude json
    if hasattr(location, "latitude"):
        target_location = (location.latitude, location.longitude)
    else:
        target_location = city_longitude_latitudes[location.csa_label]
    
    for place in all_locations:
        if hasattr(place, "latitude"):
            curr_location = (place.latitude, place.longitude)
        else:
            curr_location = city_longitude_latitudes[place.csa_label]
        distance = geodesic(target_location, curr_location).miles
        if distance < closest_distance:
            closest_distance = distance
            closest_location = place

    return closest_location

# Establish Relationships for medicare to shelter and vice versa:
with Session(engine) as session:
    shelters = session.query(Shelter).all()
    medicares = session.query(Medicare).all()
    cities = session.query(City).all()

    print("adding closest medicare and city to shelters")
    for shelter in tqdm(shelters):
        shelter.closest_medicares.insert(0, find_closest(shelter, medicares))

        shelter.city = find_closest(shelter, cities).csa_label
    
    print("adding closest shelter and city to medicares")
    for medicare in tqdm(medicares):
        medicare.closest_shelters.insert(0, find_closest(medicare, shelters))

        medicare.city = find_closest(medicare, cities).csa_label

    print("adding closest shelter and medicare to cities")
    for city in tqdm(cities):
        city.shelter = find_closest(city, shelters).name
        city.medicare = find_closest(city, medicares).name

    session.commit()

