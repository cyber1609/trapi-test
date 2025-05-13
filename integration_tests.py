import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "http://localhost:5000/indie-campers-booking"
API_KEY = os.getenv("INDIE_CAMPERS_API_KEY")

def test_create_booking_success():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    body = {
        # Add appropriate booking details here
        "customer": {
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        "bookingDetails": {
            "startDate": "2023-12-01",
            "endDate": "2023-12-10",
            "vehicleType": "campervan"
        }
    }
    
    response = requests.post(BASE_URL, json=body, headers=headers)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "bookingId" in data, "Response does not contain bookingId"
    print("test_create_booking_success passed.")

def test_create_booking_failure():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    body = {
        # Intentionally incorrect or incomplete booking details
        "customer": {
            "name": "Jane Doe"
            # Missing email
        },
        "bookingDetails": {
            "startDate": "2023-12-01",
            "endDate": "2023-12-10",
            "vehicleType": "campervan"
        }
    }
    
    response = requests.post(BASE_URL, json=body, headers=headers)
    assert response.status_code == 502, f"Expected 502, got {response.status_code}"
    data = response.json()
    assert "error" in data, "Response does not contain error message"
    print("test_create_booking_failure passed.")

if __name__ == "__main__":
    test_create_booking_success()
    test_create_booking_failure()