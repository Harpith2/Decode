import React, { useState } from "react";
import axios from "axios";
import SearchResults from "../Search/SearchResults.js";
import "./stylesheet.css";
import { useNavigate } from 'react-router-dom';


function Search() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;

    // Reset previous results and set loading state
    setResponse(null);
    setLoading(true);
    setError(null);

    try {
      console.log('Sending search request for query:', searchQuery);
      const result = await axios.post("http://localhost:3080/search", {
        query: searchQuery
      });

      console.log('Received response:', result.data);

      if (!result.data) {
        throw new Error('No data received from server');
      }

      setResponse({
        answer: result.data.answer || 'No answer available',
        relatedQueries: Array.isArray(result.data.relatedQueries) ? result.data.relatedQueries : [],
        sources: Array.isArray(result.data.sources) ? result.data.sources : [],
        videos: Array.isArray(result.data.videos) ? result.data.videos : []
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while searching. Please try again.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleRelatedQueryClick = async (newQuery) => {
    setQuery(newQuery); // Update search bar
    await handleSearch(newQuery); // Perform the search
  };

  return (
    <div style={{
      fontFamily: '"Clash Display", sans-serif',
      minHeight: '100vh',
      width: '100%',
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
    
    }}>
      
      <button 
        className="search-page-back-button"
        onClick={() => navigate('/dashboard')}
      >
        ←
      </button>
      <div className="search-title"><h1>Search</h1></div>
      

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter your search query"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          style={{
            width: '500px',
            
            height: '40px',
            
          }}
        />
        <button
          onClick={() => handleSearch(query)}
          disabled={loading}
          className={`search-button ${loading ? 'loading animate-pulse' : ''}`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && (
        <div className="loading-message animate-pulse">
          Searching for results...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {response && !loading && (
        <div className="response-container">
          <SearchResults
            response={response}
            onQueryClick={handleRelatedQueryClick}
          />
        </div>
      )}
    </div>
  );
}

export default Search;