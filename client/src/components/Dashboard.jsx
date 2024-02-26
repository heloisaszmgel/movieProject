import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1');
      const data = await result.json();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Dashboard</h1>
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;