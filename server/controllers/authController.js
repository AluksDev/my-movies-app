const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkUserQuery, [username, email], (err, result) => {
        if (err) {
            console.log('DB query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.length > 0) {
            console.log('Username already exists');
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        console.log('Username is available, proceeding with signup');
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.log('Password hashing error:', err);
                return res.status(500).json({ error: 'Password hashing failed' });
            }
            const insertUserQuery = 'INSERT INTO users (username, email, hashed_psw) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.log('DB insert error:', err);
                    return res.status(500).json({ error: 'Database insert failed' });
                }
                const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.json({ message: 'User registered successfully', token: token })
            });
        });
    })
};
exports.login = (req, res) => {
    const { credentials, password } = req.body;
    if (!credentials || !password) {
        return res.status(400).json({ error: 'Credentials and password are required' });
    }
    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkUserQuery, [credentials, credentials], (err, result) => {
        if (err) {
            console.log('DB query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.length == 0) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        const user = result[0];
        bcrypt.compare(password, user.hashed_psw, function (err, result) {
            if (err) {
                console.log('Password comparison error:', err);
                return res.status(500).json({ error: 'Password comparison failed' });
            }
            if (!result) {
                console.log('Invalid password');
                return res.status(401).json({ error: 'Invalid password' });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ message: 'Login successful', token: token })
        });
    })
};

exports.verifyToken = (req, res) => {
    res.status(200).json({ message: 'Token is valid', userId: req.userId });
};