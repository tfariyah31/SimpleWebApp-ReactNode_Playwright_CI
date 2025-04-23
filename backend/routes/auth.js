const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth'); 
const authLimiter = require('../middleware/rateLimit');

router.post('/login', authLimiter, login);

router.post('/register', register);
router.post('/login', login);

router.post('/logout', authMiddleware, async (req, res) => { // Now properly defined
    try {
      // Here you could blacklist the token if needed
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Logout failed' });
    }
});
module.exports = router;