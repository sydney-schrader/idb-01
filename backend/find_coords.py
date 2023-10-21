from geopy.geocoders import Nominatim
import json

def get_lat_long(location):
    geolocator = Nominatim(user_agent="city-geocoder")
    location_info = geolocator.geocode(location, timeout=10)
    if location_info is not None:
        return [location_info.latitude, location_info.longitude]
    else:
        return None

city_coordinates = {}
not_found = []
# /tmp/cities.txt is just a list of the names of the cities queried from the APIs
# separated by new lines:
# City of Agoura Hills
# City of Alhambra
# City of Arcadia
# ...
# Unincorporated - Whittier Narrows
# Unincorporated - Willowbrook
# Unincorporated - Wiseburn
with open("../tmp/cities.txt") as cities:
    for city in cities:
        search_city = city[:-1].removeprefix("City of ").removeprefix("Los Angeles - ").removeprefix("Unincorporated - ")
        coordinates = get_lat_long(search_city + ", LA County, California, USA")
        if coordinates:
            city_coordinates[city[:-1]] = coordinates
        else:
            not_found.append(city[:-1])

with open("coords.json", "w") as coords:
    coords.write(json.dumps(city_coordinates))

with open("not_found.txt", "w") as f:
    f.write("\n".join(not_found))
