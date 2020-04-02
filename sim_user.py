import random as rd
import requests
import time
import datetime

hostname = '127.0.0.1:5000'
entry = {
    "username": "Allen",
    "password": "123",
    "Permission": "admin"
}
r = requests.post('http://' + hostname + '/database/write_document/',
                  json=entry, headers={'content-type': 'application/json'})


