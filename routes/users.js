const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

function publicUser(user) {
  return { _id: user._id, username: user.username, email: user.email };
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required.' });
    if (await User.exists({ email: email.trim().toLowerCase() })) return res.status(400).json({ message: 'Email is already registered.' });
    const user = await User.create({ username, email, password });
    return res.status(201).json(publicUser(user));
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Email is already registered.' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ message: 'Incorrect email or password.' });
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (!user || !(await user.isCorrectPassword(password))) return res.status(400).json({ message: 'Incorrect email or password.' });
    const token = jwt.sign({ _id: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: publicUser(user) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
