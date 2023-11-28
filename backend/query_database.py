import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, select, text
from sqlalchemy.orm import Session
# from model_maps import City, Shelter, Medicare
from models import City, Shelter, Medicare
from geopy.distance import geodesic

city_attr = {
    "unsheltered_pop" : [City.total_unsheltered_pop, int],
    "sheltered_pop" : [City.total_sheltered_pop, int],
    "total_pop" : [City.total_pop, int],
    "square_miles" : [City.square_miles, float],
    "density_total" : [City.density_total, float]
}
shelter_attr = {
    "name" : [Shelter.name, str],
    "city" : [Shelter.city, str],
    "hours" : [Shelter.hours, str],
    "latitude" : [Shelter.latitude, float],
    "longitude": [Shelter.longitude, float],
    "date_updated" : [Shelter.date_updated, str]
}
medicare_attr = {
    "name" : [Medicare.name, str],
    "city" : [Medicare.city, str],
    "hours" : [Medicare.hours, str],
    "latitude" : [Medicare.latitude, float],
    "longitude": [Medicare.longitude, float],
    "date_updated" : [Medicare.date_updated, str]
}


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

def query_cities(filters):
    select_statement = select(City)
    with Session(engine) as session:
        res = session.query(City)
        res = apply_filters(res, filters, city_attr)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        cities = [row.to_dict() for row in res]
    return cities

def search_cities(query, filters):
    with Session(engine) as session:
        query_statement = session.query(City).filter(City.csa_label.ilike(f'%{query}%'))
        query_statement = apply_filters(query_statement, filters, city_attr)
        results = list(session.execute(query_statement))
        cities = [row[0].to_dict() for row in results]
        # If there's only 1 city, they likely looked up a specific city, so 
        # in order to return relevant results, return nearby cities:
        if len(cities) == 1:
            searched_location = (cities[0]["latitude"], cities[0]["longitude"])
            all_cities = [row[0].to_dict() for row in session.execute(select(City))]
            all_cities.sort(key=lambda city : geodesic(searched_location, (city["latitude"], city["longitude"])).miles)
            return all_cities

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

def query_shelters(filters):
    select_statement = select(Shelter)
    with Session(engine) as session:
        res = session.query(Shelter)
        res = apply_filters(res, filters, shelter_attr)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        shelters = [row.to_dict() for row in res]
    return shelters

def search_shelters(query, filters):
    with Session(engine) as session:
        query_statement = session.query(Shelter).filter(Shelter.name.ilike(f'%{query}%'))
        query_statement = apply_filters(query_statement, filters, shelter_attr)
        results = list(session.execute(query_statement))
        # If there's only 1 shelter, they likely looked up a specific one, so 
        # in order to return relevant results, return nearby shelters:
        if len(results) == 1:
            shelter = results[0][0].to_dict()
            searched_location = (shelter["latitude"], shelter["longitude"])
            all_shelters = [row[0].to_dict() for row in session.execute(select(Shelter))]
            all_shelters.sort(key=lambda curr_shelter : geodesic(searched_location, (curr_shelter["latitude"], curr_shelter["longitude"])).miles)
            return all_shelters
        # If they didn't look up a specific shelter, fuzzy match it:
        query_statement = text("MATCH (name, description, addrln1) AGAINST (:prompt)").bindparams(prompt=query)
        results = session.query(Shelter).filter(query_statement).all()
        shelters = [row.to_dict() for row in results]

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

def query_medicares(filters):
    select_statement = select(Medicare)
    with Session(engine) as session:
        # res = session.execute(select_statement)
        res = session.query(Medicare)
        res = apply_filters(res, filters, medicare_attr)
        # session.execute returns an iterator of single value tuples. Get the
        # first value of each single value tuple to make a 1 dimensional list
        print(res.all())
        offices = [row.to_dict() for row in res.all()]
    return offices

def search_medicares(query, filters):
    with Session(engine) as session:
        query_statement = session.query(Medicare).filter(Medicare.name.ilike(f'%{query}%'))
        query_statement = apply_filters(query_statement, filters, medicare_attr)
        results = list(session.execute(query_statement))
        # If there's only 1 office, they likely looked up a specific one, so 
        # in order to return relevant results, return nearby offices:
        if len(results) == 1:
            medicare = results[0][0].to_dict()
            searched_location = (medicare["latitude"], medicare["longitude"])
            all_medicares = [row[0].to_dict() for row in session.execute(select(Medicare))]
            all_medicares.sort(key=lambda curr_medicare : geodesic(searched_location, (curr_medicare["latitude"], curr_medicare["longitude"])).miles)
            return all_medicares
        # If they didn't look up a specific medicare office, fuzzy match it:
        query_statement = text("MATCH (name, addrln1, description) AGAINST (:prompt)").bindparams(prompt=query)
        results = session.query(Medicare).filter(query_statement).all()
        medicares = [row.to_dict() for row in results]

    return medicares

# request.args
def sort_by(request, data, attr_map):
    print("in sortby", request)
    if request in attr_map:
        print("sort found!", request)
        print(type(data))
        print(data[0][request])
        data.sort(key=lambda d: d[request])
    return data

def sort_shelters(request, data):
    return sort_by(request, data, shelter_attr)
def sort_cities(request, data):
    return sort_by(request, data, city_attr)
def sort_medicares(request, data):
    return sort_by(request, data, medicare_attr)

#select_statement ,request.args, (City, Shelter, or Medicare)
def apply_filters(query, filters, model_map):
    for filter in filters:
        if filter[0] in {"q", "sort_by", "sort"}:
            continue
        query = apply_filter(query, filter, model_map)
    return query

# ?swhatever_filter=pop>1000
def apply_filter(query, filter, model_map):
    assert len(filter) == 2
    if len(filter[1]) == 0:
        # Strict inequality
        if ">" in filter[0]:
            column, value = filter[0].split(">")
            class_column, class_type = model_map[column]
            query = query.filter(class_column > class_type(value))
        elif "<" in filter[0]:
            column, value = filter[0].split("<")
            class_column, class_type = model_map[column]
            query = query.filter(class_column < class_type(value))
        else:
            assert False
    else:
        # Equality, lte, or gte
        if ">" in filter[0]:
            column, value = filter[0][:-1], filter[1]
            class_column, class_type = model_map[column]
            query = query.filter(class_column >= class_type(value))
        elif "<" in filter[0]:
            column, value = filter[0][:-1], filter[1]
            class_column, class_type = model_map[column]
            query = query.filter(class_column <= class_type(value))
        else:
            column, value = filter
            class_column, class_type = model_map[column]
            # print(class_column, class_type, value)
            query = query.filter(class_column == class_type(value))
    return query

if __name__ == "__main__":
    # print(query_city('Unincorporated - Wiseburn'))
    assert(len(query_cities()) == 286)
    # print(query_shelter('Zoe Christian Fellowship - Sfv Rescue Mission'))
    assert(len(query_shelters()) == 182)
    # print(query_medicare('Whittier Office - Social Security Administration'))
    assert(len(query_medicares()) == 31)
    print("All tests passed")