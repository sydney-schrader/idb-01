import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button } from 'react-bootstrap'

import ssa from '../../assets/ssa.jpeg'

import axios from "axios"; 
  
const Medical: React.FC<{}> = () => {
    
  const [medData, setMedData] = useState<any[]>([])

  // gets the city data from the api when it is running locally 
  // useEffect(() => {
  //     // Get issues and commits from gitlab api
  //     axios.get(`http://127.0.0.1:5000/medicare`)
  //     .then((response) => { 
  //         console.log(response.data);
  //         setMedData(response.data);
  //         //console.log(cityData[0]["CSA_Label"]) 
  //       });
   
  // }, []);
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/medicare`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          office.imageURL = await fetchOfficeImage(office.Name);
          return office;
        }));
        setMedData(updatedData);
    });
}, []);

const fetchOfficeImage = async (officeName: string) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=40111269-fa085807d2390f3428b52a50e&q=${encodeURIComponent(officeName)}&image_type=photo`);
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
  return ssa; // default to ssa image if no image is found or an error occurs
}
  
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
              src={card.imageURL}
              alt={card.CSA_Label}
              className='card-image-top'
              style={{ width: '100%' }}
              />
              <Card.Body>
              
              <p>
                Name: {card.Name} <br/>
                Address: {card.addrln1} <br/>
                Hours: {card.hours} <br/>
                Phone number: {card.phones}<br/>
                <a href = {card.url}>URL for their website</a>
              </p> 
            
                <Button name='href' href='/cities/city3' className='card-link'>
                  View {card.Name}
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