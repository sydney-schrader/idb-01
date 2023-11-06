// import React, { useState, useEffect, useCallback } from "react";


// const SearchPage: React.FC<{}> = () => {
//     console.log("search page")
//     return (
//         <h1>Search</h1>
//     );
// };
// export default SearchPage;
import React, { useState, useEffect } from 'react';

type SearchResult = {
  id: string;
  name: string;
  // ... other properties
};

const SearchPage: React.FC = () => {
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
        const response = await fetch(`https://api.lacountyhomelesshelper.me/?search=${query}`);
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
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {isLoading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {!isLoading && !error && results.length === 0 && (
        <div>No results found.</div>
      )}

      {!isLoading && !error && results.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
};

export default SearchPage;
