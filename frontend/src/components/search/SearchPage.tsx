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
  Alert 
} from '@mui/material';

type SearchResult = {
  id: string;
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
        const response = await fetch(`https://api.lacountyhomelesshelper.me/${page}?search=${query}`);
        const data: SearchResult[] = await response.json();
        setResults(data);
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

      {!isLoading && !error && (
        <List>
          {results.map((result) => (
            <ListItem key={result.id}>
              <ListItemText primary={result.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SearchPage;
