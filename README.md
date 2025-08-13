🎬 Movie App

A full-stack movie app where users can browse popular movies from the TMDb API and trending titles based on the most searched movies in the app.
Users can search movies, view details, sign up, log in, and save favourites.

🛠 Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express, MySQL
Other: Secure password hashing, token-based authentication, API integration

🚀 Getting Started

1. Install dependencies
   Client:
     cd client
     npm install
   Server:
     cd ../server
     npm install

2. Run the app
   Start frontend (in /client):
     npm run dev
   Start backend (in /server):
     nodemon server.js

⚙️ Environment Variables
Create a .env file in the /server folder with your JWT_SECRET and TMDB_API_KEY.

