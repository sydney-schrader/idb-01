import os
import query_APIs
from remove_params import filter_json
from dotenv import load_dotenv
from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from models import Base, City, Shelter, Medicare
from geopy.distance import geodesic
    

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

# Add to city table
print("adding cities")
cities = filter_json(query_APIs.query_API("cities"), ["CSA_Label", "Total_Unsheltered_Pop", 
    "Total_Sheltered_Pop", "Total_Pop", "Square_Miles", "Density_Unsheltered", " Density_Sheltered", "Density_Total"])
with Session(engine) as session:
    for city_info in cities:
        city = City(**city_info)
        session.add(city)
    session.commit()

# Add to shelter table
print("adding shelters")
shelters = filter_json(query_APIs.query_API("shelters"), ["Name", "addrln1", "city", "hours", 
    "phone", "url", "post_id", "description", "zip", "link", "latitude", "longitude", "date_updated"])
with Session(engine) as session:
    for shelter_info in shelters:
        shelter = Shelter(**shelter_info)
        session.add(shelter)
    session.commit()

# Add to medicare table
print("adding medicare")
medicares = filter_json(query_APIs.query_API("medicare"), ["Name", "addrln1", "addrln2", "city", 
    "hours", "phones", "post_id", "description", "zip", "latitude", "longitude", "date_updated"])
with Session(engine) as session:
    for medicare_info in medicares:
        medicare = Medicare(**medicare_info)
        session.add(medicare)
    session.commit()

def dist(x1, y1, x2, y2):
    return ((x1-x2)**2 + (y1-y2)**2)**.5

def find_closest(location, all_locations):
    closest_location = None
    closest_distance = float("inf")
    target_location = (location.latitude, location.longitude)
    
    for place in all_locations:
        curr_location = (place.latitude, place.longitude)
        distance = geodesic(target_location, curr_location).miles
        if distance < closest_distance:
            closest_distance = distance
            closest_location = place

    return closest_location

# Establish Relationships for medicare to shelter and vice versa:
with Session(engine) as session:
    shelters = session.query(Shelter).all()
    medicares = session.query(Medicare).all()

    for shelter in shelters:
        closest_medicare = find_closest(shelter, medicares)
        
        shelter.medicare_name = closest_medicare.name
        shelter.medicare_addrln1 = closest_medicare.addrln1
        shelter.medicare_addrln2 = closest_medicare.addrln2
        shelter.medicare_hours = closest_medicare.hours
    
    for medicare in medicares:
        closest_shelter = find_closest(medicare, shelters)

        medicare.shelter_name = closest_shelter.name
        medicare.shelter_addrln1 = closest_shelter.addrln1
        medicare.shelter_addrln2 = closest_shelter.addrln2
        medicare.shelter_hours = closest_shelter.hours


    session.commit()