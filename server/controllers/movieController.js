const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY; // Your secret key on server

const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

exports.popular = async (req, res) => {
    try {
        const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, apiOptions);
        if (!response.ok) throw new Error('TMDb API request failed');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.search = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Missing search query' });

    try {
        const response = await fetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`, apiOptions);
        if (!response.ok) throw new Error('TMDb API request failed');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.details = async (req, res) => {
    const movieId = req.query.id;
    if (!movieId) return res.status(400).json({ error: 'Missing search query' });
    try {
        const response = await fetch(`${API_BASE_URL}/movie/${movieId}`, apiOptions);
        if (!response.ok) {
            throw new Error('Error in response' + response.message);
        }
        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.error('Error Loading Movie: ' + e)
    }
};