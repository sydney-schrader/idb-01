import family from '../../assets/familycrisiscenter.png'
import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button} from 'react-bootstrap'
import axios from "axios"; 
import Resource from "./Resource";
  
const Resources: React.FC<{}> = () => {
    
  const [shelterData, setShelterData] = useState<any[]>([])


  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/shelters`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          shelter.imageURL = await fetchShelterImage(shelter.name);
          return shelter;
        }));
        setShelterData(updatedData);
    });
}, []);

  console.log(shelterData)

const fetchShelterImage = async (shelterName: string) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=40111269-fa085807d2390f3428b52a50e&q=${encodeURIComponent(shelterName)}&image_type=photo`);
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
  return family; // default to family image if no image is found or an error occurs
}
    // create Resource cards
    return (
      <Container>
        <Col>
            <h1>Shelters and Services in Los Angeles</h1>
        </Col>
        <div> {shelterData.length} Resources </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {shelterData.map(Resource)}
        </div>
      </Container>
    );
    
   
};
 
export default Resources;