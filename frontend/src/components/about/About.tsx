import React, { useState, useEffect } from "react";
//import axios from "axios";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
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

import {
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
  Button,
  Tooltip,
  Skeleton,
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


type ContributorDetails = {
  commits: number;
  issues: number; 
};

type ContributorsDictionary = {
  [key: string]: ContributorDetails;
};


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

];


const About: React.FC<{}> = () => {

  

    //const [gitData, setGitData] = useState<any[]>([])
    const [gitData, setGitData] = useState<ContributorsDictionary>({});



    useEffect(() => {
      const fetchContributors = async () => {
        try {
          const response = await axios.get('https://api.lacountyhomelesshelper.me/about');
          //console.log(response.data);
          setGitData(response.data);
        } catch (error) {
          console.error('Error fetching contributors:', error);
        }
      };
  
      fetchContributors();
    }, []);

    useEffect(() => {
      if (gitData["Jamie Wong"]) {
        people[0].commits = gitData["Jamie Wong"].commits
        people[0].issues = gitData["Jamie Wong"].issues
      }
      if (gitData["Sydney Schrader"]) {
        people[1].commits = gitData["Sydney Schrader"].commits
        people[1].issues = gitData["Sydney Schrader"].issues
      }
      if (gitData["Zachary Voltz"]) {
        people[2].commits = gitData["Zachary Voltz"].commits
        people[2].issues = gitData["Zachary Voltz"].issues
      }
      if (gitData["Pavan Marathi"]) {
        people[3].commits = gitData["Pavan Marathi"].commits
        people[3].issues = gitData["Pavan Marathi"].issues
      }

    }, [gitData]);
   

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
          {devTools.map(Tool)}
        </ Stack>



        </Col>

      </Container>
    );
    
   
};
 
export default About;
