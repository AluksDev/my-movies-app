const db = require('../config/db');

exports.addFavourite = (req, res) => {
    const userId = req.userId;
    const { movieId,
        movieTitle,
        moviePoster } = req.body;

    if (!userId || !movieId) {
        return res.status(400).send('Missing user_id or movie_id');
    }

    const checkQuery = 'SELECT * FROM user_favourites WHERE user_id=? AND movie_id=?';
    db.query(checkQuery, [userId, movieId], (err, result) => {
        if (err) {
            console.error('Error in checkQuery:', err);
            return res.status(500).send('Database error');
        }

        if (result.length > 0) {
            return res.status(400).send('Movie already in user favourites');
        }

        const addQuery = 'INSERT INTO user_favourites (user_id, movie_id, movie_title, movie_poster) VALUES (?, ?, ?, ?)';
        db.query(addQuery, [userId, movieId, movieTitle,
            moviePoster], (err, insertResult) => {
                if (err) {
                    console.error('Error in addQuery:', err);
                    return res.status(500).send('Database error');
                }

                if (insertResult.affectedRows > 0) {
                    return res.send('Added to favourites');
                } else {
                    return res.status(500).send('Failed to add favourite');
                }
            });
    });
};

exports.getUserInfo = (req, res) => {
    const userId = req.userId;
    const checkUserQuery = 'SELECT * FROM users WHERE id=?';
    db.query(checkUserQuery, [userId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!result.length > 0) {
            return res.status(400).send('No user in DB')
        }
        const getInfoQuery = 'SELECT u.username, u.email, u.created_at, GROUP_CONCAT(f.movie_id) AS movie_ids, GROUP_CONCAT(f.movie_title) AS movie_titles, GROUP_CONCAT(f.movie_poster) AS movie_posters FROM users u LEFT JOIN user_favourites f ON u.id = f.user_id WHERE u.id=? GROUP BY u.id, u.username, u.email, u.created_at;'
        db.query(getInfoQuery, [userId], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(result[0]);
        })
    })
}
