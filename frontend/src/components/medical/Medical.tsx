import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ssa from '../../assets/ssa.jpeg'
import elmonte from '../../assets/elmonta.jpeg'
import westwood from '../../assets/westwood.jpeg'
  
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
                <b>Watts Office - Social Security Administration</b>
              </Card.Title>
              <img
                src={ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
                <p>
                Name: Watts Office - Social Security Administration <br/>
                Address: 12429 S. Avalon Blvd. Los Angeles, CA 90061<br/>
                Hours: Monday, Tuesday, Thursday, Friday, 9:00am to 3:00pm; Wednesday, 9:00am to 12:00pm. <br/>
                Phone number: TDD (800) 325-0778, National Toll Free Number Service/Intake (800) 772-1213, Not for Referrals Administrative (323) 754-1404, General Information Service/Intake (877) 836-1558 <br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56598">URL for their website</a>
                </p>
                <Button name='href' href='/medical/office1' className='card-link'>
                  View Watts Office - Social Security Administ
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>El Monte Office - Social Security Administration</b>
              </Card.Title>
              <img
                src={elmonte}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: El Monte Office - Social Security Administration <br/>
                Address: 9351 Telstar Ave. El Monte, CA 91731 <br/>
                Hours: Monday through Friday, 9:00am to 3:30pm. <br/>
                Phone number  Service/Intake (866) 931-0340, National Toll Free Number Service/Intake (800) 772-1213, Not for referral Administrative (866) 643-3453<br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56600">URL for their website</a>
                </p>
                <Button name='href' href='/medical/office2' className='card-link'>
                  View El Monte Office - Social Security Administration
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Westwood Office - Social Security Administration</b>
              </Card.Title>
              <img
                src={westwood}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: Westwood Office - Social Security Administration <br/>
                Address: 11500 W Olympic Blvd. Los Angeles, CA 90064 <br/>
                Hours: Monday through Friday, 9:00am to 3:30pm. <br/>
                Phone number: TDD (800) 325-0778, National Toll Free Number Service/Intake (800) 772-1213, Not for referrals Administrative (310) 575-9464, Service/Intake (866) 964-4779 <br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56601">URL for their website</a>
                </p>
                <Button name='href' href='/medical/office3' className='card-link'>
                  Westwood Office - Social Security Administration
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Medical;