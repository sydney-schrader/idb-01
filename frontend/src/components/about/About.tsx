import bootstrapPic from '../../assets/bootstrapPic.jpg'
import gitlabPic from '../../assets/gitlabPic.png'
import styles from './About.module.css'
import Tool from "./Tool";
import arcadia from '../../assets/arcadia.jpg'
import volunteer from '../../assets/volunteer.jpg'
import ssa from '../../assets/ssa.jpg'
import reactPic from '../../assets/React-icon.jpg'
import flaskPic from '../../assets/flaskPic.jpg'
import sqlAlchPic from '../../assets/sqlAlchPic.jpg'
import postmanPic from '../../assets/postmanPic.jpg'
import ApiTool from "./ApiTool";
import React from "react";
import jamie from '../../assets/jamie.jpg'
import pavan from '../../assets/pavan.jpg'
import sydney from '../../assets/sydney.jpg'
import zach from '../../assets/zach.jpg'
import axios, { AxiosResponse } from "axios";
import ModelCard from "./ModelCard";


import {
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
  Container,
  Tooltip,
  Skeleton,
} from "@mui/material";


interface AboutState {
  people: Person[];
  totalCommits: number;
  totalIssues: number;
  totalTests: number;
  loading: boolean;
}

class About extends React.Component<{}, AboutState> {
  constructor(props: any) {
    super(props);
    this.state = {
      people: PEOPLE,
      totalCommits: 0,
      totalIssues: 0,
      totalTests: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    console.log(this.state.loading);
    return ( 
      <Container className="page-container" sx={{ textAlign: "center" }}>
        <Typography sx={{ margin: "20px" }} variant="h3">
          About LA County Homeless Helper
        </Typography>
       <div className= {styles['textType']}>
             California has the largest amount of homless in the United States, the majority being in LA County. 
             This website links together city homeless data, homeless resource data, and medicare/medicaid data. 
             This disparate data can be used to analyze what locations have what services, and could be used to see what
             locations could use more help based on homless population density. This tool is designed
             for people wanting to help the homeless of LA County and also a tool 
             for homeless people to see what resources are available for them.
       </div>
        

            <div>
            {this.state.people.map((p) => (
              <ModelCard
                key={p.name}
                fitImage={false}
                height="560px"
                width="270px"
                imageHeight="270px"
                image={p.image}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {p.name}
                  </Typography>
 

                  <Typography variant="body2" color="text.secondary">
                    {p.bio}
                  </Typography>
                </CardContent>
                <Box style={{ flexGrow: 2 }}></Box>
                <Divider sx={{ width: "300px" }}></Divider>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1.5}
                  sx={{
                    alignSelf: "center",
                    padding: "16px",
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    alignSelf="center"
                    width="60px"
                  >
                    
                    <Typography variant="body2" margin="0px">
                      Commits
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {this.state.loading ? (
                        <Skeleton width={"36px"} />
                      ) : (
                        p.commits
                      )}
                    </Typography>
                  </Stack>
                  <Tooltip title={"Total issues assigned"} followCursor={true}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      alignSelf="center"
                      width="60px"
                    >
                      
                      <Typography variant="body2" margin="2px">
                        Issues
                      </Typography>
                      <Typography variant="body1" textAlign="center">
                        {this.state.loading ? (
                          <Skeleton width={"36px"} />
                        ) : (
                          p.issues
                        )}
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Stack
                    direction="column"
                    alignItems="center"
                    alignSelf="center"
                    width="60px"
                  >
                    
                    <Typography variant="body2" margin="2px">
                      Tests
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                      {this.state.loading ? <Skeleton width={"36px"} /> : p.tests}
                    </Typography>
                  </Stack>
                </Stack>
              </ModelCard>
            ))}
          </div>

        <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "20px" }}
        >
          <Typography gutterBottom variant="h4" component="div" align='center'>
            LA Homeless Helper API Sources
          </Typography>
        </Stack>

        <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "36px" }}
        >
          {apiTools.map(ApiTool)}
        </ Stack>

        <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "20px" }}
        >
          <Typography gutterBottom variant="h4" component="div" align='center'>
            Tools
          </Typography>
        </Stack>

        <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "36px" }}
        >
          <div className="card-group">
          {devTools.map(Tool)}
          </div>
          
        </ Stack>

      </Container>
    );
  }


  async getData() {
    let totalCommits: number = 0;
    let developerTotalCommits: number = 0;
    let commitMap: Map<string, number> = new Map();
    let newPeople: Person[] = this.state.people;
    let pageSize = 500;
    let page = 1;
    while (totalCommits % pageSize === 0) {
      let response: AxiosResponse<any, any> = await axios.get(
        `https://gitlab.com/api/v4/projects/50431924/repository/commits?per_page=${pageSize}&page=${page++}`
      );
      if (response.data.length === 0) {
        break;
      }
      for (let commit of response.data) {
        let name = commit.author_name;
        commitMap.set(name, (commitMap.get(name) ?? 0) + 1);
        totalCommits++;
      }
    }
    for (let person of newPeople) {
      person.commits += commitMap.get(person.name) ?? 0;
      developerTotalCommits += person.commits;
    }
    console.log(commitMap);
    let totalIssues: number = 0;
    let assignedTotalIssues: number = 0;
    page = 1;
    let issuesMap: Map<string, number> = new Map();
    while (totalIssues % pageSize === 0) {
      let issuesResponse: AxiosResponse<any, any> = await axios.get(
        `https://gitlab.com/api/v4/projects/50431924/issues?per_page=${pageSize}&page=${page++}`
      );
      
      console.log(issuesResponse.data.length);
      if (issuesResponse.data.length === 0) {
        break;
      }
      
      for (let issue of issuesResponse.data) {
        if ( issue.closed_by != null) {
          let name =  issue.closed_by.name;
          issuesMap.set(name, (issuesMap.get(name) ?? 0) + 1);
        }
        totalIssues++;
      }
    }
    for (let person of newPeople) {
      person.issues = issuesMap.get(person.name) ?? 0;
      assignedTotalIssues += person.issues;
    }

    this.setState({
      people: newPeople,
      totalCommits: developerTotalCommits,
      totalIssues: assignedTotalIssues,
      loading: false,
    });
  }

}



interface Person {
  name: string;
  bio: string;
  image: any;
  commits: number;
  issues: number;
  tests: number;
}

const PEOPLE: Person[] = [
  {
    name: "Jamie Wong",
    bio: "Im a senior computer science student at UT Austin. I'm from Houston, Texas and I like to read and play poker",
    image: jamie,
    commits: 0,
    issues: 0,
    tests: 0,
  },
  {
    name: "Sydney Schrader",
    bio: "I'm a Junior from Austin, TX. I like to go to Barton Springs and read in my free time.",
    image: sydney,
    commits: 0,
    issues: 0,
    tests: 0,
  },
  {
    name: "Zachary Voltz",
    bio: "I'm a senior CS student from Houston, Texas, and I've been programming since I was 9. Outside of programming, I like to read manga and rock climb",
    image: zach,
    commits: 0,
    issues: 0,
    tests: 0,
  },
  {
    name: "Pavan Marathi",
    bio: "I'm a Junior from Houston, TX. I enjoy rock climbing and board games in my spare time.",
    image: pavan,
    commits: 0,
    issues: 0,
    tests: 0,
  },
];

// Tool card info
interface ToolInfo {
  name: string, 
  imagePath: string, 
  description:string,
  url:string,
}

const apiTools: ToolInfo[] = [
  { name: "City Data", imagePath: arcadia, description: "Api we used to get city data", 
    url: "https://geohub.lacity.org/datasets/lacounty::homeless-counts-2020/explore?location=33.759300%2C-117.328488%2C8.29&showTable=true"
  }, 
  { name: "Resource Data", imagePath: volunteer, description: "Api we used to get resource data", 
    url: "https://geohub.lacity.org/datasets/lacounty::homeless-shelters-and-services/api"
  }, 
  { name: "Medical Data", imagePath: ssa, description: "Api we used to get medical locations", 
    url: "https://geohub.lacity.org/datasets/lacounty::medicare-and-medicaid-offices/api" 
  }
];

const devTools: ToolInfo[] = [
  { name: "Gitlab", imagePath: gitlabPic, description: "Development Platform", 
    url: "https://gitlab.com/sydneyschrader/cs373-idb-01"
  }, 
  { name: "React", imagePath: reactPic, description: "Web UI Library", 
    url: "https://react.dev/"
  }, 
  { name: "Bootstrap", imagePath: bootstrapPic, description: "CSS Framework", 
    url: "https://getbootstrap.com/"
  },
  { name: "Flask", imagePath: flaskPic, description: "Micro Web Framework", 
    url: "https://flask.palletsprojects.com/en/3.0.x/"
  },
  { name: "SQLAlchemy", imagePath: sqlAlchPic, description: "SQL Toolkit", 
    url: "https://www.sqlalchemy.org/"
  },
  { name: "Postman", imagePath: postmanPic, description: "API documentation", 
    url: "https://documenter.getpostman.com/view/28474521/2s9YJZ3jad"
  },
];


export default About;
