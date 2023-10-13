import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import ssg from '../../../assets/ssg.jpeg'
import agourahills from '../../../assets/agoura-hills.jpeg'
import ssa from '../../../assets/ssa.jpeg'


const Shelter1: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>Special Service For Groups - Project 180</h1>
             <img
                src={ssg}
                alt=""
                className='card-image-top'
                style={{
                  width: '40%',
                }}
              ></img>
             <p>
                    Name: Special Service For Groups - Project 180<br/>
                    City: Los Angeles<br/>
                    Hours: SITE HOURS: Monday through Friday, 8:30am to 4:30pm.<br/>
                    Zip code: 90013<br/>
                    Phone Number: FAX (213) 621-4155, Service/Intake (213) 620-5712
                </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
        </div>
        <Container>
        <Col>
            <h1>Other Resources</h1>
        </Col>
        <Row>
        <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>City of Agoura Hills</b>
              </Card.Title>
              <img
                src={agourahills}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
                Unsheltered population: 2<br/>
                Sheltered population: 0 <br/>
                Total homeless population: 2 <br/>
                Square miles of city: 5.42772257254032 <br/>
                Density of total homeless population: 0.368478670984089
            </p>
                <Button name='href' href='/cities/city1' className='card-link'>
                City of Agoura Hills
                </Button>
              </Card.Body>
            </Card>
          </Col>
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
                  width: '50%',
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
                Watts Office - Social Security Administration
                </Button>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
        </>
    );
};

export default Shelter1;