from flask import *
from flask_cors import CORS
import query_APIs
import query_database

app = Flask(__name__)
CORS(app)

@app.route("/api/shelters")
def shelters():
    shelters = query_database.query_shelters()
    shelters = [shelter.to_dict() for shelter in shelters]
    return shelters

@app.route("/api/shelters/<name>")
def specific_shelter(name):
    shelter = query_database.query_shelter(name)
    return shelter.to_dict()

@app.route("/api/cities")
def cities():
    cities = query_database.query_cities()
    cities = [city.to_dict() for city in cities]
    return cities

@app.route("/api/cities/<name>")
def specific_city(name):
    city = query_database.query_city(name)
    return city.to_dict()

@app.route("/api/medicare")
def medicare():
    medicares = query_database.query_medicares()
    medicares = [medicare.to_dict() for medicare in medicares]
    return medicares

@app.route("/api/medicare/<name>")
def specific_medicare(name):
    medicare = query_database.query_medicare(name)
    return medicare.to_dict()

@app.route("/api/about")
def about():
    author_map = query_APIs.query_gitlab()
    return jsonify(author_map)

if __name__ == "__main__":
    app.run(debug=True)
