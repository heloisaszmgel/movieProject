import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Log In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async e => {
      e.preventDefault()
      const result = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=5d255e8a`)
      const data = await result.json()
      setMovies(data.Search)
  }

  useEffect(() => {
      const fetchRandomMovies = async () => {
          const result = await fetch('http://www.omdbapi.com/?i=random&apikey=5d255e8a')
          const data = await result.json()
          setRandomMovies([data]);
      }
      fetchRandomMovies()
  }, [])

  useEffect(() => {
      if (selectedMovie) {
          const fetchData = async () => {
              const result = await fetch(`http://www.omdbapi.com/?i=${selectedMovie.imdbID}&apikey=5d255e8a`)
              const data = await result.json()
              setSelectedMovie(data);
          }
      fetchData()
    }
  }, [selectedMovie])

  return (
    <div>
      <Navbar />
      <h1>Movie Search</h1> {/* Added a title */}
      <form onSubmit={handleSubmit}>
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
          <button type="submit">Search</button>
      </form>
      <ul>
      {movies.map(movie => ( 
          <li key={movie.imdbID} onClick={() => setSelectedMovie(movie)}>
          {movie.Title} ({movie.Year})
          </li>
      ))}
      </ul>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  )
}

const MovieDetails = ({ movie }) => {
    return (
        <div>
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Plot: {movie.Plot}</p>
            <img src={movie.Poster} alt={movie.Title} />
        </div>
    )
}

export default MovieSearch;