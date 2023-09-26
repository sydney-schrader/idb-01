import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import medicarePic from '../../assets/medicare-image.jpeg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpeg'

  
const Resources: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>Shelters and Services in Los Angeles</h1>
        </Col>
        <Row>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>shelter 1</b>
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
                    Name <br/>
                    City<br/>
                    Hours<br/>
                    Zip code<br/>
                    Phone Number
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>shelter 2</b>
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
              Name <br/>
                    City<br/>
                    Hours<br/>
                    Zip code<br/>
                    Phone Number
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>shelter 3</b>
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
              Name <br/>
                    City<br/>
                    Hours<br/>
                    Zip code<br/>
                    Phone Number
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Resources;