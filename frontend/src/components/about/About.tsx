import React, { useState, useEffect } from "react";
//import axios from "axios";
import axios from "axios";
import { Container, Col } from 'react-bootstrap'
import jamie from '../../assets/jamie.jpg'
import pavan from '../../assets/pavan.jpg'
import sydney from '../../assets/sydney.jpg'
import zach from '../../assets/zach.jpg'
import bootstrapPic from '../../assets/bootstrapPic.jpg'
import gitlabPic from '../../assets/gitlabPic.png'
import styles from './About.module.css'
import Developer from "./Developer";
import Tool from "./Tool";
import arcadia from '../../assets/arcadia.jpg'
import volunteer from '../../assets/volunteer.jpg'
import ssa from '../../assets/ssa.jpg'
import reactPic from '../../assets/React-icon.jpg'
import flaskPic from '../../assets/flaskPic.jpg'
import sqlAlchPic from '../../assets/sqlAlchPic.jpg'
import postmanPic from '../../assets/postmanPic.jpg'

import {
  Typography,
  Stack,
} from "@mui/material";
import ApiTool from "./ApiTool";


// Developer card info

interface DevInfo {
  name: string, 
  imagePath: string, 
  devType:string,
  description:string,
  commits:number,
  issues: number,
}

const people: DevInfo[] = [
  { name: "Jamie Wong", imagePath: jamie, devType: "Frontend Developer", description: 
    "Im a senior computer science student at UT Austin. I'm from Houston, Texas and I like to read and play poker",
    commits: 0, 
    issues: 0,
  },
  { name: "Sydney Schrader", imagePath: sydney, devType: "Frontend Developer", description:
    "I'm a Junior from Austin, TX. I like to go to Barton Springs and read in my free time.",
    commits: 0, 
    issues:0, 
  },
  { name: "Zachary Voltz", imagePath: zach, devType: "Backend Developer", description:
    "I'm a senior CS student from Houston, Texas, and I've been programming since I was 9. Outside of programming, I like to read manga and rock climb",
    commits: 0,
    issues:0,
  },
  { name: "Pavan Marathi", imagePath: pavan, devType: "Backend Developer", description:
    "I'm a Junior from Houston, TX. I enjoy rock climbing and board games in my spare time.",
    commits: 0, 
    issues:0, 
  }
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


const About: React.FC<{}> = () => {

  

  const [commitData, setCommitData] = useState<any[]>([])

  const [issueData, setIssueData] = useState<any[]>([])







  useEffect(() => {
    // Get issues and commits from gitlab api
    axios.get(`https://gitlab.com/api/v4/projects/50431924/repository/commits?per_page=500`)
    .then((response) => { 
        console.log(response.data);
        setCommitData(response.data); });

    axios.get(`https://gitlab.com/api/v4/projects/50431924/issues?per_page=500`)
    .then((response) => {setIssueData(response.data); });
    
  }, []);
  

  people[0].commits = commitData.filter(
    (commit) => commit.author_name === "Jamie Wong"
  ).length

  people[0].issues = issueData.filter(
    (issue: any) => issue.closed_by != null
  ).filter(((issue) => issue.closed_by.name === "Jamie Wong")).length

  people[1].commits = commitData.filter(
    (commit) => commit.author_name === "Sydney Schrader"
  ).length

  people[1].issues = issueData.filter(
    (issue: any) => issue.closed_by != null
  ).filter(((issue) => issue.closed_by.name === "Sydney Schrader")).length

  people[2].commits = commitData.filter(
    (commit) => commit.author_name === "Zachary Voltz"
  ).length

  people[2].issues = issueData.filter(
    (issue: any) => issue.closed_by != null
  ).filter(((issue) => issue.closed_by.name === "Zachary Voltz")).length

  people[3].commits = commitData.filter(
    (commit) => commit.author_name === "Pavan Marathi"
  ).length

  people[3].issues = issueData.filter(
    (issue: any) => issue.closed_by != null
  ).filter(((issue) => issue.closed_by.name === "Pavan Marathi")).length
   
   

    return (
        <Container>
        
        <Col>
            <h1>About LA Homeless Helper</h1>
            <div className= {styles['textType']}>
            California has the largest amount of homless in the United States, the majority being in LA County. 
            This website links together city homeless data, homeless resource data, and medicare/medicaid data. 
            This disparate data can be used to analyze what locations have what services, and could be used to see what
            locations could use more help based on homless population density. This tool is designed
            for people wanting to help the homeless of LA County and also a tool 
            for homeless people to see what resources are available for them.
            </div>
 
        </Col>

        <Stack
        direction="row"
        justifyContent="center"
        >
          <div className="card-group">
            {people.map(Developer)}
          </ div>
        </Stack>


        <Col>

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



        </Col>

      </Container>
    );
    
   
};
 
export default About;
