import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  const getPopularMovies = async () => {
    const response = await axios.get('http://www.omdbapi.com/?s=popular&apikey=5d255e8a');
    setMovies(response.data.Search);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div >
      <Navbar />
      <div className='App'>
        <h1>Popular Movies</h1>
      </div>
      <div className='movie-container'>
        {movies.map((movie, index) => (
          <div key={index} style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
            <img src={movie.Poster} alt='movie' style={{ width: '200px', height: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} />
          </div>

        ))}
      </div>
    </div>
  );
};

export default Dashboard;