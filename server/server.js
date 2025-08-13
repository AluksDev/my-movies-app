const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const tmdbRoutes = require('./routes/tmdbRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/trending_metrics', trendingRoutes);
app.use('/api/movies', tmdbRoutes);
app.use('/user/', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Express Backend');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
