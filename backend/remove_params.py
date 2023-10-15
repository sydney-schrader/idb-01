import json
from query_APIs import query_API

def filter_json(json_data, allowed_parameters):
    data = json_data
    # Iterate through each object (dictionary) in the list
    for item in data:
        # Create a list of keys to remove
        keys_to_remove = [key for key in item if key not in allowed_parameters]
        # Remove the unwanted keys
        for key in keys_to_remove:
            del item[key]
    new_json_data = recursive_convert_keys(data)
    return new_json_data

# make all keys lowercase
def recursive_convert_keys(obj):
        if isinstance(obj, dict):
            return {key.lower(): recursive_convert_keys(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [recursive_convert_keys(item) for item in obj]
        else:
            return obj
