import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import agourahills from '../../assets/agoura-hills.jpeg'
import alhambra from '../../assets/alhambra.jpeg'
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios"; 
import styles from './Cities.module.css' 
import { Box } from "@mui/material";

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
          //console.log(cityData[0]["CSA_Label"]) 
        });
   
  }, []);
  
  // notes: idk how the img works yet, want it to come from google api
  const renderCard = (card: any, index: any) => {
    return(
      <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
              <Card.Title className='header-1'>
                <b>
                  {card.CSA_Label}
                </b>
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
                Unsheltered population: {card.Total_Unsheltered_Pop} <br/>
                Sheltered population: {card.Total_Sheltered_Pop} <br/>
                Total homeless population: {card.Total_Pop} <br/>
                Square miles of city: {card.Square_Miles}<br/>
                Density of total homeless population: {card.Density_Total} 
            </p>
                <Button name='href' href='/cities/city3' className='card-link'>
                  View City of Arcadia
                </Button>
              </Card.Body>
            </Card>
    )
  }


    return (
      <Container>
        <Col>
            <h1>Cities in Los Angeles</h1>
        </Col>
        <div> {cityData.length} Cities </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {cityData.map(renderCard)}
        </div>
        
        
        
      </Container>
    );
    
   
};
 
export default Cities;
