import unittest
import requests
import json

BASE_URL = "https://api.lacountyhomelesshelper.me"

class Test(unittest.TestCase):
    # tests if the return value from the about
    def test_about_is_list(self):
        response = requests.get(BASE_URL + "/about")
        self.assertTrue(response.status_code == 200)
        about_list = response.json()
        self.assertTrue(isinstance(about_list, list))

    # tests if all commits in the map are greater than 0 (except John)
    def test_commits_1(self):
        response = requests.get(BASE_URL + "/about")
        self.assertTrue(response.status_code == 200)
        about_list = response.json()
        self.assertFalse(about_list is None)
        for item in about_list:
            if item["name"] != "John Park":
                self.assertGreater(item["commits"], 0)
                
    # tests if all issues in the map are greater than 0 (except John)
    def test_issues_1(self):
        response = requests.get(BASE_URL + "/about")
        self.assertTrue(response.status_code == 200)
        about_list = response.json()
        self.assertFalse(about_list is None)
        for item in about_list:
            if item["name"] != "John Park":
                self.assertGreater(item["issues"], 0)
    
    # tests if all the medicare locations have non-null names
    def test_medicare_1(self):
        response = requests.get(BASE_URL + "/medicares")
        self.assertTrue(response.status_code == 200)
        medicare_list = response.json()
        for office in medicare_list:
            self.assertFalse(office["name"] is None)
    
    # tests if all the medicare locations have non-null names
    def test_cities_1(self):
        response = requests.get(BASE_URL + "/cities")
        self.assertTrue(response.status_code == 200)
        cities = response.json()
        for city in cities:
            self.assertFalse(city["csa_label"] is None)
    
    #tests if all the shelters have non-null names
    def test_shelters_1(self):
        response = requests.get(BASE_URL + "/shelters")
        self.assertTrue(response.status_code == 200)
        shelters = response.json()
        for shelter in shelters:
            self.assertFalse(shelter["name"] is None)
    
    #checks if requesting a specific shelter returns the same map
    def test_shelters_specific_1(self):
        response = requests.get(BASE_URL + "/shelters")
        self.assertTrue(response.status_code == 200)
        shelters = response.json()
        shelter_name = shelters[0]["name"]
        response = requests.get(BASE_URL + "/shelter/" + shelter_name)
        self.assertTrue(response.status_code == 200)
        specific_shelter = response.json()
        self.assertEqual(specific_shelter, shelters[0])
    
    #checks if requesting a specific city returns the same map
    def test_cities_specific_1(self):
        response = requests.get(BASE_URL + "/cities")
        self.assertTrue(response.status_code == 200)
        cities = response.json()
        city_name = cities[0]["csa_label"]
        response = requests.get(BASE_URL + "/city/" + city_name)
        self.assertTrue(response.status_code == 200)
        specific_city = response.json()
        self.assertEqual(specific_city, cities[0])
    
    #checks if requesting a specific medicare returns the same map
    def test_medicare_specific_1(self):
        response = requests.get(BASE_URL + "/medicares")
        self.assertTrue(response.status_code == 200)
        medicares = response.json()
        medicare_name = medicares[0]["name"]
        response = requests.get(BASE_URL + "/medicare/" + medicare_name)
        self.assertTrue(response.status_code == 200)
        specific_medicare = response.json()
        self.assertEqual(specific_medicare, medicares[0])
    
    #check that the number of authors is 5
    def test_gitlab_query_1(self):
        response = requests.get(BASE_URL + "/about")
        self.assertTrue(response.status_code == 200)
        about_list = response.json()
        num_authors = len(about_list)
        self.assertEqual(num_authors, 4)
        
if __name__ == "__main__":
    unittest.main()