from

items = query_API("shelters")
with open("shelter_cities.txt", "w") as f:
    for item in items:
        f.write(item["city"] + "\n")

# with open("cities.txt") as all_cities:
#     cities = list(all_cities)
#     with open("shelter_cities.txt") as shelter_cities:
#         shelters = list(shelter_cities)
#         for j, shelter in enumerate(shelters):
#             for i, city in enumerate(cities):
#                 if shelter.lower().strip() in city.lower().strip(): # <----
#                     break
#             else:
#                 print("City not found:", shelter.strip(), j)