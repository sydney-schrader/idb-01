from flask import *
import query_APIs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("tmp_home.html")

@app.route("/shelters")
def shelters():
    shelters = query_APIs.query_API("shelters")
    return render_template("shelters.html", data=shelters)

@app.route("/cities")
def cities():
    cities = query_APIs.query_API("cities")
    return render_template("cities.html", data=cities)

@app.route("/medicare")
def medicare():
    medicare = query_APIs.query_API("medicare")
    return render_template("medicare.html", data=medicare)

if __name__ == "__main__":
    app.run(debug=True)
