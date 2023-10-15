import json
from query_APIs import query_API

# filters out unwanted parameters from json so they can be put in database
def filter_json(data, allowed_parameters):
    for item in data:
        # Create a list of keys to remove
        keys_to_remove = [key for key in item if key not in allowed_parameters]
        # Remove the unwanted keys
        for key in keys_to_remove:
            del item[key]
    return recursive_convert_keys(data)

# make all keys lowercase to make putting them into tables easier
def recursive_convert_keys(obj):
        if isinstance(obj, dict):
            return {key.lower(): recursive_convert_keys(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [recursive_convert_keys(item) for item in obj]
        else:
            return obj
