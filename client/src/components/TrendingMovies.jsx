import React from "react";

const TrendingMovies = ({ trendingMovies }) => {
  return (
    <section className="trending-movies-section">
      <h2 className="text-white text-4xl">Trending Movies</h2>
      <div>
        <ul className="hide-scollbar">
          {trendingMovies.map((movie, index) => (
            <li key={movie.id}>
              <img
                src={
                  movie.posterPath
                    ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}`
                    : "poster-not-available.jpg"
                }
                alt="Movie Poster"
              />
              <p>{index + 1}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingMovies;
