import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ssa from '../../assets/ssa.jpg'
import westwood from '../../assets/westwood.jpg'
import alhambra_ssa from '../../assets/alhambra-ssa.jpg'
  
const Medical: React.FC<{}> = () => {
    
    return (
        <Container>
        <Col>
            <h1>Medicare and Medicaid Offices in Los Angeles</h1>
        </Col>
        <Row>
        <div> 3 Medical Offices</div>
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
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>Alhambra Office - Social Security Administration</b>
              </Card.Title>
              <img
                src={alhambra_ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: Alhambra Office - Social Security Administration <br/>
                Address: 900 S. Garfield Ave. Alhambra, CA 91801 <br/>
                Hours: null <br/>
                Phone number: TDD (800) 325-0778,  Service/Intake (866) 227-6561, National Toll Free Number Service/Intake (800) 772-1213, Not for referrals Administrative (626) 570-1158 <br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56627">URL for their website</a>
                </p>
                <Button name='href' href='/medical/office4' className='card-link'>
                  Alhambra Office - Social Security Administration
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Medical;