const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all users
// @access  Protected
router.get('/', protect, userController.getUsers);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Protected
router.get('/profile', protect, userController.getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Protected
router.put('/profile', protect, userController.updateProfile);

module.exports = router;
