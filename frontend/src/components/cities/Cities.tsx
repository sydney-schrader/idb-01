import React, { useState, useEffect, useCallback } from "react";
import { Container, Col } from 'react-bootstrap'
import { useImages } from '../ImageContext';
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios"; 
import City from "./City";
import CardPagination from "../CardPagination";
//jamie
const SEARCH_ENGINE_ID = '129c571c4e1a84a03';
const GOOGLE_API_KEY = 'AIzaSyAwozhLVzasZOIiW387q1P0NMtJTrhvD20';

const Cities: React.FC<{}> = () => {

  const perPage:number = 16
  const [cityData, setCityData] = useState<any[]>([])
  const { images, setImage } = useImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(perPage);


  const fetchCityImage = useCallback(async (cityName: string) => {
      if (images[cityName]) {
          return images[cityName];
      }
  
      const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(cityName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
      try {
          const response = await axios.get(endpoint);
          if (response.data.items && response.data.items.length > 0) {
              setImage(cityName, response.data.items[0].link);
              return response.data.items[0].link;
          }
      } catch (error) {
          console.error("Error fetching image:", error);
      }
      return arcadia;
  }, [images, setImage]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/cities`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (city: any) => {
          city.imageURL = await fetchCityImage(city.csa_label);
          return city;
        }));
        setCityData(updatedData);
    });
  }, [fetchCityImage]);

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
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {currentCities.map(City)}
        </div>
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
