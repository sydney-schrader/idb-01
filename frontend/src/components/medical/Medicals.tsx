import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown, DropdownButton} from 'react-bootstrap'
import axios from "axios"; 
import Medical from "./Medical";
import { Grid } from "@mui/material";
import CardPagination from "../CardPagination";
import SearchBar from "../search/SearchBar";

type SearchResult = {
  csa_label: string;
  name: string;
  // ... other properties
};


const Medicals: React.FC = () => {
  
  const perPage:number = 8
  const [medData, setMedData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [medsPerPage] = useState(perPage);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null); // Store search results
  const [query, setQuery] = useState('');
  const [sorted, isSorted] = useState(false);

  const handleSearchResults = (results: SearchResult[]) => {
    // Callback function to receive search results from SearchBar
    setSearchResults(results);
  };

  const handleSort = (column: string, order: string) => {
    // Make an API request with the sorting parameter
    axios.get(`https://api.lacountyhomelesshelper.me/medicares/?${column}`)
      .then(async (response) => {
        let updatedData = await Promise.all(response.data.map(async (shelter: any) => {
          return shelter;
        }));

        // Check if the sorted column is 'total_pop' and reverse the data
        if (order === 'decreasing') {
          updatedData = updatedData.reverse();
        }

        setMedData(updatedData);
        isSorted(true);
      });
  };

  
  useEffect(() => {
    if(!sorted) {
      axios.get(`https://api.lacountyhomelesshelper.me/medicares`)
      .then(async (response) => {
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          return office;
        }));
        setMedData(updatedData);
      });
    }
    
  }, [sorted]);
  

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
        <Row>
        <Col className="justify-content-start">
        <div> {medData.length} Medical Centers </div>
        <div>Attributes: Name, Address, Hours, Phone number, URL for their website</div>
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
              <Medical card={result} index={index} highlight={query} />
            </Grid>
          ))}
        </Grid>
        </>
      ) : (
        // Render default data here
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
          spacing={2}
        >
          {currentMedicals.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Medical card={result} index={index} highlight={""} />
            </Grid>
          ))}
        </Grid>
      )}
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
