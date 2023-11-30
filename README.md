**Canvas / Ed Discussion group number:** 01  

**Team member information** Sydney Schrader sks3882, Pavan Marathi, Zachary Voltz, Jamie-Lynn Wong  

**name of the project (alphanumeric, no spaces, max 32 chars; this will also be your URL):** LACountyHomelessHelper

**link**

website: https://www.lacountyhomelesshelper.me/
backend: https://api.lacountyhomelesshelper.me/

**the proposed project:** Los Angeles has the largest homeless population in the United States. We propose a website that is a tool for both  people wanting to help homeless people around them and also a tool for homeless people to see what resources are available for them   

**URLs of at least three data sources that you will programmatically scrape using a RESTful API (be very sure about this):**

https://geohub.lacity.org/datasets/lacounty::homeless-counts-2020/explore?location=33.759300%2C-117.328488%2C8.29&showTable=true

https://geohub.lacity.org/datasets/lacounty::homeless-shelters-and-services/api

https://geohub.lacity.org/datasets/lacounty::medicare-and-medicaid-offices/api  

**at least three models and an estimate for the number of instances of each model:**

Cities in LA County - 286

Shelters and Services - 182

Medicare and Medicaid offices - 31

**each model must have many attributes, describe five of those attributes for each model that you can filter or sort**

**Cities in LA County**

- Unsheltered population
- Sheltered population
- Total homeless population
- Square miles of city
- Density of total homeless population

**Shelters and Services**

- Name
- City
- Hours
- Zip code
- Phone Number

**Medicare and Medicaid Offices**

- Name
- Address
- Hours
- Phone number
- URL for their website

**instances of each model must connect to instances of at least two other models**

Each city can have a list of shelters and medicare/medicaid offices.
Each shelter/service can link back to its city and show nearby shelters/shelters and medicare/medicaid offices.
Each medicare/medicaid office can link back to its city and show nearby shelters/services and medicare/medicaid offices.

**instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this)**

**describe two types of media for instances of each model**

Every instance of every model can have a map to show its location, and we can use Google’s images for the places as well.

**describe three questions that your site will answer**

What communities are the most underserved?

What services does each community have?

How can people access these services?

**Documentation for API**

https://documenter.getpostman.com/view/28474521/2s9YJZ3jad

**Phase Information**
Phase Leader's responsibility is to keep everyone on track and help to delegate tasks

**Phase 1**
Phase Leader: Zachary Voltz
Git SHA: 44c40fd373e7a5632f6e4da3f6bae383335a3ada
Sydney Schrader Estimated: 10 hours Actual: 12 hours
Jamie Wong Estimated: 10 hours Actual: 12 hours
Zachary Voltz Estimated: 7 hours Actual: 10 hours
Pavan Marathi Estimated: 8 hours Actual: 10 hours

**Phase 2**
Phase Leader: Sydney Schrader
Git SHA: 4bdc089cd6c8d96230f0a38188ef3d0aa55b3bbc
Sydney Schrader Estimated: 15 hours Actual: 17 hours
Jamie Wong Estimated: 13 hours Actual: 17 hours
Zachary Voltz Estimated: 10 hours Actual: 12 hours
Pavan Marathi Estimated: 9 hours Actual: 12 hours

**Phase 3**
Phase Leader: Jamie Wong
Git SHA: 7fb2cc78a7286e06d6acada64bda98965feade50
Sydney Schrader Estimated: 15 hours Actual: 16 hours
Jamie Wong Estimated: 13 hours Actual: 16 hours
Zachary Voltz Estimated: 10 hours Actual: 11 hours
Pavan Marathi Estimated: 9 hours Actual: 11 hours

**Phase 4**
Phase Leader: Pavan Marathi
Git SHA: 
Sydney Schrader Estimated: 6 hours Actual: 
Jamie Wong Estimated: 5 hours Actual: 
Zachary Voltz Estimated: 7 hours Actual: 
Pavan Marathi Estimated: 6 hours Actual: 

