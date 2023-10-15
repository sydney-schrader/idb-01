import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import agourahills from '../../assets/agoura-hills.jpeg'
import alhambra from '../../assets/alhambra.jpeg'
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios";  

const Cities: React.FC<{}> = () => {
  
  // making a city object that we can use for an array later


  const [cityData, setCityData] = useState<any[]>([])

  // gets the city data from the api when it is running locally 
  useEffect(() => {
      // Get issues and commits from gitlab api
      axios.get(`http://127.0.0.1:5000/cities`)
      .then((response) => { 
          console.log(response.data);
          setCityData(response.data);
          console.log(cityData[0].CSA_Label) });
   
  }, []);

  const renderCard = (card: any, index: any) => {

  }


    return (
        <Container>
        <Col>
            <h1>Cities in Los Angeles</h1>
        </Col>
        <Row>
        <div> {cityData.length} Cities </div>
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
                  width: '100%',
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
                <b>City of Alhambra</b>
              </Card.Title>
              <img
                src={alhambra}
                alt=""
                className='card-image-top'
                style={{
                  width: '100%',
                }}
              ></img>
              <Card.Body>
              <p>
                Unsheltered population: 32 <br/>
                Sheltered population: 14 <br/>
                Total homeless population: 46 <br/>
                Square miles of city: 7.63002893846662 <br/>
                Density of total homeless population: 6.02881068616818 
                </p>
                <Button name='href' href='/cities/city2' className='card-link'>
                  View City of Alhambra
                </Button>
              </Card.Body>
            </Card>
          </Col>
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
                  width: '100%',
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
                  View City of Arcadia
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
   
};
 
export default Cities;
