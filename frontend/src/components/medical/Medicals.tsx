import React, { useState, useEffect, useCallback } from "react";
import { Container, Col} from 'react-bootstrap'
import ssa from '../../assets/ssa.jpeg'
import axios from "axios"; 
import Medical from "./Medical";
import { useImages } from '../ImageContext';
//ZACH
const SEARCH_ENGINE_ID = '226027a2f9e54422b';
const GOOGLE_API_KEY = 'AIzaSyAiNi5igRxIAvxcuZ1TRL7ii-Eu3sWLaWE';


const Medicals: React.FC<{}> = () => {
    
  const [medData, setMedData] = useState<any[]>([])
  const { images, setImage } = useImages();


  const fetchOfficeImage = useCallback(async (officeName: string) => {
    // First, check if the image URL is already in the context
    if (images[officeName]) {
      return images[officeName];
    }
  
    const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(officeName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
    try {
        const response = await axios.get(endpoint);
        if (response.data.items && response.data.items.length > 0) {
            const imageURL = response.data.items[0].link;
            setImage(officeName, imageURL);
            return imageURL;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
    return ssa; // default to ssa image if no image is found or an error occurs
  }, [images, setImage]); 
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/medicares`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          office.imageURL = await fetchOfficeImage(office.name);
          return office;
        }));
        setMedData(updatedData);
    });
}, [fetchOfficeImage]);

console.log(medData)


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
