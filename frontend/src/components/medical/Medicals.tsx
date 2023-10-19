import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button } from 'react-bootstrap'
import ssa from '../../assets/ssa.jpeg'
import axios from "axios"; 
import Medical from "./Medical";

const Medicals: React.FC<{}> = () => {
    
  const [medData, setMedData] = useState<any[]>([])


  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/medicares`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          office.imageURL = await fetchOfficeImage(office.Name);
          return office;
        }));
        setMedData(updatedData);
    });
}, []);

console.log(medData)

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
    // create medical cards
    return (
      <Container>
        <Col>
            <h1>Medicare and Medicaid locations in Los Angeles</h1>
        </Col>
        <div> {medData.length} Medical Centers </div>
        <div>Attributes: Name, Address, Hours, Phone number, URL for their website</div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {medData.map(Medical)}
        </div>
      </Container>
    );

    
};
 
export default Medicals;
