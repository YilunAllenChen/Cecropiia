import json
from flask_server import Server
from flask import request
from error_handling import *
from utils import *


# Version: 0.1.0
server = Server()

app = server.app

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                DB:    Collection Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# MongoDB doesn't allow creation of an empty collection. So when you write a document, its corresponding collectino is automatically generated.

# Drop a collection with all documents inside it.
@app.route('/database/drop_collection/', methods=['POST', 'GET'])
def dropCollection(): return server.mongo.dropCollection(request) if request.method == "POST" else badRequestError()

# List all visible collections 
@app.route('/database/list_collections/', methods=['POST', 'GET'])
def listCollection(): return server.mongo.listCollections(request) if request.method == "POST" else badRequestError()

@app.route('/database/get_statistics/', methods=['POST', 'GET'])
def getStatistics(): return server.mongo.getStatistics(request) if request.method == "POST" else badRequestError()

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                DB:    Document Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# Write a document, or replace an existing one.
@app.route('/database/write_document/', methods=['POST', 'GET'])
def write(): return server.mongo.writeDocument(request) if request.method == "POST" else badRequestError()

# Obtain a document with a specific id in a spcific collection.
@app.route('/database/get_one_document/', methods=['POST', 'GET'])
def getOne(): return server.mongo.getDocument(request) if request.method == "POST" else badRequestError()

# Obtain all documents within a collection.
@app.route('/database/get_all_documents/', methods=['POST', 'GET'])
def getAll(): return server.mongo.getAllDocuments(request) if request.method == "POST" else badRequestError()

# Obtain all documents within a collection with a filter.
@app.route('/database/get_and_filter_documents/', methods=['POST', 'GET'])
def getAndFilter(): return server.mongo.getAndFilterDocument(request) if request.method == "POST" else badRequestError()

# Delete one or multiple documents with a specific id wihtin a collection.
@app.route('/database/delete_document/', methods=['POST', 'GET'])
def delete(): return server.mongo.deleteDocuments(request) if request.method == "POST" else badRequestError()

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                  DB:  Key-Value Layer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# Get a value of a specific key of a document in a spcific collection.
@app.route('/database/get_value_by_key/', methods=['POST', 'GET'])
def getValueByKey(): return server.mongo.getValueByKey(request) if request.method == "POST" else badRequestError()

# Get raw data of a specific key of a document in a spcific collection.
@app.route('/database/get_raw_value_by_key/', methods=['POST', 'GET'])
def getRawValueByKey(): return server.mongo.getRawValueByKey(request) if request.method == "POST" else badRequestError()

@app.route('/', methods=['GET'])
def test(): return "Connection Established"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080,debug=True)
