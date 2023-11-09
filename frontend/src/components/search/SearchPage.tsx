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
import { 
  Container, 
  Typography, 
  TextField, 
  CircularProgress, 
  List, 
  ListItem, 
  ListItemText,
  Stack,
  Grid, 
  Alert 
} from '@mui/material';
import City from "../cities/City";

type SearchResult = {
  csa_label: string;
  name: string;
  // ... other properties
};

type PageType = {
  page: string;
}

const SearchPage: React.FC<PageType> = ({ page }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`https://api.lacountyhomelesshelper.me/cities?q=${query}`);
        const data: SearchResult[] = await response.json();
        const updatedData = await Promise.all(data.map(async (city: any) => {
          //city.imageURL = await fetchCityImage(city.csa_label);
          return city;
        }));
        setResults(updatedData);
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

      {!isLoading && !error && results.length === 0 && query && (
        <Alert severity="info">No results found.</Alert>
      )}

<Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "20px" }}
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
          spacing={2} 
        >
          {results.map((city) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {City(city)}
            </Grid>
          ))}
        </Grid>
     
      
          )}
    </Container>
  );
};

export default SearchPage;
