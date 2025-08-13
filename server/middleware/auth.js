const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer')) {
        return res.status(401).json({ error: 'No valid token' });
    }
    const token = headers.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(401).send('You need to login');
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = authenticateToken;