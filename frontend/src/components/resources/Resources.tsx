import volunteer from '../../assets/volunteer.jpg'
import React, { useState, useEffect, useCallback } from "react";
import { Container, Col} from 'react-bootstrap';
import { useImages } from '../ImageContext';
import axios from "axios"; 
import Resource from "./Resource";
import CardPagination from "../CardPagination";


const SEARCH_ENGINE_ID = '553cf4cb73ceb44f9';
const GOOGLE_API_KEY = 'AIzaSyBKgsK1qxLNrUTRUmjmEUCWlQxxEgH__j8';
  
const Resources: React.FC<{}> = () => {
    
  const [shelterData, setShelterData] = useState<any[]>([])
  const { images, setImage } = useImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [sheltersPerPage] = useState(16);

  const fetchShelterImage = useCallback(async (shelterName: string) => {
    if (images[shelterName]) {
        return images[shelterName];
    }

    const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(shelterName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
    try {
        const response = await axios.get(endpoint);
        if (response.data.items && response.data.items.length > 0) {
            setImage(shelterName, response.data.items[0].link);
            return response.data.items[0].link;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
    return volunteer;
}, [images, setImage]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/shelters`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          shelter.imageURL = await fetchShelterImage(shelter.name);
          return shelter;
        }));
        setShelterData(updatedData);
    });
}, [fetchShelterImage]);

    // get the current model cards
  const indexOfLastPost = currentPage * sheltersPerPage;
  const indexOfFirstPost = indexOfLastPost - sheltersPerPage;
  const currentShelters = shelterData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: any)=> setCurrentPage(pageNumber);

    // create Resource cards
    return (
      <Container>
        <Col>
            <h1>Shelters and Services in Los Angeles</h1>
        </Col>
        <div> {shelterData.length} Resources </div>
        <div> Attributes: Name, Address, Hours, Zipcode, Link to their website</div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
        {currentShelters.map(Resource)}
        </div>
        <CardPagination
        itemsPerPage={sheltersPerPage}
        totalItems={shelterData.length}
        paginate={paginate}
        />
      </Container>
    );
    
   
};
 
export default Resources;