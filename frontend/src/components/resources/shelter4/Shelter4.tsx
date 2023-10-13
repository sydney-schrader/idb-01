import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import arcadia_thrift from '../../../assets/arcadia-thrift.jpg'
import arcadia from '../../../assets/arcadia.jpg'
import westwood from '../../../assets/westwood.jpg'

const Shelter4: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>Arcadia Welfare And Thrift Shop</h1>
             <img
                src={arcadia_thrift}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
             <p>
              Name: Arcadia Welfare And Thrift Shop <br/>
                    City: Arcadia<br/>
                    Hours: Monday through Friday, 9:00am to 4:30pm<br/>
                    Zip code: 91006<br/>
                    Phone Number: Thrift Shop Service/Intake (626) 447-2881,  Service/Intake (626) 447-6864
                </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
            {/* <Button name='href' href='../cities/city3' className='card-link'>
                Back to Arcadia
            </Button> */}
        </div>
        <Container>
        <Col>
            <h1>Other Resources</h1>
        </Col>
        <Row>
        <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>City of Arcadia</b>
              </Card.Title>
              <img
                src={arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '40%',
                }}
              ></img>
              <Card.Body>
              <p>
                Unsheltered population: 68 <br/>
                Sheltered population: 0 <br/>
                Total homeless population: 68 <br/>
                Square miles of city: 10.2404110274238<br/>
                Density of total homeless population: 6.64035846001651 
            </p>
                <Button name='href' href='/cities/city3' className='card-link'>
                  City of Arcadia
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
                  width: '50%',
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
                  View Westwood Office - Social Security Administration
                </Button>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
        </>
    );
};

export default Shelter4;