import json
from errors import *
from flask import request, Flask, Response, render_template
from flask_cors import CORS
from flask_mongo import Mongo


# Version: 0.1.0

app = Flask(__name__)
CORS(app)
mongo = Mongo(app)

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                DB:    Collection Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# MongoDB doesn't allow creation of an empty collection. So when you write a document, its corresponding collectino is automatically generated.

# Drop a collection with all documents inside it.
@app.route('/database/drop_collection/', methods=['POST', 'GET'])
def dropCollection(): return mongo.dropCollection(request) if request.method == "POST" else badRequestError()

# List all visible collections 
@app.route('/database/list_collections/', methods=['POST', 'GET'])
def listCollection(): return mongo.listCollections(request) if request.method == "POST" else badRequestError()

@app.route('/database/get_statistics/', methods=['POST', 'GET'])
def getStatistics(): return mongo.getStatistics(request) if request.method == "POST" else badRequestError()

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                DB:    Document Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# Write a document, or replace an existing one.
@app.route('/database/write_document/', methods=['POST', 'GET'])
def write(): return mongo.writeDocument(request) if request.method == "POST" else badRequestError()

# Obtain a document with a specific id in a spcific collection.
@app.route('/database/get_one_document/', methods=['POST', 'GET'])
def getOne(): return mongo.getDocument(request) if request.method == "POST" else badRequestError()

# Obtain all documents within a collection.
@app.route('/database/get_all_documents/', methods=['POST', 'GET'])
def getAll(): return mongo.getAllDocuments(request) if request.method == "POST" else badRequestError()

# Obtain all documents within a collection with a filter.
@app.route('/database/get_and_filter_documents/', methods=['POST', 'GET'])
def getAndFilter(): return mongo.getAndFilterDocument(request) if request.method == "POST" else badRequestError()

# Delete one or multiple documents with a specific id wihtin a collection.
@app.route('/database/delete_document/', methods=['POST', 'GET'])
def delete(): return mongo.deleteDocuments(request) if request.method == "POST" else badRequestError()

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                  DB:  Key-Value Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# Get a value of a specific key of a document in a spcific collection.
@app.route('/database/get_value_by_key/', methods=['POST', 'GET'])
def getValueByKey(): return mongo.getValueByKey(request) if request.method == "POST" else badRequestError()

# Get raw data of a specific key of a document in a spcific collection.
@app.route('/database/get_raw_value_by_key/', methods=['POST', 'GET'])
def getRawValueByKey(): return mongo.getRawValueByKey(request) if request.method == "POST" else badRequestError()

@app.route('/database/login/', methods=['POST'])
def login(): return mongo.login(request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
