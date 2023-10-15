import os
import query_APIs
from remove_params import filter_json

from dotenv import load_dotenv
from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from models import Base, City, Shelter, Medicare
    

load_dotenv("../.env")
user = os.getenv("db_username")
passwd = os.getenv("db_password")
url = os.getenv("db_url")
# Define the MySQL connection URL
mysql_url = f"mysql+mysqlconnector://{user}:{passwd}@{url}:3306/idbdatabase"

# Create a SQLAlchemy engine
engine = create_engine(mysql_url)
# Create a dummy session to test connection
with Session(engine) as session:
    print("successfully connected!")

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
shelters = filter_json(query_APIs.query_API("shelters"), ["name", "addrln1", "city", "hours", 
    "phone", "url", "post_id", "description", "zip", "link", "latitude", "longitude", "date_updated"])

with Session(engine) as session:
    for shelter_info in shelters:
        shelter = Shelter(**shelter_info)
        session.add(city)
    session.commit()

#Add to medicare table
print("adding medicare")
medicares = filter_json(query_APIs.query_API("medicare"), ["Name", "addrln1", "addrln2", "city", 
    "hours", "phones", "post_id", "description", "zip", "latitude", "longitude", "date_updated"])

with Session(engine) as session:
    for medicare_info in medicares:
        medicare = Medicare(**medicare_info)
        session.add(medicare)
    session.commit()
# Checking that everything is in database
print("Checking database for cities, shelters, and medicare locations")
with Session(engine) as session:
    cities = session.query(City).all()
    for city in cities:
        print(city)
        
with Session(engine) as session:
    shelters = session.query(Shelter).all()
    for shelter in shelters:
        print(shelter)

with Session(engine) as session:
    medicares = session.query(Medicare).all()
    for medicare in medicares:
        print(medicare)