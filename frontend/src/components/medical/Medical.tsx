import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import medicarePic from '../../assets/medicare-image.jpeg'
import citiesPic from '../../assets/cities-image.jpg'
import resourcesPic from '../../assets/resources-image.jpeg'
  
const Medical: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>Medicare and Medicaid Offices in Los Angeles</h1>
        </Col>
        <Row>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Office 1</b>
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
                Address <br/>
                Hours <br/>
                Phone number <br/>
                URL for their website
                </p>
                <Button name='href' href='/medical/office1' className='card-link'>
                  View Office 1
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Office 2</b>
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
                Address <br/>
                Hours <br/>
                Phone number <br/>
                URL for their website
                </p>
                <Button name='href' href='/medical/office2' className='card-link'>
                  View Office 2
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Office 3</b>
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
                Address <br/>
                Hours <br/>
                Phone number <br/>
                URL for their website
                </p>
                <Button name='href' href='/medical/office3' className='card-link'>
                  View Office 3
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Medical;