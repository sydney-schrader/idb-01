import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import jamie from '../../assets/jamie.jpeg'
import pavan from '../../assets/pavan.jpg'
import sydney from '../../assets/sydney.jpeg'
import john from '../../assets/john.jpg'
import zach from '../../assets/zach.jpg'
import bootstrapPic from '../../assets/bootstrapPic.jpeg'
import gitlabPic from '../../assets/gitlabPic.png'
import styles from './About.module.css'
  
const About: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>About LA Homeless Helper</h1>
            <div className= {styles['textType']}>
            California has the largest amount of homless in the United States, the majority being in LA County. 
            This website is a tool designed for people wanting to help the homeless of LA County and also a tool 
            for homeless people to see what resources are available for them.
            </div>
            

            
            
        </Col>
        <Row>
        <div className="card mx-auto">
            
        <div className="card-group">
            <Card style={{ alignItems: 'center', width: '18rem', height: '35rem'  }}>
              <Card.Title className='header-1'>
                <b>Jamie Wong</b>
              </Card.Title>
              <img
                src={jamie}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
                <p>
                    <div className= {styles['devType']}>
                        Frontend Developer
                    </div>
                 
                Im a senior computer science student at UT Austin. I'm from Houston, 
                Texas and I like to read and play poker<br/>
               
                </p>
              </Card.Body>
            </Card>
          
          
            <Card style={{ alignItems: 'center', width: '18rem', height: '35rem'  }}>
              <Card.Title className='header-1'>
                <b>John Park</b>
              </Card.Title>
              <img
                src={john}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Full Stack Developer
                    </div>
                    I’m a senior CS student from Austin, TX. 
                    My favorite hobby is training jiu jitsu.
                </p>
              </Card.Body>
            </Card>
          
          
            <Card style={{ alignItems: 'center', width: '18rem', height: '35rem'  }}>
              <Card.Title className='header-1'>
                <b>Pavan Marathi</b>
              </Card.Title>
              <img
                src={pavan}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Backend Developer
                </div>
                 
                 I'm a Junior from Houston, TX. I enjoy rock climbing and board games in my spare time. <br/>
               
                </p>
              </Card.Body>
            </Card>
          

        
            <Card style={{ alignItems: 'center', width: '18rem', height: '35rem'  }}>
              <Card.Title className='header-1'>
                <b>Sydney Schrader</b>
              </Card.Title>
              <img
                src={sydney}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Frontend Developer
                </div>
                I'm a Junior from Austin, TX. I like to go to Barton Springs and read in my free time.
                </p>
              </Card.Body>
            </Card>
          
            <Card style={{ alignItems: 'center', width: '18rem', height: '35rem' }}>
              <Card.Title className='header-1'>
                <b>Zachary Voltz</b>
              </Card.Title>
              <img
                src={zach}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
              <div className= {styles['devType']}>
                        Backend Developer
                    </div>
                    I'm a senior CS student from Houston, 
                    Texas, and I've been programming since I was 9. Outside of programming, 
                    I like to read manga and rock climb
                </p>
              </Card.Body>
            </Card>
            </ div>
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