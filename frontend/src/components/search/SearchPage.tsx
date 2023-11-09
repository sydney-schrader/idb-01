// import React, { useState, useEffect, useCallback } from "react";

// `https://api.lacountyhomelesshelper.me/?search=${query}`
// const SearchPage: React.FC<{}> = () => {
//     console.log("search page")
//     return (
//         <h1>Search</h1>
//     );
// };
// export default SearchPage;
import React, { useState, useEffect } from 'react';
import Search from './Search';
import City from '../cities/City';
import Medical from '../medical/Medical'
import { 
  Container, 
  Typography, 
  TextField, 
  CircularProgress, 
  Alert ,
  Grid,
  Stack
} from '@mui/material';


type SearchResult = {
  csa_label: string;
  name: string;
  // ... other properties
};

type PageType = {
  page: string;
}

const SearchPage: React.FC<{}> = () => {
  const [query, setQuery] = useState('');
  const [cityResults, setCityResults] = useState<SearchResult[]>([]);
  const [medicalResults, setMedicalResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
 

  useEffect(() => {
    if (query.length === 0) {
      setCityResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        // cities
        const cityResponse = await fetch(`https://api.lacountyhomelesshelper.me/cities?q=${query}`);
        const cityData: SearchResult[] = await cityResponse.json();
        const updatedCityData = await Promise.all(cityData.map(async (city: any) => {
          return city;
        }));
        setCityResults(updatedCityData);
        // medicals
        const medicalResponse = await fetch(`https://api.lacountyhomelesshelper.me/medicares?q=${query}`);
        const medicalData: SearchResult[] = await medicalResponse.json();
        const updatedMedicalData = await Promise.all(medicalData.map(async (medical: any) => {
          return medical;
        }));
        setMedicalResults(updatedMedicalData);


      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timerId = setTimeout(() => fetchData(), 500);

    // Cleanup function to cancel the debounce if the component is unmounted
    return () => clearTimeout(timerId);
  }, [query]);

  return (
    <Container>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography> */}

      <TextField
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        variant="outlined"
        fullWidth
        margin="normal"
      />

      {isLoading && (
        <CircularProgress />
      )}

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!isLoading && !error && cityResults.length === 0 && query && (
        <Alert severity="info">No results found.</Alert>
      )}

<Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "30px" }}
        >
          <Typography gutterBottom variant="h4" component="div" align='center'>
            Cities
          </Typography>
        </Stack>

      {!isLoading && !error && (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={2} // Add spacing to control the gap between items
        >
        {cityResults.map((result) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {City(result)}
          </Grid>
        ))}
        </Grid>
      )}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "30px" }}
        >
          <Typography gutterBottom variant="h4" component="div" align='center'>
            Medical
          </Typography>
        </Stack>

      {!isLoading && !error && (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={2} // Add spacing to control the gap between items
        >
        {medicalResults.map((result) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {Medical(result)}
          </Grid>
        ))}
        </Grid>
      )}

    </Container>
  );
};

export default SearchPage;



