import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import { useDebounce } from "react-use";
import SignIn from "./components/SignIn.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Account from "./components/Account.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState(null);
  const [movieDetails, setmovieDetails] = useState(null);
  const [showSignIn, setshowSignIn] = useState(false);
  const [showAccount, setshowAccount] = useState(false);
  const [accountDetails, setaccountDetails] = useState(null);

  const [isLogged, setIsLogged] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const updateTrendingDb = async (movie) => {
    try {
      const movieData = {
        movieName: movie.title,
        movieId: movie.id,
        posterPath: movie.poster_path,
      };
      const response = await fetch("http://localhost:3000/trending_metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error("Failed to update trending metrics");
      }
      console.log("Trending metrics updated successfully");
    } catch (error) {
      console.error("Error updating trending metrics:", error);
    }
  };

  const fetchMovies = async (query) => {
    setIsLoading(true);
    const url =
      query != ""
        ? `http://localhost:3000/api/movies/search?q=${encodeURIComponent(
            query
          )}`
        : `http://localhost:3000/api/movies/popular`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error in response: " + response);
      }
      const data = await response.json();

      if (!data.results) {
        throw new Error("No data");
      }
      setMoviesList(data.results);
      if (query != "") {
        updateTrendingDb(data.results[0]);
      }
    } catch (e) {
      console.log("Error fetching movies" + e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadingTrendingMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/trending_metrics");
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      const data = await response.json();
      if (data.length > 0) {
        setTrendingMovies(data);
      }
    } catch (e) {
      console.error("Error fetching trending movies:", e);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("http://localhost:3000/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Token verification failed");
        }
        const data = await response.json();
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const getMovieDetails = async (selectedMovie) => {
    if (!selectedMovie) {
      setmovieDetails(null);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/details?id=${selectedMovie.id}`
      );
      if (!response.ok) {
        throw new Error("Error in response");
      }
      const data = await response.json();
      if (!data) {
        throw new Error("Error in data.results: " + data.results);
      }
      setmovieDetails(data);
    } catch (e) {
      console.error("Error fetching details: " + e);
    }
  };

  const getAccountInfo = async () => {
    //Sent request to server to get info about user
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No login token");
    }
    try {
      const response = await fetch("http://localhost:3000/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      const data = await response.json();
      setshowAccount(true);
      setaccountDetails(data);
    } catch (e) {
      console.error("Error loading account info" + e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadingTrendingMovies();
    checkLoginStatus();
  }, []);

  useEffect(() => {
    getMovieDetails(selectedMovie);
  }, [selectedMovie]);

  return (
    <main>
      {showSignIn ? (
        <SignIn
          showSignIn={showSignIn}
          setshowSignIn={setshowSignIn}
          setIsLogged={setIsLogged}
        />
      ) : null}
      {movieDetails ? (
        <MovieDetails
          setselectedMovie={setselectedMovie}
          movieDetails={movieDetails}
        />
      ) : null}
      <div className="wrapper">
        <nav className="text-white w-full">
          {!isLogged ? (
            <p
              onClick={() => setshowSignIn(true)}
              className="text-2xl text-right mr-8 cursor-pointer"
            >
              Login
            </p>
          ) : showAccount ? null : (
            <p
              onClick={() => getAccountInfo()}
              className="text-2xl text-right mr-8 cursor-pointer"
            >
              Account
            </p>
          )}
        </nav>
        {showAccount ? (
          <Account
            setselectedMovie={setselectedMovie}
            setshowAccount={setshowAccount}
            accountDetails={accountDetails}
          />
        ) : (
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Discover Your Next Favorite
              <span className="text-gradient"> Movie</span>
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
        )}

        {trendingMovies.length > 0 && searchTerm == "" && (
          <TrendingMovies trendingMovies={trendingMovies} />
        )}

        <section className="all-movies">
          <h2 className="text-white text-4xl">
            {searchTerm ? "Searched Movies" : "Popular Movies"}
          </h2>
          <div>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {moviesList.map((movie) => (
                  <MovieCard
                    onClick={() => {
                      setselectedMovie(movie);
                    }}
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
