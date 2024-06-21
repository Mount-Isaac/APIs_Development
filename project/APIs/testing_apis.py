import requests 
import os
from pathlib import Path
from dotenv import load_dotenv

# load local environment
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

# common endpoint
url = "http://127.0.0.1:8000/api/"

# Generate your own access token and replace it here
access_token = os.getenv('ACCESS_TOKEN')

endpoints = {
    'update-profile': f"{url}user/update/profile",
    "update-password": f"{url}user/update/password"
}

headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

data_password = {
    'old_password': 'Chalo6578#',
    'new_password': 'KaLuH892@vIjys#'
}

data_profile = {
    'first_name': 'John',
    'last_name': 'Mikeson',
    'phone_number': '+1289028243',
}

# update password
# response = requests.post(endpoints.get('update-password'), json=data_password, headers=headers)
# print(response.json())

# update profile
response = requests.post(endpoints.get('update-profile'), json=data_profile, headers=headers)
print(response.json())