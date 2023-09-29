from main import app, about
import unittest
import requests
import subprocess

class Test(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    def test_about_is_dict(self):
        response = self.app.get('about')
        author_map_str = response.get_data(True)
        
        self.assertTrue(author_map_str[0] == "{")
        
if __name__ == "__main__":
    unittest.main()