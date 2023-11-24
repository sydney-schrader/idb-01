import React, { useState, useEffect } from 'react';
import '../home/home.css'
import { 
  Container, 
  TextField, 
  CircularProgress, 
  Alert ,
  Stack
} from '@mui/material';

type SearchResult = {
    csa_label: string;
    name: string;
  };
  
  type PageType = {
    page: string;
    onSearchResults: (results: SearchResult[]) => void;
    query: string;
    setQuery: (q: string) => void;
  };
  
const SearchBar: React.FC<PageType> = ({ page, onSearchResults, query, setQuery }) => {
  // const [query, setQuery] = useState('');
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
        const response = await fetch(`https://api.lacountyhomelesshelper.me/${page}?q=${query}`);
        const data: SearchResult[] = await response.json();
        const updatedData = await Promise.all(data.map(async (city: any) => {
          return city;
        }));
        setResults(updatedData);
        // Pass the search results to the callback function
        onSearchResults(updatedData);
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
  }, [query, onSearchResults, page]);

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
          {/* <Typography gutterBottom variant="h4" component="div" align='center'>
            {page}
          </Typography> */}
        </Stack>

      {/* {!isLoading && !error && (
        <h4>you mom</h4>
        // <Grid
        // className='card-container'
        // container
        // direction="row"
        // justifyContent="center"
        // alignItems="center"
        // wrap="wrap"
        // spacing={2} // Add spacing to control the gap between items
        // >
        // {results.map((result) => (
        //   <Grid item xs={12} sm={6} md={4} lg={3}>
        //     {page == "cities" ? (
        //       City(result)
        //     ) : (
        //       Search(result)
        //     )}
        //   </Grid>
        // ))}
        // </Grid>
      )} */}
    </Container>
  );
};

export default SearchBar;
