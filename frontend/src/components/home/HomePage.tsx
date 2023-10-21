import React from 'react';
import './home.css'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import medicarePic from '../../assets/medicare-image.jpg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpg'


function Home() {
    return (
        <>
        <div className='background'>
            <h1 className='title'>
                Los Angeles <br/> Homeless Helper
            </h1>
        </div>
        <div>
           <h1 className='lower-title'>
           Instances
           </h1>
        </div>
        <Container>
        <Row>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Cities</b>
              </Card.Title>
              <img
                src={citiesPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
                <Button name='homeCities' href='/cities' className='card-link'>
                  Explore Cities in LA
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Resources</b>
              </Card.Title>
              <img
                src={resourcesPic}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
                <Button name='homeResources' href='/resources' className='card-link'>
                  Explore Resources
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Medical</b>
              </Card.Title>
              <img
                src={medicarePic}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
                <Button name='homeMedical' href='/medical' className='card-link'>
                  Explore Medical Options
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
    
   
};
 
export default Home;
