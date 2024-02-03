import React, { useState, useEffect } from 'react'
import Navbar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './MovieSearch.css'

const MovieSearch = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=5d255e8a`)
        const data = await result.json()
        setMovies(data.Search)
    };

    useEffect(() => {
    if (selectedMovie) {
        const fetchData = async () => {
            const result = await fetch(`http://www.omdbapi.com/?i=${selectedMovie.imdbID}&apikey=5d255e8a`)
            const data = await result.json()
            setSelectedMovie(data)
            }
        fetchData()
        }
    }, [selectedMovie])

return (
    <div className="container">
        <Navbar />
        <form onSubmit={handleSubmit} className="my-4">
            <div className="input-group">
                <input type="text" className="form-control" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
        <ul className="list-unstyled">
        {movies.map(movie => (
          <li key={movie.imdbID} className="mb-2" onClick={() => setSelectedMovie(movie)}>
            {movie.Title} ({movie.Year})
          </li>
        ))}
      </ul>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
};

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-body">
        <h2 className="movie-title">{movie.Title}</h2>
        <p className="movie-year">Year: {movie.Year}</p>
        <p className="movie-director">Director: {movie.Director}</p>
        <p className="movie-actors">Actors: {movie.Actors}</p>
        <p className="movie-plot">Plot: {movie.Plot}</p>
      </div>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
    </div>
  );
};

export default MovieSearch;