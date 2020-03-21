import random as rd
import requests
import time
import datetime

dataTypes = ['temperature', 'humidity', 'vibration']
acceptables = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
               '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27',
               '28', '29', '30']

hostname = '127.0.0.1:5000'


for i in range(100):
    entry = {
        "id": datetime.datetime.now().timestamp(),
        "collection": "Slothbot_Public_Data"
    }
    for dataType in dataTypes:
        entry[dataType] = rd.randint(1,100)
    r = requests.post('http://' + hostname + '/database/write_document/', json=entry, headers={'content-type': 'application/json'})
    pastebin_url = r.text 