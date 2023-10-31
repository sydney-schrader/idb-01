import requests
import json


# List of API keys and their associated search engine IDs
API_DATA = [
    #numberone
    {"key": "AIzaSyCbD2DSVMtY6kgcBtkZINp5jbM7xze00kg", "engine_id": "f727bff6bdf424d6e"},
    #jamie
    {"key": "AIzaSyAwozhLVzasZOIiW387q1P0NMtJTrhvD20", "engine_id": "129c571c4e1a84a03"},
    #pavan
    {"key": "AIzaSyDeJ_BEmpE0WOX92_Q3iWNdnnUcXpH3yeg", "engine_id": "553cf4cb73ceb44f9"},
    #zach
    {"key": "AIzaSyAiNi5igRxIAvxcuZ1TRL7ii-Eu3sWLaWE", "engine_id": "226027a2f9e54422b"},
    #syd
    {"key": "AIzaSyDeJ_BEmpE0WOX92_Q3iWNdnnUcXpH3yeg", "engine_id": "e6e2e55f62cfc447d"}
]

current_index = 0
current_request_count = 0

def get_current_api_data():
    return API_DATA[current_index]

def rotate_to_next_api():
    global current_index, current_request_count
    current_index = (current_index + 1) % len(API_DATA)
    current_request_count = 0


resource_mapping = {}
medical_mapping = {}
cities_mapping = {}

def fetch_image_url(name):
    global current_request_count
    current_api_data = get_current_api_data()
    endpoint = f"https://www.googleapis.com/customsearch/v1?q={name}&cx={current_api_data['engine_id']}&searchType=image&key={current_api_data['key']}"
    print(endpoint)
    try:
        response = requests.get(endpoint)
        data = response.json()

        # Check for rate limit or errors in response
        if "error" in data:
            if data["error"]["code"] == 429:  # 429 is the HTTP status code for Too Many Requests
                rotate_to_next_api()
                return fetch_image_url(name)

        if data.get("items") and len(data["items"]) > 0:
            current_request_count += 1
            # Check if close to the limit, then rotate the key and engine ID
            if current_request_count >= 95:
                rotate_to_next_api()
            return data["items"][0]["link"]
    except Exception as e:
        print(f"Error fetching image for {name}: {e}")
    return 'https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg'  # or a default image URL



def process_entities(entities, mapping, entity_type):
    for entity in entities:
        attribute_name = "csa_label" if entity_type == "cities" else "name" 

        name = entity[attribute_name]
        image_url = fetch_image_url(name)
        if image_url:
            mapping[name] = image_url

def fetch_and_map_resources():
    response = requests.get('https://api.lacountyhomelesshelper.me/shelters')
    resources = response.json()
    process_entities(resources, resource_mapping, "resource")
    print(f"how often do i get here")

def fetch_and_map_medical():
    response = requests.get('https://api.lacountyhomelesshelper.me/medicares')
    medical = response.json()
    process_entities(medical, medical_mapping, "medical")

def fetch_and_map_cities():
    response = requests.get('https://api.lacountyhomelesshelper.me/cities')
    cities = response.json()
    process_entities(cities, cities_mapping, "cities")

def save_mappings_to_file():
    with open('mappings.json', 'w') as f:
        json.dump({
            "resources": resource_mapping,
            "medical": medical_mapping,
            "cities": cities_mapping
        }, f, indent=4)
    print("Mappings saved to mappings.json")

if __name__ == "__main__":
    fetch_and_map_resources()
    fetch_and_map_medical()
    fetch_and_map_cities()
    save_mappings_to_file()
