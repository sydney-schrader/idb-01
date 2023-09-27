import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import medicarePic from '../../assets/medicare-image.jpeg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpeg'
  
const Cities: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>Cities in Los Angeles</h1>
        </Col>
        <Row>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>City 1</b>
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
                <p>
                Unsheltered population <br/>
                Sheltered population <br/>
                Total homeless population <br/>
                Square miles of city <br/>
                Density of total homeless population 
                </p>
                <Button name='href' href='/cities/city1' className='card-link'>
                  View City 1
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>City 2</b>
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
              <p>
                Unsheltered population <br/>
                Sheltered population <br/>
                Total homeless population <br/>
                Square miles of city <br/>
                Density of total homeless population 
                </p>
                <Button name='href' href='/cities/city2' className='card-link'>
                  View City 2
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>City 3</b>
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
              <p>
                Unsheltered population <br/>
                Sheltered population <br/>
                Total homeless population <br/>
                Square miles of city <br/>
                Density of total homeless population 
                </p>
                <Button name='href' href='/cities/city3' className='card-link'>
                  View City 3
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Cities;