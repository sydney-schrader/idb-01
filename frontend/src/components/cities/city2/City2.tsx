import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import alhambra from '../../../assets/alhambra.jpg'
import alhambra_ssa from '../../../assets/alhambra-ssa.jpg'
import family from '../../../assets/familycrisiscenter.png'


const City2: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>City of Alhambra</h1>
             <img
                src={alhambra}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              />
             <p>
                Unsheltered population: 32 <br/>
                Sheltered population: 14 <br/>
                Total homeless population: 46 <br/>
                Square miles of city: 7.63002893846662 <br/>
                Density of total homeless population: 6.02881068616818 
                </p>
            <Button name='href' href='../cities' className='card-link'>
                Back to Cities
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
                <b>Alhambra Office - Social Security Administration</b>
              </Card.Title>
              <img
                src={alhambra_ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
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
                  width: '50%',
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
                1736 Family Crisis Center
                </Button>
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
        
        </>
    );
};

export default City2;