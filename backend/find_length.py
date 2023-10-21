import json
from query_APIs import query_API

def find_longest_string(json_data):
    longest_str = None  # Initialize the variable to store the longest string

    def recursive_search(data):
        nonlocal longest_str

        if isinstance(data, str):
            if longest_str is None or len(data) > len(longest_str):
                longest_str = data
        elif isinstance(data, dict):
            for key, value in data.items():
                recursive_search(key)
                recursive_search(value)
        elif isinstance(data, list):
            for item in data:
                recursive_search(item)

    # Convert the JSON data to a Python dictionary
    if isinstance(json_data, str):
        json_data = json.loads(json_data)

    # Start the recursive search
    recursive_search(json_data)

    return longest_str

# Example JSON data
json_data = query_API("shelters")

# Call the function and print the longest string
longest_string = find_longest_string(json_data)
print(f"The longest string in the JSON is: {longest_string}")
print(f"The length is: {len(longest_string)}")
