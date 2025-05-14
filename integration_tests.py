import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "http://localhost:5000"

def test_list_offers_success():
    url = f"{BASE_URL}/duffel-flights-list-offers"
    headers = {
        'Content-Type': 'application/json',
    }
    body = {
        # Example request body, adjust according to actual API requirements
        "data": {
            "slices": [
                {
                    "origin": "JFK",
                    "destination": "LHR",
                    "departure_date": "2023-12-01"
                }
            ],
            "passengers": [
                {
                    "type": "adult"
                }
            ],
            "cabin_class": "economy"
        }
    }
    response = requests.post(url, json=body, headers=headers)
    assert response.status_code == 200
    assert "data" in response.json()

def test_list_offers_invalid_request():
    url = f"{BASE_URL}/duffel-flights-list-offers"
    headers = {
        'Content-Type': 'application/json',
    }
    body = {
        # Invalid request body
        "invalid": "data"
    }
    response = requests.post(url, json=body, headers=headers)
    assert response.status_code == 502
    assert "error" in response.json()

if __name__ == "__main__":
    test_list_offers_success()
    test_list_offers_invalid_request()
    print("All tests passed!")