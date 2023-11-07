import volunteer from '../../assets/volunteer.jpg'
import React, { useState, useEffect, useCallback } from "react";
import { Container, Col} from 'react-bootstrap';
import { useImages } from '../ImageContext';
import axios from "axios"; 
import Resource from "./Resource";
import CardPagination from "../CardPagination";
import { Grid } from '@mui/material';
import SearchPage from '../search/SearchPage';
//fletcher
// const SEARCH_ENGINE_ID = '504ff824e28724d77';
// const GOOGLE_API_KEY = 'AIzaSyDqw5EwUP5HT6F5CiGTulm2qQRbNEGSluY';
const PIXABAY_API_KEY = '40177514-186bacba2f6bc1c6665874688'; 

  
const Resources: React.FC<{}> = () => {
    
  const perPage:number = 16
  const [shelterData, setShelterData] = useState<any[]>([])
  const { images, setImage } = useImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [sheltersPerPage] = useState(perPage);

//   const fetchShelterImage = useCallback(async (shelterName: string) => {
//     if (images[shelterName]) {
//         return images[shelterName];
//     }

//     const endpoint = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(shelterName)}&image_type=photo&per_page=1`;

//     try {
//         const response = await axios.get(endpoint);
//         if (response.data.hits && response.data.hits.length > 0) {
//             const imageUrl = response.data.hits[0].webformatURL; // Using 'webformatURL' as an example. Pixabay provides multiple image sizes.
//             setImage(shelterName, imageUrl);
//             return imageUrl;
//         }
//     } catch (error) {
//         console.error("Error fetching image from Pixabay:", error);
//     }
//     return volunteer; // Fallback to the volunteer image if no image is found on Pixabay
// }, [images, setImage]);


  useEffect(() => {
    axios.get(`https://api.lacountyhomelesshelper.me/shelters/`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          //shelter.imageURL = await fetchShelterImage(shelter.name);
          return shelter;
        }));
        setShelterData(updatedData);
    });
}, /*[fetchShelterImage]*/);

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
        <div>Instances per page: {perPage}</div>
        <SearchPage page = {"shelters"}/>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={2} // Add spacing to control the gap between items
        >
        {currentShelters.map((resource) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {Resource(resource)}
          </Grid>
        ))}
        </Grid>
        <div className="row row-cols-1 row-cols-md-2 g-4">
        {currentShelters.map(Resource)}
        </div>
        <div>Total Pages: {Math.ceil(shelterData.length / sheltersPerPage)}</div>
        <div>Current Page: {currentPage}</div>
        <CardPagination
        itemsPerPage={sheltersPerPage}
        totalItems={shelterData.length}
        paginate={paginate}
        />
      </Container>
    );
    
   
};
 
export default Resources;