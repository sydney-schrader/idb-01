from flask import *
from flask_cors import CORS
import query_APIs
import query_database
import math

app = Flask(__name__)
CORS(app)
ITEMS_PER_PAGE = 9

@app.route("/api/shelters")
@app.route("/api/shelters/")
@app.route("/api/shelters/<page>")
def shelters(page=None):
    shelters = query_database.query_shelters()
    if page is None:
        return shelters
    num_pages = math.ceil(len(shelters) / ITEMS_PER_PAGE)
    page = int(page) % num_pages
    start = ITEMS_PER_PAGE*page
    return [num_pages] + shelters[start:start+ITEMS_PER_PAGE]

@app.route("/api/shelters/<name>")
def specific_shelter(name):
    shelter = query_database.query_shelter(name)
    return shelter

@app.route("/api/cities")
@app.route("/api/cities/")
@app.route("/api/cities/<page>")
def cities(page=None):
    cities = query_database.query_cities()
    if page is None:
        return cities
    num_pages = math.ceil(len(cities) / ITEMS_PER_PAGE)
    page = int(page) % num_pages
    start = ITEMS_PER_PAGE*page
    return [num_pages] + cities[start:start+ITEMS_PER_PAGE]

@app.route("/api/city/<name>")
def specific_city(name):
    city = query_database.query_city(name)
    return city

@app.route("/api/medicares")
@app.route("/api/medicares/")
@app.route("/api/medicares/<page>")
def medicare(page=None):
    medicares = query_database.query_medicares()
    if page is None:
        return medicares
    num_pages = math.ceil(len(medicares) / ITEMS_PER_PAGE)
    page = int(page) % (num_pages+1)
    start = ITEMS_PER_PAGE*page
    return [num_pages] + medicares[start:start+ITEMS_PER_PAGE]

@app.route("/api/medicare/<name>")
def specific_medicare(name):
    medicare = query_database.query_medicare(name)
    return medicare

@app.route("/api/about")
def about():
    author_map = query_APIs.query_gitlab()
    return jsonify(author_map)

if __name__ == "__main__":
    app.run(debug=True)
