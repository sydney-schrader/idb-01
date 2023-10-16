import React, { useState, useEffect } from "react";
import { Container, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ssa from '../../assets/ssa.jpeg'

import axios from "axios"; 
  
const Medical: React.FC<{}> = () => {
    
  const [medData, setMedData] = useState<any[]>([])

  // gets the city data from the api when it is running locally 
  useEffect(() => {
      // Get issues and commits from gitlab api
      axios.get(`http://127.0.0.1:5000/medicare`)
      .then((response) => { 
          console.log(response.data);
          setMedData(response.data);
          //console.log(cityData[0]["CSA_Label"]) 
        });
   
  }, []);
  
  // notes: idk how the img works yet, want it to come from google api
  const renderCard = (card: any, index: any) => {
    return(
      <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
              <Card.Title className='header-1'>
                <b>
                  {card.Name}
                </b>
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
                Name: {card.Name} <br/>
                Address: {card.addrln1} <br/>
                Hours: {card.hours} <br/>
                Phone number: {card.phones}<br/>
                <a href = {card.url}>URL for their website</a>
              </p> 
            
                <Button name='href' href='/cities/city3' className='card-link'>
                  View {card.CSA_Label}
                </Button>
              </Card.Body>
            </Card>
    )
  }

    return (
      <Container>
        <Col>
            <h1>Medicare and Medicaid locations in Los Angeles</h1>
        </Col>
        <div> {medData.length} Medical Centers </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {medData.map(renderCard)}
        </div>
        
        
        
      </Container>
    );
    
};
 
export default Medical;