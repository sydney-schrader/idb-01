from flask import *
import query_APIs

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("tmp_home.html")

if __name__ == "__main__":
    app.run(debug=True)
