import React, { useState, useEffect } from "react";
import { Container, Col} from 'react-bootstrap'
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

  const handleSearchResults = (results: SearchResult[]) => {
    // Callback function to receive search results from SearchBar
    setSearchResults(results);
  };
  
  useEffect(() => {
    axios.get(`https://api.lacountyhomelesshelper.me/medicares`)
      .then(async (response) => {
        const updatedData = await Promise.all(response.data.map(async (office: any) => {
          return office;
        }));
        setMedData(updatedData);
      });
  }, []);
  

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
        <SearchBar page="medicares" onSearchResults={handleSearchResults} /> {/* Pass the callback function */}
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
              <Medical card={result} index={index} highlight={""} />
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
          {currentMedicals.map((med) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {Medical(med)}
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
