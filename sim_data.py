import random as rd
import requests
import time
import datetime

publicDataTypes = ['temperature', 'humidity', 'vibration']
privateDataTypes = ['voltage', 'current']

hostname = '127.0.0.1:5000'


for i in range(100):
    entry = {
        "id": datetime.datetime.now().timestamp(),
        "collection": "Slothbot_Public_Data"
    }
    for dataType in publicDataTypes:
        entry[dataType] = rd.randint(1,100)
    r = requests.post('http://' + hostname + '/database/write_document/', json=entry, headers={'content-type': 'application/json'})

    
for i in range(100):
    entry = {
        "id": datetime.datetime.now().timestamp(),
        "collection": "Slothbot_Private_Data"
    }
    for dataType in privateDataTypes:
        entry[dataType] = rd.randint(0,5)
    r = requests.post('http://' + hostname + '/database/write_document/', json=entry, headers={'content-type': 'application/json'})