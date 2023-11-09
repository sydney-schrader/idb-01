import React, { useState, useEffect, useCallback } from "react";
import { Container, Col} from 'react-bootstrap'
import axios from "axios"; 
import Medical from "./Medical";
import { Grid } from "@mui/material";
import CardPagination from "../CardPagination";
import SearchBar from '../search/SearchBar';

const Medicals: React.FC<{}> = () => {
  
  const perPage:number = 8
  const [medData, setMedData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [medsPerPage] = useState(perPage);
  
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
        <SearchBar page = {"medicares"}/>
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
