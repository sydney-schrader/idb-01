import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button } from 'react-bootstrap'
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios"; 

const Cities: React.FC<{}> = () => {
  
  // making a city object that we can use for an array later


  const [cityData, setCityData] = useState<any[]>([])

  // // gets the city data from the api when it is running locally 
  // useEffect(() => {
  //     // Get cities from backend API
  //     axios.get(`http://127.0.0.1:5000/cities`)
  //     .then(async (response) => { 
  //         console.log(response.data);
  //         setCityData(response.data);
  //         //console.log(cityData[0]["CSA_Label"]) 
  //       });
   
  // }, []);
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/cities`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (city: any) => {
          city.imageURL = await fetchCityImage(city.CSA_Label);
          return city;
        }));
        setCityData(updatedData);
    });
}, []);


const fetchCityImage = async (cityName: string) => {
  try {
      const response = await axios.get(`https://pixabay.com/api/?key=40111269-fa085807d2390f3428b52a50e&q=${encodeURIComponent(cityName)}&image_type=photo`);
      if (response.data.hits && response.data.hits.length > 0) {
          return response.data.hits[0].largeImageURL;
      }
  } catch (error) {
      console.error("Error fetching image:", error);
  }
  return arcadia; // default to arcadia image if no image is found or an error occurs
}

  
  
  // notes: idk how the img works yet, want it to come from google api
  // * syd update - using unsplash API, notes: Be aware that making a new API call for each city can quickly use up your 
  //Unsplash API limits and slow down your page. Consider caching the images or using a lazy loading mechanism
  const renderCard = (card: any, index: any) => {
    return(
      <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
              <Card.Title className='header-1'>
                <b>
                  {card.CSA_Label}
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
                Unsheltered population: {card.Total_Unsheltered_Pop} <br/>
                Sheltered population: {card.Total_Sheltered_Pop} <br/>
                Total homeless population: {card.Total_Pop} <br/>
                Square miles of city: {card.Square_Miles}<br/>
                Density of total homeless population: {card.Density_Total} 
            </p>
                <Button name='href' href='/cities/city3' className='card-link'>
                  View {card.CSA_Label} *pages not implemented
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
