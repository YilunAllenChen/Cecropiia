from flask_pymongo import PyMongo
from time import sleep
from bson.json_util import dumps
from error_handling import *


class Mongo:
    def __init__(self, app):
        print("Initializing Flask_mongo module...")
        try:
            self.app = app
            try:
                from config import mongoConfig
                self.app.config["MONGO_URI"] = mongoConfig
                self.db = PyMongo(app).db
                try:
                    testColl = self.db.get_collection("test_coll")
                    testColl.insert_one({"test": "Success"})
                    sleep(1)
                    testColl.remove({"test": "Success"})
                    testColl.drop()
                    print('Database successfully configured and connected.')
                except Exception as e:
                    print('Failed to configure MongoDB. Error message: ' + str(e))
            except:
                print("Can't find mongo config.")
        except Exception as e:
            print("Failed to initialize Flask_mongo:" + str(e))


    # A customized 'jsonify' function that interfaces with the app to avoid the error of regular jsonify being unable to parse ObjectID type in MongoDB documents.
    # The function basically inherits the original jsonify function but uses 'dumps' instead.
    # DON'T CHANGE.

    def jsonify(self, *args, **kwargs):
        indent = None
        separators = (',', ':')
        if self.app.config['JSONIFY_PRETTYPRINT_REGULAR'] or self.app.debug:
            indent = 2
            separators = (', ', ': ')
        if args and kwargs:
            raise TypeError(
                'jsonify() behavior undefined when passed both args and kwargs')
        elif len(args) == 1:  # single args are passed directly to dumps()
            data = args[0]
        else:
            data = args or kwargs
        return self.app.response_class(
            dumps(data, indent=indent, separators=separators) + '\n',
            mimetype=self.app.config['JSONIFY_MIMETYPE']
        )

        self.activeTestCase = '-1'

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                                INFRASTRUCTURE
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
   

    def preProcess(self, request):
        try:
            req = request.json
            try:
                coll = self.db.get_collection(req['collection'])
            except Exception as e:
                print("ERROR: Can't locate target collection. " + str(e))
            return req, coll
        except Exception as e:
            print("Pre-Processing failed: " + str(e))
            return None, None

    def success(self, result):
        return self.jsonify({
            "code": 110400,
            "message": "success",
            "result": result
        })

    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                                    OPERATIONS
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    def writeDocument(self, request):
        try:
            req, coll = self.preProcess(request)
            if coll is None:
                return jsonError("Collection")
            # Convert the POST request data into JSON format, stored in req.
            # Insert the newly posted data into the database. If there is already a document that has the same
            if(coll.find({'id': req['id']}).count()):
                coll.replace_one({'id': req['id']}, req)
            else:
                coll.insert_one(req)
            return self.success(coll.find_one({'id': req['id']}))
        except Exception as e:
            return jsonError(e)

    def getDocument(self, request):
        try:
            req, coll = self.preProcess(request)
            if coll is None:
                return noDataFoundError()
            return self.success(coll.find_one({'id': req['id']}))
        except Exception as e:
            return jsonError(e)

    def getAllDocuments(self, request):
        try:
            req, coll = self.preProcess(request)
            if coll is None:
                return noDataFoundError()
            # Look through the collection and find all documents in the database, put them into a list.
            result = []
            for item in coll.find():
                result.append(item)
            return self.success(result)
        except Exception as e:
            return jsonError(e)

    def getAndFilterDocument(self, request):
        try:
            req, coll = self.preProcess(request)
            if coll is None:
                return noDataFoundError()
            li = []
            try:
                name = req['name']
            except:
                return ParamNotFoundError("name")
            for this in coll.find():
                if 'name' in this and this['name'].find(name) != -1:
                    li.append(this)
            return self.success(li)
        except Exception as e:
            return jsonError(e)

    def deleteDocuments(self, request):
        try:
            req, coll = self.preProcess(request)
            if coll is None:
                return noDataFoundError()
            ids = req['id']
            if type(ids) is list:
                listDeleted = []
                listNotFound = []
                for thisId in ids:
                    query = {'id': thisId}
                    if(coll.find(query).count()):
                        coll.remove(query)
                        listDeleted.append(thisId)
                    else:
                        listNotFound.append(thisId)
                return self.success("These entries have been deleted: " + str(listDeleted) + "; These entries are not found therefore cannot be deleted: " + str(listNotFound))

            else:
                query = {'id': req['id']}
                # If id param is not a list.
                print(req)
                if(coll.find(query).count()):
                    coll.remove(query)
                    return self.success("target entry deleted successfully.")
                else:
                    return noDataFoundError()
        except BaseException as e:
            return jsonError(e)
