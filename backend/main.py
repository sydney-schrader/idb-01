from flask import *
# import json
import query_APIs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("tmp_home.html")

@app.route("/shelters")
def shelters():
    shelters = query_APIs.query_API("shelters")
    #return render_template("shelters.html", data=shelters)
    return jsonify(shelters)

@app.route("/shelters/<name>")
def specific_shelter(name):
    shelters = query_APIs.query_API("shelters")
    for shelter in shelters:
        if shelter["Name"] == name:
            # return render_template("specific_shelter.html", data=shelter)
            return jsonify(shelter)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/cities")
def cities():
    cities = query_APIs.query_API("cities")
    # return render_template("cities.html", data=cities)
    return jsonify(cities)

@app.route("/cities/<name>")
def specific_city(name):
    cities = query_APIs.query_API("cities")
    for city in cities:
        if city["CSA_Label"] == name:
            # return render_template("specific_city.html", data=city)
            return jsonify(city)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/medicare")
def medicare():
    medicare = query_APIs.query_API("medicare")
    # return render_template("medicare.html", data=medicare)
    return jsonify(medicare)

@app.route("/medicare/<name>")
def specific_medicare(name):
    medicares = query_APIs.query_API("medicare")
    for medicare in medicares:
        if medicare["Name"] == name:
            # return render_template("specific_medicare.html", data=medicare)
            return jsonify(medicare)
    return "<h1>Error 404 Not Found</h1>"

@app.route("/about")
def about():
    author_map = query_APIs.query_gitlab()
    # return render_template("about.html", data=author_map)
    return jsonify(author_map)

if __name__ == "__main__":
    app.run(debug=True)
