const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { requireRole } = authMiddleware;

// GET all users — superadmin only
router.get('/', authMiddleware, requireRole('superadmin'), async (req, res) => {
  try {
    const users = await User.find().select('-password -tokens -refreshTokens');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single user — superadmin only
router.get('/:id', authMiddleware, requireRole('superadmin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -tokens -refreshTokens');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT update user — superadmin only
router.put('/:id', authMiddleware, requireRole('superadmin'), async (req, res) => {
  try {
    const { name, email, role, isBlocked } = req.body;

    // Only allow updating these fields
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;
    if (isBlocked !== undefined) {
      updates.isBlocked = isBlocked;
      // If unblocking, also reset failed attempts and lock
      if (!isBlocked) {
        updates.failedLoginAttempts = 0;
        updates.lockUntil = null;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -tokens -refreshTokens');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use by another account' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;