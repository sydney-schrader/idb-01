import os
import json


from dotenv import load_dotenv
from sqlalchemy import create_engine
from query_APIs import query_API
from remove_params import filter_json

from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

from models import Base, City, Shelter, Medicare

hostname = "idbdatabase"

# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURN THE SQLACHEMY ENGINE OBJECT
# REQUIRES my-sql-connector
def get_connection():
    # DEFINE THE DATABASE CREDENTIALS (bad practice but whatever)
    load_dotenv("../.env")
    user = os.getenv("db_username")
    password = os.getenv("db_password")
    host = os.getenv("db_url")
    port = 3306
    database = 'idbdatabase'
    url = "mysql+mysqlconnector://{0}:{1}@{2}:{3}/{4}".format(user, password, host, port, database)
    print(url)
    return create_engine(url)

def printDatabase(engine):
    Session = sessionmaker(bind=engine)
    session = Session()
    # Query the database and print everything in the table
    all_cities = session.query(City).all()
    for city in all_cities:
        print(city)
    all_shelter = session.query(Shelter).all()
    for shelter in all_shelter:
        print(shelter)
    all_medicare = session.query(Medicare).all()
    for medicare in all_medicare:
        print(medicare) 
    

if __name__ == '__main__':
    engine = get_connection()
    with engine.connect() as connection: # check that the connection works
        print(f"Connection to the {hostname} created successfully.")
    # dropping all tables to reset  
    
    print("dropping tables")
    Base.metadata.drop_all(engine)
    print("dropped tables")
    # Create the tables in the database
    print("making tables")
    Base.metadata.create_all(engine) # execute this successfully only once
    print("made tables")
    
    # add cities to City table
    cities = filter_json(query_API("cities"), [
    "CSA_Label", "Total_Unsheltered_Pop", "Total_Sheltered_Pop",
    "Total_Pop", "Square_Miles", "Density_Unsheltered", "Density_Sheltered", "Density_Total"])
    with Session(engine) as session:
        for city_info in cities:
            city = City(**city_info)
            session.add(city)
        all_cities = session.query(City).all()
        for city in all_cities:
            print(city)
        session.commit()
      
    # add shelters to Shelter table
    shelters = filter_json(query_API("shelters"), ["Name", "addrln1","addrln2" , "city", "hours", "phone", "url", "post_id",
                                                   "description", "zip", "link", "latitude", "longitude", "date_updated"])
    with Session(engine) as session:
        for shelter_info in shelters:
            shelter = Shelter(**shelter_info)
            session.add(shelter)
        all_shelters = session.query(Shelter).all()
        for shelter in all_shelters:
            print(shelter)
        session.commit()
        
    # add medicare locations to Medicare table
    medicares = filter_json(query_API("medicare"), ["Name", "addrln1", "addrln2", "city", "hours", 
                "phones", "post_id", "description", "zip", "latitude", "longitude", "date_updated"])
    # print(json.dumps(medicares, indent=4))
    with Session(engine) as session:
        for medicare_info in medicares:
            medicare = Medicare(**medicare_info)
            session.add(medicare)
        all_medicare = session.query(Medicare).all()
        # for medicare in all_medicare:
        #     pass
        #     print(medicare)
        session.commit()
        
    printDatabase(engine)