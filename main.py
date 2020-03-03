from flask import request, Flask, Response

app = Flask(__name__)

@app.route('/')
def hw(): return "waduhek"


if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000, debug=False)