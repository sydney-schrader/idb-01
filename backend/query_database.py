import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from models import City, Shelter, Medicare

load_dotenv("../.env")
user = os.getenv("db_username")
password = os.getenv("db_password")
url = os.getenv("db_url")
port = os.getenv("db_port")
database = os.getenv("db_database")
mysql_url = f"mysql+mysqlconnector://{user}:{password}@{url}:{port}/{database}"
engine = create_engine(mysql_url)

def query_city(name):
    select_statement = select(City).where(City.csa_label == name)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns a ChunkedIteratorResult, call next to get
        # the first result. Each result is a tuple. We only want 1 city, so get
        # the 1st value of the 1st tuple.
        city = next(res)[0].to_dict()
    return city

def query_cities():
    select_statement = select(City)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        cities = [row[0].to_dict() for row in res]
    return cities

def search_cities(query):
    with Session(engine) as session:
        query_statement = session.query(City).filter(City.csa_label.ilike(f'%{query}%'))
        results = list(session.execute(query_statement))
        cities = [row[0].to_dict() for row in results]
    return cities

def query_shelter(name):
    select_statement = select(Shelter).where(Shelter.name == name)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns a ChunkedIteratorResult, call next to get
        # the first result. Each result is a tuple. We only want 1 shelter, so 
        # get the 1st value of the 1st tuple.
        shelter = next(res)[0].to_dict()
    return shelter

def query_shelters():
    select_statement = select(Shelter)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        shelters = [row[0].to_dict() for row in res]
    return shelters

def search_shelters(query):
    with Session(engine) as session:
        query_statement = session.query(Shelter).filter(Shelter.name.ilike(f'%{query}%'))
        results = list(session.execute(query_statement))
        shelters = [row[0].to_dict() for row in results]
    return shelters

def query_medicare(name):
    select_statement = select(Medicare).where(Medicare.name == name)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns a ChunkedIteratorResult, call next to get
        # the first result. Each result is a tuple. We only want 1 office, so 
        # get the 1st value of the 1st tuple.
        office = next(res)[0].to_dict()
    return office

def query_medicares():
    select_statement = select(Medicare)
    with Session(engine) as session:
        res = session.execute(select_statement)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        offices = [row[0].to_dict() for row in res]
    return offices

def search_medicares(query):
    with Session(engine) as session:
        query_statement = session.query(Medicare).filter(Medicare.name.ilike(f'%{query}%'))
        results = list(session.execute(query_statement))
        medicares = [row[0].to_dict() for row in results]
    return medicares

if __name__ == "__main__":
    # print(query_city('Unincorporated - Wiseburn'))
    assert(len(query_cities()) == 286)
    # print(query_shelter('Zoe Christian Fellowship - Sfv Rescue Mission'))
    assert(len(query_shelters()) == 182)
    # print(query_medicare('Whittier Office - Social Security Administration'))
    assert(len(query_medicares()) == 31)
    print("All tests passed")