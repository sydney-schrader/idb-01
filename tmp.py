# import json

# with open("tmp.json") as f:
#     medicare = json.load(f)
# print(medicare["features"][0]["geometry"])




import requests
import json

apis = {"shelters" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/158/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "cities" : "https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Homeless_Counts_2020/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "medicare" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/83/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "commits" : "https://gitlab.com/api/v4/projects/sydneyschrader%2Fcs373-idb-01/repository/commits?ref_name=main",
        "issues" : "https://gitlab.com/api/v4/projects/sydneyschrader%2Fcs373-idb-01/issues?state=closed"}

authors = ["Zachary%20Voltz", "Jamie%20Wong", "John%20Park", "Pavan%20Marathi", "Sydney%20Schrader"]
usernames = ["zacharyvoltz"]

def query_shelters():
    response = requests.get(apis["shelters"])
    shelters = response.json()
    with open("tmp.json", "w") as f:
        json.dump(shelters, f)

def query_cities():
    response = requests.get(apis["cities"])
    cities = response.json()
    with open("tmp.json", "w") as f:
        json.dump(cities, f)

def query_medicare():
    response = requests.get(apis["medicare"])
    medicares = response.json()
    with open("tmp.json", "w") as f:
        json.dump(medicares, f)

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

def query_issues():
    issue_map = {}
    for name in usernames:
        author = name.replace("%20", " ")
        response = requests.get(apis["issues"] + "&closed_by_username=" + name)
        i = 2
        while (len(response.json()) == 20):
            issue_map[author] = issue_map.get(author, 0) + 20
            response = requests.get(apis["issues"] + "&closed_by_username=" + name + f"&page={i}")
            i += 1
        issue_map[author] = issue_map.get(author, 0) + len(response.json())
    return issue_map


print(query_issues())

