import React, { useState, useEffect, useCallback } from "react";
import { Container, Col} from 'react-bootstrap'
import ssa from '../../assets/ssa.jpg'
import axios from "axios"; 
import Medical from "./Medical";
import { Grid } from "@mui/material";
import { useImages } from '../ImageContext';
import CardPagination from "../CardPagination";
//ZACH
const SEARCH_ENGINE_ID = '226027a2f9e54422b';
const GOOGLE_API_KEY = 'AIzaSyAiNi5igRxIAvxcuZ1TRL7ii-Eu3sWLaWE';


const Medicals: React.FC<{}> = () => {
  
  const perPage:number = 8
  const [medData, setMedData] = useState<any[]>([])
 // const { images, setImage } = useImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [medsPerPage] = useState(perPage);

  // const fetchOfficeImage = useCallback(async (officeName: string) => {
  //   // First, check if the image URL is already in the context
  //   if (images[officeName]) {
  //     return images[officeName];
  //   }
  
  //   const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(officeName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
  //   try {
  //       const response = await axios.get(endpoint);
  //       if (response.data.items && response.data.items.length > 0) {
  //           const imageURL = response.data.items[0].link;
  //           setImage(officeName, imageURL);
  //           return imageURL;
  //       }
  //   } catch (error) {
  //       console.error("Error fetching image:", error);
  //   }
  //   return ssa; // default to ssa image if no image is found or an error occurs
  // }, [images, setImage]); 
  
  useEffect(() => {
    axios.get(`https://api.lacountyhomelesshelper.me/medicares`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          //office.imageURL = await fetchOfficeImage(office.name);
          return office;
        }));
        setMedData(updatedData);
    });
});

console.log(medData)
const indexOfLastPost = currentPage * medsPerPage;
const indexOfFirstPost = indexOfLastPost - medsPerPage;
const currentMedicals = medData.slice(indexOfFirstPost, indexOfLastPost);
// Change page
const paginate = (pageNumber: any)=> setCurrentPage(pageNumber);

    // create medical cards
    return (
      <Container>
        <Col>
            <h1>Medicare and Medicaid locations in Los Angeles</h1>
        </Col>
        <div> {medData.length} Medical Centers </div>
        <div>Attributes: Name, Address, Hours, Phone number, URL for their website</div>
        <div>Instances per page: {perPage}</div>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={2} // Add spacing to control the gap between items
        >
        {currentMedicals.map((med) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {Medical(med)}
          </Grid>
        ))}
        </Grid>
        <div>Total Pages: {Math.ceil(medData.length / medsPerPage)}</div>
        <div>Current Page: {currentPage}</div>
        <CardPagination
        itemsPerPage={medsPerPage}
        totalItems={medData.length}
        paginate={paginate}
        />
      </Container>
    );

    
};
 
export default Medicals;
