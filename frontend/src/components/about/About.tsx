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
//let data: ApiData = {};
//const [gitData, setGitData] = useState<any[]>([])

type ContributorDetails = {
  commits: number;
  issues: number; // The '?' denotes that the 'issues' property is optional because not all contributors might have issues.
};

type ContributorsDictionary = {
  [key: string]: ContributorDetails;
};

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

        <Row>
          <div className="card-group">
            {people.map(Developer)}
          </ div>
        </Row>

        <Col>

        <div className= {styles['heading1Type']}>
        LA Homeless Helper Sources
        </div>
            
        <div className="d-flex position-relative">
  
        <div className="position-relative">
            <div className= {styles['linkSpaceType']}>
    
    
            <a href="https://geohub.lacity.org/datasets/lacounty::homeless-counts-2020/explore?location=33.759300%2C-117.328488%2C8.29&showTable=true" className="stretched-link" >City Data</a>
            </ div>
        </div>
  
        <div className="position-relative">
        <div className= {styles['linkSpaceType']}>
            <a href="https://geohub.lacity.org/datasets/lacounty::homeless-shelters-and-services/api" className="stretched-link" >Resource Data</a>
            </ div>
        </div>

        <div className="position-relative">
        <div className= {styles['linkSpaceType']}>
            <a href="https://geohub.lacity.org/datasets/lacounty::medicare-and-medicaid-offices/api" className="stretched-link" >Medical Data</a>
            </ div>
        </div>
        

        
    
    </div>

    <div className= {styles['heading1Type']}>
        Tools
    </div>
    <div className="card mx-auto">
            
        <div className="card-group">
        <Card style={{ alignItems: 'center', width: '10rem', height: '20rem'  }}>
              <Card.Title className='header-1'>
                <b>Gitlab</b>
              </Card.Title>
              <img
                src={gitlabPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '20%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Gitlab
                </div>
                    <div className="position-relative">
                    <a href="https://gitlab.com/sydneyschrader/cs373-idb-01" className="stretched-link" >Our Repository</a>
                    </div>
                </p>
              </Card.Body>
            </Card>
            


            <Card style={{ alignItems: 'center', width: '10rem', height: '20rem'  }}>
              <Card.Title className='header-1'>
                <b>Bootstrap</b>
              </Card.Title>
              <img
                src={bootstrapPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '20%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Gitlab
                </div>
                    <div className="position-relative">
                    <a href="https://getbootstrap.com/" className="stretched-link" >Bootstrap Website</a>
                    </div>
                </p>
              </Card.Body>
            </Card>

        </ div>  
        

    </div>

        </Col>

      </Container>
    );
    
   
};
 
export default About;
