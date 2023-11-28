from flask import Flask, request, jsonify
from flask_cors import CORS
import query_APIs
import query_database
import math

app = Flask(__name__)
CORS(app)
ITEMS_PER_PAGE = 9

@app.route("/")
def home():
    pass

@app.route("/shelters")
@app.route("/shelters/")
@app.route("/shelters/<page>")
def shelters(page=None):
    query = request.args.get("q")
    sort = request.args.get("sort", type=str)
    filters = list(request.args.items())

    if query != None:
        shelters = query_database.search_shelters(query, filters)
    else:
        shelters = query_database.query_shelters(filters)
    # apply filters
    if sort != None:
        shelters = query_database.sort_shelters(sort, shelters)
    if page is None:
        return shelters
    num_pages = math.ceil(len(shelters) / ITEMS_PER_PAGE)
    if num_pages == 0:
        return [0]
    page = int(page) % num_pages
    start = ITEMS_PER_PAGE*page
    return [num_pages] + shelters[start:start+ITEMS_PER_PAGE]

@app.route("/shelter/<name>")
def specific_shelter(name):
    shelter = query_database.query_shelter(name)
    return shelter

@app.route("/cities")
@app.route("/cities/")
@app.route("/cities/<page>")
def cities(page=None):
    query = request.args.get("q")
    sort = request.args.get("sort")
    filters = list(request.args.items())
    if query != None:
        cities = query_database.search_cities(query, filters)
    else:
        cities = query_database.query_cities(filters)
    if sort != None:
        cities = query_database.sort_cities(sort, cities)
    if page is None:
        return cities
    num_pages = math.ceil(len(cities) / ITEMS_PER_PAGE)
    if num_pages == 0:
        return [0]
    page = int(page) % num_pages
    start = ITEMS_PER_PAGE*page
    return [num_pages] + cities[start:start+ITEMS_PER_PAGE]

@app.route("/city/<name>")
def specific_city(name):
    city = query_database.query_city(name)
    return city

@app.route("/medicares")
@app.route("/medicares/")
@app.route("/medicares/<page>")
def medicare(page=None):
    query = request.args.get("q")
    sort = request.args.get("sort")
    filters = list(request.args.items())
    if query != None:
        medicares = query_database.search_medicares(query, filters)
    else:
        medicares = query_database.query_medicares(filters)
        
    if sort != None:
        medicares = query_database.sort_medicares(sort, medicares)
    if page is None:
        return medicares
    num_pages = math.ceil(len(medicares) / ITEMS_PER_PAGE)
    if num_pages == 0:
        return [0]
    page = int(page) % num_pages
    start = ITEMS_PER_PAGE*page
    return [num_pages] + medicares[start:start+ITEMS_PER_PAGE]

@app.route("/medicare/<name>")
def specific_medicare(name):
    medicare = query_database.query_medicare(name)
    return medicare

@app.route("/about")
def about():
    author_map = query_APIs.query_gitlab()
    return jsonify(author_map)

if __name__ == "__main__":
    app.run(debug=True)
