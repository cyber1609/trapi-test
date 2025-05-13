import os
import unittest
import requests
from unittest.mock import patch

class TestIndieCampersAPI(unittest.TestCase):
    BASE_URL = "http://localhost:5000/indie-campers-list-locations"

    @patch.dict(os.environ, {"INDIE_CAMPERS_API_KEY": "test_api_key"})
    def test_list_locations_success(self):
        with patch('requests.get') as mocked_get:
            mocked_get.return_value.status_code = 200
            mocked_get.return_value.json.return_value = {"locations": ["Location1", "Location2"]}

            response = requests.get(self.BASE_URL)
            self.assertEqual(response.status_code, 200)
            self.assertIn("locations", response.json())
            self.assertEqual(response.json()["locations"], ["Location1", "Location2"])

    @patch.dict(os.environ, {"INDIE_CAMPERS_API_KEY": "test_api_key"})
    def test_list_locations_failure(self):
        with patch('requests.get') as mocked_get:
            mocked_get.return_value.status_code = 502
            mocked_get.return_value.json.return_value = {"error": "Failed to fetch Indie Campers locations"}

            response = requests.get(self.BASE_URL)
            self.assertEqual(response.status_code, 502)
            self.assertIn("error", response.json())
            self.assertEqual(response.json()["error"], "Failed to fetch Indie Campers locations")

if __name__ == '__main__':
    unittest.main()