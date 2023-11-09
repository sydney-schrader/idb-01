import React, { useState, useEffect, useCallback } from "react";
import { Container, Col } from 'react-bootstrap'
import { useImages } from '../ImageContext';
import arcadia from '../../assets/arcadia.jpg'
import axios from "axios"; 
import City from "./City";
import CardPagination from "../CardPagination";
import {Grid} from "@mui/material";
import SearchBar from '../search/SearchBar'; // Import the SearchPage component


const Cities: React.FC<{}> = () => {

  const perPage:number = 16
  const [cityData, setCityData] = useState<any[]>([])
  const { images, setImage } = useImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(perPage);


  // const fetchCityImage = useCallback(async (cityName: string) => {
  //     if (images[cityName]) {
  //         return images[cityName];
  //     }
  
  //     const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(cityName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
  //     try {
  //         const response = await axios.get(endpoint);
  //         if (response.data.items && response.data.items.length > 0) {
  //             setImage(cityName, response.data.items[0].link);
  //             return response.data.items[0].link;
  //         }
  //     } catch (error) {
  //         console.error("Error fetching image:", error);
  //     }
  //     return arcadia;
  // }, [images, setImage]);

  useEffect(() => {
    axios.get(`https://api.lacountyhomelesshelper.me/cities`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (city: any) => {
          //city.imageURL = await fetchCityImage(city.csa_label);
          return city;
        }));
        setCityData(updatedData);
    });
  });

  // get the current model cards
  const indexOfLastPost = currentPage * citiesPerPage;
  const indexOfFirstPost = indexOfLastPost - citiesPerPage;
  const currentCities = cityData.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber: any)=> setCurrentPage(pageNumber);

    // create City cards 
    return (
      <Container>
        <Col>
            <h1>Cities in Los Angeles</h1>
        </Col>
        <div> {cityData.length} Cities </div>
        <div> Attributes: Unsheltered population, Sheltered population, Total homeless population, Square miles of city, Density of total homeless population</div>
        <div>Instances per page: {perPage}</div>
        <SearchBar page = {"cities"}/>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={2} // Add spacing to control the gap between items
        >
        {currentCities.map((city) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {City(city)}
          </Grid>
        ))}
        </Grid>
        <div>Total Pages: {Math.ceil(cityData.length / citiesPerPage)}</div>
        <div>Current Page: {currentPage}</div>
        <CardPagination
        itemsPerPage={citiesPerPage}
        totalItems={cityData.length}
        paginate={paginate}
        />
      </Container>
    );
    
   
};
 
export default Cities;
