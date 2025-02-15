import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from "axios"; 
import City from "./City";
import CardPagination from "../CardPagination";
import {Grid} from "@mui/material";
import SearchBar from '../search/SearchBar'; // Import the SearchPage component

type SearchResult = {
  csa_label: string;
  name: string;
};

const Cities: React.FC<{}> = () => {

  const perPage:number = 16
  const [cityData, setCityData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(perPage);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null); // Store search results
  const [query, setQuery] = useState('');
  const [sorted, isSorted] = useState(false);


  const handleSearchResults = (results: SearchResult[]) => {
    // Callback function to receive search results from SearchBar
    setSearchResults(results);
  };

  const handleSort = (column: string, order: string) => {
    // Make an API request with the sorting parameter
    axios.get(`https://api.lacountyhomelesshelper.me/cities/?${column}`)
      .then(async (response) => {
        let updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          return shelter;
        }));
  
        // Check if the sorted column is 'total_pop' and reverse the data
        if (order === 'decreasing') {
          updatedData = updatedData.reverse();
        }
  
        setCityData(updatedData);
        isSorted(true);
      });
  };
  

  useEffect(() => {
    if(!sorted){
      axios.get(`https://api.lacountyhomelesshelper.me/cities`)
    .then(async (response) => { 
        const updatedData = await Promise.all(response.data.map(async (city: any) => {
          //city.imageURL = await fetchCityImage(city.csa_label);
          return city;
        }));
        setCityData(updatedData);
    });
    }
    
  }, [sorted]);

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
        <Row>
        <Col className="justify-content-start">
        <div> {cityData.length} Cities </div>
        <div> Attributes: Unsheltered population, Sheltered population, Total homeless population, Square miles of city, Density of total homeless population</div>
        <div>Instances per page: {perPage}</div>
        </Col>
        <Col className="d-flex justify-content-end">
        <DropdownButton  style={{padding:10}} title="Sort By" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="3" onClick={() => handleSort('sort=csa_label', 'increasing')}>Name </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => handleSort('sort=total_pop', 'increasing')}>Total Population Increasing</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => handleSort('sort=total_pop', 'decreasing')}>Total Population Decreasing</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={() => handleSort('sort=square_miles', 'increasing')}>Sqaure Miles Increasing</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={() => handleSort('sort=square_miles', 'decreasing')}>Sqaure Miles Decreasing</Dropdown.Item>
          <Dropdown.Item eventKey="5" onClick={() => handleSort('sort=density_total', 'increasing')}>Density Increasing</Dropdown.Item>
          <Dropdown.Item eventKey="5" onClick={() => handleSort('sort=density_total', 'decreasing')}>Density Decreasing</Dropdown.Item>
          
        </DropdownButton>
        <DropdownButton style={{padding:10}} title="Filter By" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" onClick={() => handleSort('unsheltered_pop>0','')}> Has Unsheltered Population</Dropdown.Item>
        </DropdownButton>
        </Col>
        </Row>
        <SearchBar 
        page="cities" 
        onSearchResults={handleSearchResults} 
        query={query}  
        setQuery={setQuery} 
      />
      {searchResults ? (
        // Render search results
        <>
        <h5>Search Results:</h5>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
          spacing={2}
        >
          {searchResults.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <City card={result} index={index} highlight={query} />
            </Grid>
          ))}
        </Grid>
        </>
      ) : (
        // Render default data here
        <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
          spacing={2}
        >
          {currentCities.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <City card={result} index={index} highlight={""} />
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
        </>
      )}
        
      </Container>
    );
    
   
};
 
export default Cities;
