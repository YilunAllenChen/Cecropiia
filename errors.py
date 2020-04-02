from flask import jsonify

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                    Error Handling
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

def jsonError(e):
    print(e)
    return jsonify({
        "code": 1001,
        "message": "Error: There is a problem with : '" + str(e) + "'. Check if your request satisfy the standards."
    })

def pageNotFoundError(e):
    print(e)
    return jsonify({
        "code": 1002,
        "message": "Error: No API found with this url: " + e + ". Check URL and method."
    })

def ParamNotFoundError(e):
    return jsonify({
        "code": 1003,
        "message": "Error: Parameter " + str(e) + " is needed for this request but not found in the request."
    })

def badRequestError():
    return jsonify({
        "code": 1004,
        "message": "Error: METHOD NOT ALLOWED"
    })

def noDataFoundError():
    return jsonify({
        "code": 1005,
        "message": "No data could be found with your requirements."
    })

def wrongCredentialError():
    return jsonify({
        "code": 1006,
        "message": "Credential is wrong"
    })
