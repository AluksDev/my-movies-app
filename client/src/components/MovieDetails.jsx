import React, { useState, useEffect, useRef } from "react";

const MovieDetails = ({ movieDetails, setselectedMovie }) => {
  const [userMessage, setuserMessage] = useState("");
  const cardRef = useRef(null);

  const addToFavourites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token present");
    }
    let posterPath = movieDetails.poster_path;
    if (!posterPath) {
      posterPath = "no-poster";
    }
    try {
      const response = await fetch("http://localhost:3000/user/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movieDetails.id,
          movieTitle: movieDetails.title,
          moviePoster: posterPath,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const message = await response.text();
        setuserMessage(message);
        throw new Error("Response not ok: " + message);
      }
      const message = await response.text();
      setuserMessage(message);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setselectedMovie(null);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setselectedMovie]);

  return (
    <div className="movie-details-card">
      <div
        ref={cardRef}
        className="w-1/2 flex gap-8 justify-around items-center rounded-xl p-6 relative bg-[#0B071B] text-white"
      >
        <div
          onClick={() => {
            setselectedMovie(null);
          }}
          className="absolute top-[-10%] right-[-5%] w-8 cursor-pointer"
        >
          <img className="w-full" src="closeIcon.svg" alt="Close Icon" />
        </div>
        <section className="flex items-center justify-center min-w-1/3">
          <img
            className="rounded-md"
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : "poster-not-available.jpg"
            }
            alt="Movie Poster"
          />
        </section>
        <section className="flex flex-col items-start justify-between">
          <h2 className="text-5xl my-2">{movieDetails.title}</h2>
          <div className="flex items-center justify-start my-1 mb-4 gap-4 text-[0.8rem]">
            <p>{movieDetails.release_date.split("-")[0]}</p>
            <p>{movieDetails.runtime} min</p>
            <div className="flex items-center justify-center gap-2">
              {movieDetails.genres.map((genre) => (
                <p className="border-2 rounded-2xl py-1 px-2" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <span>Ratings: </span>{" "}
            <div className="flex">
              <span>
                <img src="star-icon.svg" alt="Star Icon" />
              </span>
              <span>
                {movieDetails.vote_count > 0 ? (
                  <span>
                    {movieDetails.vote_average.toFixed(1)} (
                    {movieDetails.vote_count})
                  </span>
                ) : (
                  "No ratings"
                )}
              </span>
            </div>
          </div>
          <p className="text-[0.9rem]">{movieDetails.overview}</p>
          <div className="flex justify-end w-full mt-4">
            {userMessage ? (
              userMessage.includes("Added") ? (
                <p className="text-white">{userMessage}</p>
              ) : (
                <p className="text-red-500">{userMessage}</p>
              )
            ) : (
              <button
                onClick={addToFavourites}
                className="border-2 px-4 py-2 mt-8 cursor-pointer hover:bg-amber-300/10 transition colors 300"
              >
                Add to Favourites
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;
