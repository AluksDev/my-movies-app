import React from "react";

const Account = ({ accountDetails, setshowAccount, setselectedMovie }) => {
  return (
    <div className="w-full">
      <nav className="h-16">
        <img
          onClick={() => setshowAccount(false)}
          className="h-full mx-auto cursor-pointer"
          src="back-icon.svg"
          alt="Back Icon"
        />
      </nav>
      <main className="flex items-center justify-center text-white w-1/2 mx-auto h-[350px] p-8">
        <section className="flex flex-col items-center h-full justify-around min-w-1/2">
          <div>
            <p className="text-xl">Username:</p>
            <p>{accountDetails.username}</p>
          </div>
          <div>
            <p className="text-xl">Email:</p>
            <p>{accountDetails.email}</p>
          </div>
          <div>
            <p className="text-xl">Member since:</p>
            <p>
              {new Date(accountDetails.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-8 h-full overflow-y-auto hide-scollbar">
          {accountDetails.movie_titles ? (
            accountDetails.movie_titles.split(",").map((title, index) => (
              <div
                onClick={() =>
                  setselectedMovie({
                    id: accountDetails.movie_ids.split(",")[index],
                  })
                }
                key={index}
                className="flex flex-col cursor-pointer"
              >
                <img
                  className="w-full rounded-2xl"
                  src={
                    accountDetails.movie_posters.split(",")[index] ==
                    "no-poster"
                      ? "poster-not-available.jpg"
                      : `https://image.tmdb.org/t/p/w500/${
                          accountDetails.movie_posters.split(",")[index]
                        }`
                  }
                  alt={title.trim()}
                />
                <p>{title.trim()}</p>
              </div>
            ))
          ) : (
            <p>No favourite movies</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Account;
