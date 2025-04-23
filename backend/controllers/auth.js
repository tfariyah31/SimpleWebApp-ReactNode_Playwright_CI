const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, password });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password required'
    });
  }
  try {
    const user = await User.findOne({ username });
    //if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials', attemptsLeft: req.rateLimit.remaining });

    const isMatch = await bcrypt.compare(password, user.password);
    //if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials', });
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials', attemptsLeft: req.rateLimit.remaining });
    if (user.isBlocked) {
      return res.status(403).json({success: false, message: "Your account is blocked. Please contact support." });
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ success: true,token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      
    });
  }
};