from main import app, about
import unittest
import requests
import json
import query_APIs

class Test(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    # tests if the return value from the about
    def test_about_is_dict(self):
        response = self.app.get('about')
        author_map_str = response.get_data(True)
        self.assertTrue(author_map_str[0] == "{")

    # tests if all commits in the map are greater than 0 (except John)
    def test_commits_1(self):
        response = self.app.get('about')
        author_map_str = response.get_data(True)
        author_map = json.loads(author_map_str)
        self.assertFalse(author_map is None)
        for name in author_map.keys():
            if name != "John Park":
                self.assertGreater(author_map[name]["commits"], 0)
                
    # tests if all issues in the map are greater than 0 (except John)
    def test_issues_1(self):
        response = self.app.get('about')
        author_map_str = response.get_data(True)
        author_map = json.loads(author_map_str)
        self.assertFalse(author_map is None)
        for name in author_map.keys():
            if name != "John Park":
                self.assertGreater(author_map[name]["issues"], 0)
    
    # tests if all the medicare locations have non-null names
    def test_medicare_1(self):
        response = self.app.get('medicare')
        json_str = response.get_data(True)
        medicare_map = json.loads(json_str)
        for v in medicare_map:
            self.assertFalse(v["Name"] is None)
    
    # tests if all the medicare locations have non-null names
    def test_cities_1(self):
        response = self.app.get('cities')
        json_str = response.get_data(True)
        cities = json.loads(json_str)
        for v in cities:
            self.assertFalse(v["CSA_Label"] is None)
    
    #tests if all the shelters have non-null names
    def test_shelters_1(self):
        response = self.app.get('shelters')
        json_str = response.get_data(True)
        shelters = json.loads(json_str)
        for v in shelters:
            self.assertFalse(v["Name"] is None)
    
    #checks if requesting a specific shelter returns the same map
    def test_shelters_specific_1(self):
        response = self.app.get('shelters')
        json_str = response.get_data(True)
        shelters = json.loads(json_str)
        shelter_name = shelters[0]["Name"]
        response = self.app.get('shelters/' + shelter_name)
        json_str = response.get_data(True)
        specific_shelter = json.loads(json_str)
        self.assertEqual(specific_shelter, shelters[0])
    
    #checks if requesting a specific city returns the same map
    def test_cities_specific_1(self):
        response = self.app.get('cities')
        json_str = response.get_data(True)
        cities = json.loads(json_str)
        city_name = cities[0]["CSA_Label"]
        response = self.app.get('cities/' + city_name)
        json_str = response.get_data(True)
        specific_city = json.loads(json_str)
        self.assertEqual(specific_city, cities[0])
    
    #checks if requesting a specific medicare returns the same map
    def test_medicare_specific_1(self):
        response = self.app.get('medicare')
        json_str = response.get_data(True)
        medicares = json.loads(json_str)
        medicare_name = medicares[0]["Name"]
        response = self.app.get('medicare/' + medicare_name)
        json_str = response.get_data(True)
        specific_medicare = json.loads(json_str)
        self.assertEqual(specific_medicare, medicares[0])
    
    #check that the number of authors is 5
    def test_gitlab_query_1(self):
        response = self.app.get('about')
        author_map_str = response.get_data(True)
        author_map = json.loads(author_map_str)
        num_authors = len(author_map.keys())
        self.assertEqual(num_authors, 5)
        
if __name__ == "__main__":
    unittest.main()