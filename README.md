# 🎬 Movie App

A full-stack movie discovery application that allows users to browse popular movies from the TMDb API, track trending searches, and manage their personal movie favorites with user authentication.

## ✨ Features

- **Movie Discovery**: Browse popular movies and trending titles based on user searches
- **Search Functionality**: Find movies by title with TMDb API integration
- **User Authentication**: Secure sign up and login with JWT token-based authentication
- **Favorites Management**: Save and manage your favorite movies
- **Trending Metrics**: Track the most searched movies in the app
- **Responsive Design**: Beautiful UI built with React and Tailwind CSS
- **Secure Backend**: Password hashing with bcrypt and secure API endpoints

## 🛠 Tech Stack

### Frontend
- **React** 19.1.0 - UI framework
- **Vite** 7.0.4 - Build tool with HMR (Hot Module Replacement)
- **Tailwind CSS** 4.1.11 - Utility-first CSS framework
- **Appwrite** 18.2.0 - Backend-as-a-Service for additional features

### Backend
- **Node.js** with **Express** 5.1.0 - Server framework
- **MySQL** 2.18.1 / **MySQL2** 3.14.3 - Database
- **JWT (jsonwebtoken)** 9.0.2 - Token-based authentication
- **bcrypt** 6.0.0 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.1 - Environment variable management

## 📁 Project Structure

```
my-movies-app/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── assets/        # Images and static files
│   │   ├── App.jsx        # Main app component
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # App entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.cjs # Tailwind CSS configuration
│
├── server/                # Express backend application
│   ├── controllers/       # Request handlers
│   │   ├── authController.js      # Authentication logic
│   │   ├── movieController.js     # Movie API handlers
│   │   ├── trendingController.js  # Trending metrics handlers
│   │   └── userController.js      # User management handlers
│   ├── routes/           # API route definitions
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── tmdbRoutes.js     # Movie search endpoints
│   │   ├── trendingRoutes.js # Trending metrics endpoints
│   │   └── userRoutes.js     # User endpoints
│   ├── middleware/       # Express middleware
│   ├── config/          # Configuration files
│   ├── server.js        # Express app entry point
│   └── package.json     # Backend dependencies
│
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database
- TMDb API key (get it from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AluksDev/my-movies-app.git
   cd my-movies-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Configuration

1. **Set up environment variables** in `/server/.env`
   ```
   JWT_SECRET=your_jwt_secret_key_here
   TMDB_API_KEY=your_tmdb_api_key_here
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=movies_app
   ```

2. **Create MySQL Database**
   ```sql
   CREATE DATABASE movies_app;
   ```

### Running the Application

1. **Start the Backend Server** (from `/server` directory)
   ```bash
   nodemon server.js
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server** (from `/client` directory in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or the port specified by Vite)

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

### Frontend (`/client`)
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Backend (`/server`)
- `nodemon server.js` - Start server with auto-reload on file changes

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT token

### Movie Routes (`/api/movies`)
- `GET /api/movies/popular` - Get popular movies from TMDb
- `GET /api/movies/search?query=...` - Search movies by title

### Trending Routes (`/trending_metrics`)
- `GET /trending_metrics` - Get trending movie searches
- `POST /trending_metrics` - Record a movie search

### User Routes (`/user/`)
- `GET /user/favorites` - Get user's favorite movies
- `POST /user/favorites` - Add movie to favorites
- `DELETE /user/favorites/:movieId` - Remove movie from favorites

## 🔐 Security Features

- **Password Hashing**: User passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication for API requests
- **CORS Protection**: Configured CORS to prevent unauthorized cross-origin requests
- **Environment Variables**: Sensitive keys stored in `.env` file (never committed to repo)
- **Input Validation**: Server-side validation of user inputs

## 📚 Database Schema

The application uses MySQL to store:
- **Users**: User accounts with hashed passwords
- **Favorites**: User's favorite movies mapping
- **Trending**: Search history and trending metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙋 Support

If you encounter any issues or have questions, please:
1. Check existing [issues](https://github.com/AluksDev/my-movies-app/issues)
2. Create a new issue with a detailed description
3. Include steps to reproduce the problem

## 🎯 Future Enhancements

- [ ] Add movie ratings and reviews
- [ ] Implement user recommendations based on favorites
- [ ] Add movie list creation and sharing
- [ ] Social features (follow users, see their favorites)
- [ ] Advanced filtering and sorting options
- [ ] Watchlist feature (plan to watch)
- [ ] Mobile app version
- [ ] Dark mode theme

## 📞 Contact

**Author**: AluksDev  
**Repository**: [my-movies-app](https://github.com/AluksDev/my-movies-app)

---

**Made with ❤️ for movie enthusiasts**
