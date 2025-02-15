import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown, DropdownButton} from 'react-bootstrap';
import axios from "axios"; 
import Resource from "./Resource";
import CardPagination from "../CardPagination";
import { Grid } from '@mui/material';
import SearchBar from '../search/SearchBar';

type SearchResult = {
  csa_label: string;
  name: string;
  // ... other properties
};

const Resources: React.FC<{}> = () => {
    
  const perPage:number = 16
  const [shelterData, setShelterData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [sheltersPerPage] = useState(perPage);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null); // Store search results
  const [query, setQuery] = useState('');
  const [sorted, isSorted] = useState(false);


  const handleSearchResults = (results: SearchResult[]) => {
    // Callback function to receive search results from SearchBar
    setSearchResults(results);
  };

  const handleSort = (column: string, order: string) => {
    // Make an API request with the sorting parameter
    axios.get(`https://api.lacountyhomelesshelper.me/shelters/?${column}`)
      .then(async (response) => {
        let updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          return shelter;
        }));

        // Check if the sorted column is 'total_pop' and reverse the data
        if (order === 'decreasing') {
          updatedData = updatedData.reverse();
        }

        setShelterData(updatedData);
        isSorted(true);
      });
  };

  useEffect(() => {
    // Fetch data only if it's not already sorted
    if (!sorted) {
      axios.get(`https://api.lacountyhomelesshelper.me/shelters/`)
        .then(async (response) => { 
          const updatedData = await Promise.all(response.data.map(async (shelter: any) => {
            return shelter;
          }));
          setShelterData(updatedData);
        });
    }
  }, [sorted]);
  

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
        <Row>
        <Col className="justify-content-start">
        <div> {shelterData.length} Resources </div>
        <div> Attributes: Name, Address, Hours, Zipcode, Link to their website</div>
        <div>Instances per page: {perPage}</div>
        </Col>
        <Col className="d-flex justify-content-end">
        <DropdownButton style={{padding:10}} title="Sort By" id="bg-nested-dropdown">
        <Dropdown.Item onClick={() => handleSort('sort=name', '')}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('sort=city', '')}>City</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('sort=latitude', '')}>Latitude Increasing</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('sort=latitude', 'decreasing')}>Latitude Decresing</Dropdown.Item>
          <Dropdown.Item  onClick={() => handleSort('sort=longitude', 'decreasing')}>Longitude Decreasing</Dropdown.Item>
          <Dropdown.Item  onClick={() => handleSort('sort=longitude', '')}>Longitude Increasing</Dropdown.Item>
        </DropdownButton>
        <DropdownButton style={{padding:10}} title="Filter By" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1" onClick={() => handleSort('hours!', '')}>Has Hours</Dropdown.Item>
        </DropdownButton>
        </Col>
        </Row>
        <SearchBar 
        page="shelters" 
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
              <Resource card={result} index={index} highlight={query} />
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
          {currentShelters.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
             <Resource card={result} index={index} highlight={""} />
            </Grid>
          ))}
        </Grid>
        <div>Total Pages: {Math.ceil(shelterData.length / sheltersPerPage)}</div>
        <div>Current Page: {currentPage}</div>
        <CardPagination
        itemsPerPage={sheltersPerPage}
        totalItems={shelterData.length}
        paginate={paginate}
        />
        </>
      )}
        
      </Container>
    );
    
   
};
 
export default Resources;