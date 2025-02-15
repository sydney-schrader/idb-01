"""
This file is to abstract all API calls away from the main Flask app. Eventually,
this will just populate the database, and the Flask app will query the database
instead.

The shelters, cities, and medicare databases are all on lacounty.gov, and the
json it returns is in the following format:
a dictionary with keys: ['displayFieldName', 'fieldAliases', 'geometryType', 
'spatialReference', 'fields', 'features']

displayFieldName just contains "Name"

fieldAliases contains a dictionary of the column names mapped to the name itself
ex: {'OBJECTID': 'OBJECTID', 'source': 'source', 'ext_id': 'ext_id'} etc.

geometryType contains the string "esriGeometryPoint" or "esriGeomtryPolygon"

spatialReference contains a dict of wkid and lastWkid, both set to 4326

fields contains a list of dictionaries describing each column, each dict has 
keys 'name', 'type', and 'alias' with some having 'length', 'sqlType', 'domain',
and 'defaultValue' as well
    name is just the name of the column
    type is the type of the column, generally esriFieldtypeString, some are
    esriFieldtypeDate, esriFieldTypeDouble, and esriFeldTypeOID
    alias defines another name for the column

features contains a list of the rows in the database as a dict with two keys:
"attributes" and "geometry"
    attributes contains all of the information in the database
    geometry for shelters and medicare contains x and y coordinates in a dict 
    that are the same as the longitude(x) and latitude(y) coordinatess found in
    attributes
    geomtry for cities contains a dict with 1 key 'rings' that maps to a list of
    several copies of the longitude and latitude each as their own list.
"""

import requests

apis = {"shelters" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/158/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "cities" : "https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Homeless_Counts_2020/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "medicare" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/83/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "commits" : "https://gitlab.com/api/v4/projects/sydneyschrader%2Fcs373-idb-01/repository/commits?ref_name=main",
        "issues" : "https://gitlab.com/api/v4/projects/sydneyschrader%2Fcs373-idb-01/issues?state=closed&per_page=500"}

authors = ["Zachary%20Voltz", "Jamie%20Wong", "Pavan%20Marathi", "Sydney%20Schrader"]

"""
Takes in a string api_name which can take 1 of 3 values: "shelters", "cities",
or "medicare". This will return a list of the attributes dictionaries of the
parameter type. The attribute dictionaries are explained in the block comment 
above.
"""
def query_API(api_name):
    response = requests.get(apis[api_name])
    items = []
    for curr in response.json()["features"]:
        items.append(curr["attributes"])
    return items

"""
Queries Gitlab for our repository and gets every commit and issue.
Returns a list of dicts each with keys "name", "commits", and "issues" that map
to a string of that person's name, an int of number of commits made, and an int
of number of issues closed respectively.
"""
def query_gitlab():
    commit_map = query_commits()
    issue_map = query_issues()
    
    author_list = []
    for author in commit_map.keys():
        author_map = {"name" : author, "commits" : commit_map[author],
                         "issues" : issue_map[author]}
        author_list.append(author_map)

    return author_list

"""
Queries Gitlab for all commits, returns a dictionary mapping a string name to
an int number of commits.
"""
def query_commits():
    commit_map = {}
    for name in authors:
        author = name.replace("%20", " ")
        response = requests.get(apis["commits"] + "&author=" + name)
        i = 2
        while (len(response.json()) == 20):
            commit_map[author] = commit_map.get(author, 0) + 20
            response = requests.get(apis["commits"] + "&author=" + name + f"&page={i}")
            i += 1
        commit_map[author] = commit_map.get(author, 0) + len(response.json())

    return commit_map
"""
Queries Gitlab for all issues, returns a dictionary mapping a string name to
an int number of commits.
"""
def query_issues():
    issue_map = {}
    response = requests.get(apis["issues"])
    for issue in response.json():
        author = issue["closed_by"]["name"]
        issue_map[author] = issue_map.get(author, 0) + 1
    return issue_map

if __name__ == "__main__":
    print(filter_cities("csa_label", "City of Agoura Hills"))
