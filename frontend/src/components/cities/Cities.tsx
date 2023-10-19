import React, { useState, useEffect } from "react";
import { Container, Col } from 'react-bootstrap'
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios"; 
import City from "./City";

const Cities: React.FC<{}> = () => {

  const [cityData, setCityData] = useState<any[]>([])


  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/cities`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (city: any) => {
          city.imageURL = await fetchCityImage(city.csa_label);
          return city;
        }));
        setCityData(updatedData);
    });
  }, []);

  console.log(cityData)

const fetchCityImage = async (cityName: string) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=40111269-fa085807d2390f3428b52a50e&q=${encodeURIComponent(cityName)}&image_type=all`);
    if (response.data.hits && response.data.hits.length > 0) {
          return response.data.hits[0].largeImageURL;
      }
  } catch (error) {
      console.error("Error fetching image:", error);
  }
  return arcadia; // default to arcadia image if no image is found or an error occurs
}
    // create City cards 
    return (
      <Container>
        <Col>
            <h1>Cities in Los Angeles</h1>
        </Col>
        <div> {cityData.length} Cities </div>
        <div> Attributes: Unsheltered population, Sheltered population, Total homeless population, Square miles of city, Density of total homeless population</div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {cityData.map(City)}
        </div>
      </Container>
    );
    
   
};
 
export default Cities;
