import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "poster-not-available.jpg"
        }
        alt="Movie Poster"
      />
      <div>
        <h3>{movie.title}</h3>
        <div className="movie-details">
          <img src="star-icon.svg" alt="" />
          <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          <span>•</span>
          <p>{movie.original_language.toUpperCase()}</p>
          <span>•</span>
          <p>{movie.release_date.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
