import requests

apis = {"shelters" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/158/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "cities" : "https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Homeless_Counts_2020/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        "medicare" : "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/83/query?where=1%3D1&outFields=*&outSR=4326&f=json"}

def query_API(api_name):
    response = requests.get(apis[api_name])
    items = []
    for curr in response.json()["features"]:
        items.append(curr["attributes"])
    return items

