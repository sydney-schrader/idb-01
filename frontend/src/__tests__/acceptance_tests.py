import os
import re
import subprocess
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class LosAngelesHomelessHelperTest(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        # Get the current directory
        current_directory = os.path.dirname(os.path.abspath(__file__))

        # Build the path to chromedriver located in the current directory
        chromedriver_path = os.path.join(current_directory, 'chromedriver')

        # Set Chrome Options
        chrome_options = webdriver.ChromeOptions()
        chrome_options.binary_location = chromedriver_path
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')


        # Start a new instance of the Chrome browser using the local chromedriver
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(10)


    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def setUp(self):
        # Load your React app (change the URL as per your app's address).
        self.driver.get('https://www.lacountyhomelesshelper.me')

    def test_title_displayed(self):
        title = self.driver.find_element(By.CLASS_NAME, 'title')
        self.assertTrue(title.is_displayed())

    def test_instances_title_displayed(self):
        lower_title = self.driver.find_element(By.CLASS_NAME, 'lower-title')
        self.assertTrue(lower_title.is_displayed())

    def test_explore_cities_link(self):
        explore_cities_button = self.driver.find_element(By.NAME, 'homeCities')
        self.assertIsNotNone(explore_cities_button)
        self.driver.execute_script("arguments[0].click();", explore_cities_button)
        self.assertIn('/cities', self.driver.current_url)

    def test_explore_resources_link(self):
        explore_resources_button = self.driver.find_element(By.NAME, 'homeResources')
        self.assertIsNotNone(explore_resources_button)
        self.driver.execute_script("arguments[0].click();", explore_resources_button)
        self.assertIn('/resources', self.driver.current_url)

    def test_explore_medical_options_link(self):
        explore_medical_button = self.driver.find_element(By.NAME, 'homeMedical')
        self.assertIsNotNone(explore_medical_button)
        self.driver.execute_script("arguments[0].click();", explore_medical_button)
        self.assertIn('/medical', self.driver.current_url)

    def test_nav_and_cities(self):
        link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/cities']")
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/cities', self.driver.current_url)
    
    def test_city_connected_instance(self):
        self.driver.get('https://www.lacountyhomelesshelper.me/cities')
        #just test one
        link = self.driver.find_element(By.NAME, 'City of Agoura Hills')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/cities/City%20of%20Agoura%20Hills', self.driver.current_url)
        link = self.driver.find_element(By.NAME, 'backCities')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/cities', self.driver.current_url)

    def test_nav_and_resources(self):
        link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/resources']")
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/resources', self.driver.current_url)
    
    def test_resources_connected_instance(self):
        self.driver.get('https://www.lacountyhomelesshelper.me/resources')
        #just test one
        link = self.driver.find_element(By.NAME, '1736 Family Crisis Center')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/resources/1736%20Family%20Crisis%20Center', self.driver.current_url)
        link = self.driver.find_element(By.NAME, 'backResources')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/resources', self.driver.current_url)
            
    def test_nav_and_medical(self):
        link = self.driver.find_element(By.CSS_SELECTOR, "a[href='/medical']")
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/medical', self.driver.current_url)
    
    def test_medical_connected_instance(self):
        self.driver.get('https://www.lacountyhomelesshelper.me/medical')
        #just test one
        link = self.driver.find_element(By.NAME, 'Alafia Mental Health Center')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/medical/Alafia%20Mental%20Health%20Center', self.driver.current_url)
        link = self.driver.find_element(By.NAME, 'backMedical')
        self.assertIsNotNone(link)
        self.driver.execute_script("arguments[0].click();", link)
        self.assertIn('/medical', self.driver.current_url)


if __name__ == "__main__":
    unittest.main()
