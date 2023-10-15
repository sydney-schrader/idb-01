import json
from query_APIs import query_API

def filter_json(json_data, allowed_parameters):
    # Parse the JSON data into a Python data structure
    data = json_data

    # Iterate through each object (dictionary) in the list
    for item in data:
        # Create a list of keys to remove
        keys_to_remove = [key for key in item if key not in allowed_parameters]
        
        # Remove the unwanted keys
        for key in keys_to_remove:
            del item[key]

    # Serialize the modified data back into a JSON string
    new_json_data = recursive_convert_keys(data)
    return new_json_data

def recursive_convert_keys(obj):
        if isinstance(obj, dict):
            return {key.lower(): recursive_convert_keys(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [recursive_convert_keys(item) for item in obj]
        else:
            return obj

# Sample JSON data as a string
json_data = query_API("cities")

# List of allowed parameters
allowed_parameters = [
    "CSA_Label", "Total_Unsheltered_Pop", "Total_Sheltered_Pop",
    "Total_Pop", "Square_Miles", "Density_Unsheltered", "Density_Sheltered", "Density_Total"
]

# Call the function to filter the JSON data
filtered_json_data = filter_json(json_data, allowed_parameters)

# Print the updated JSON
