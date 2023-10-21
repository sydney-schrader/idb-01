from flask import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

from models import Base, City, Shelter, Medicare

import query_APIs
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("tmp_home.html")

@app.route("/shelters")
def shelters():
    shelters = query_APIs.query_API("shelters")
    return jsonify(shelters)

@app.route("/shelters/<name>")
def specific_shelter(name):
    shelters = query_APIs.query_API("shelters")
    for shelter in shelters:
        if shelter["Name"] == name:
            return jsonify(shelter)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/cities")
def cities():
    cities = query_APIs.query_API("cities")
    return jsonify(cities)

@app.route("/cities/<name>")
def specific_city(name):
    cities = query_APIs.query_API("cities")
    for city in cities:
        if city["CSA_Label"] == name:
            return jsonify(city)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/medicare")
def medicare():
    medicare = query_APIs.query_API("medicare")
    return jsonify(medicare)

@app.route("/medicare/<name>")
def specific_medicare(name):
    medicares = query_APIs.query_API("medicare")
    for medicare in medicares:
        if medicare["Name"] == name:
            return jsonify(medicare)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/about")
def about():
    author_map = query_APIs.query_gitlab()
    return jsonify(author_map)

if __name__ == "__main__":
    app.run(debug=True)
