const db = require('../config/db');

exports.getTrendingMetrics = (req, res) => {
    const query = 'SELECT * FROM trending_metrics ORDER BY count DESC LIMIT 5';
    db.query(query, (err, result) => {
        if (err) {
            console.log('DB query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log('Trending metrics fetched successfully');
        res.json(result);
    })
}

exports.updateTrendingMetrics = (req, res) => {
    const { movieName, movieId, posterPath } = req.body;
    const checkQuery = 'SELECT * FROM trending_metrics WHERE movieId = ?';
    db.query(checkQuery, [movieId], (err, result) => {
        if (err) {
            console.log('DB query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.length > 0) {
            const updateQuery = 'UPDATE trending_metrics SET count = count + 1 WHERE movieId = ?';
            db.query(updateQuery, [movieId], (err) => {
                if (err) {
                    console.log('DB update error:', err);
                    return res.status(500).json({ error: 'Database update failed' });
                }
                console.log('Trending metrics updated successfully');
                return res.status(200).json({ message: 'Movie count updated' });
            })
        } else {
            const insertQuery = 'INSERT INTO trending_metrics (movieName, movieId, count, posterPath) VALUES (?, ?, 1, ?)';
            db.query(insertQuery, [movieName, movieId, posterPath], (err) => {
                if (err) {
                    console.log('DB insert error:', err);
                    return res.status(500).json({ error: 'Database insert failed' });
                }
                console.log('Trending metrics inserted successfully');
                return res.status(201).json({ message: 'Movie added to trending metrics' });
            });
        }
    });
};