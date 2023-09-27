import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import jamie from '../../assets/jamie.jpeg'
import pavan from '../../assets/pavan.jpg'
import sydney from '../../assets/sydney.jpeg'
import john from '../../assets/john.jpg'
import zach from '../../assets/zach.jpg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpeg'
import styles from './About.module.css'
  
const About: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>About LA Homeless Helper</h1>
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
      </Container>
    );
    
   
};
 
export default About;