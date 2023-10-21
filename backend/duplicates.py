import json
import query_APIs

def find_duplicate_names(json_data):
    # Parse the JSON data into a Python data structure
    data = json_data

    name_set = set()  # To store encountered names
    duplicate_names = set()  # To store duplicate names

    for item in data:
        if "name" in item:
            name = item["name"]
            if name in name_set:
                duplicate_names.add(name)  # This name is a duplicate
            else:
                name_set.add(name)  # This name is encountered for the first time

    return list(duplicate_names)

# Sample JSON data as a string
json_data = query_APIs.query_API("medicare")

# Call the function to find duplicate names
duplicate_names = find_duplicate_names(json_data)

# Print the list of duplicate names
print("Duplicate names:", duplicate_names)
