import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import arcadia from '../../../assets/arcadia.jpeg'
import arcadia_thrift from '../../../assets/arcadia-thrift.jpeg'


const City3: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>City of Arcadia</h1>
             <img
                src={arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              />
             <p>
                Unsheltered population: 68 <br/>
                Sheltered population: 0 <br/>
                Total homeless population: 68 <br/>
                Square miles of city: 10.2404110274238<br/>
                Density of total homeless population: 6.64035846001651 
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
                <b>Arcadia Welfare And Thrift Shop</b>
              </Card.Title>
              <img
                src={arcadia_thrift}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
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
        </>
    );
};

export default City3;