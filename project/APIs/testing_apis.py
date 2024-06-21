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
    'update': f"{url}user/update",
}

headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

response = requests.post(endpoints.get('update'), headers=headers)
print(response.json())