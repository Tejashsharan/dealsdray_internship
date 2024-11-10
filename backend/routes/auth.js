const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Euser = require('../models/Euser');
const router = express.Router();
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await Euser.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new Euser({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const payload = { id: user.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Euser.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user.id};
    const token = jwt.sign(payload,  process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;