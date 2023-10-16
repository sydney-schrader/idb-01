import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ssg from '../../assets/ssg.jpg'
import family from '../../assets/familycrisiscenter.png'
import arcadia_thrift from '../../assets/arcadia-thrift.jpg'

  
const Resources: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>Shelters and Services in Los Angeles</h1>
        </Col>
        <Row>
        <div> 3 Resources</div>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Special Service For Groups - Project 180</b>
              </Card.Title>
              <img
                src={ssg}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
                <p>
                    Name: Special Service For Groups - Project 180<br/>
                    City: Los Angeles<br/>
                    Hours: SITE HOURS: Monday through Friday, 8:30am to 4:30pm.<br/>
                    Zip code: 90013<br/>
                    Phone Number: FAX (213) 621-4155, Service/Intake (213) 620-5712
                </p>
                <Button name='href' href='/resources/shelter1' className='card-link'>
                  View Special Service For Groups - Project 180
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>1736 Family Crisis Center</b>
              </Card.Title>
              <img
                src={family}
                alt=""
                className='card-image-top'
                style={{
                  width: '80%',
                }}
              ></img>
              <Card.Body>
              <p>
              Name: 1736 Family Crisis Center<br/>
                    City: Los Angeles<br/>
                    Hours: Monday through Friday, 8:30am to 5:30pm. Evenings and Saturdays by appointment<br/>
                    Zip code: 90018<br/>
                    Phone Number: 24 Hrs-Crisis Hotline Service/Intake and Hotline (213) 222-1237, 24 Hrs-Youth Crisis/Shelter Hotline Service/Intake and Hotline (310) 379-3620, 24 Hrs-DV Shelter Hotline Service/Intake and Hotline (310) 370-5902, Community Service Center Service/Intake an
                </p>
                <Button name='href' href='/resources/shelter2' className='card-link'>
                  View 1736 Family Crisis Center
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Arcadia Welfare And Thrift Shop</b>
              </Card.Title>
              <img
                src={arcadia_thrift}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
              Name: Arcadia Welfare And Thrift Shop <br/>
                    City: Arcadia<br/>
                    Hours: Monday through Friday, 9:00am to 4:30pm<br/>
                    Zip code: 91006<br/>
                    Phone Number: Thrift Shop Service/Intake (626) 447-2881,  Service/Intake (626) 447-6864
                </p>
                <Button name='href' href='/resources/shelter4' className='card-link'>
                  View Arcadia Welfare And Thrift Shop
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Resources;