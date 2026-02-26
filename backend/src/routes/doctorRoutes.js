const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, doctorOnly } = require('../middleware/auth');

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Protected (Patients and Patients can view)
router.get('/', protect, doctorController.getDoctors);

// @route   GET /api/doctors/profile
// @desc    Update doctor profile (using PUT)
// @access  Protected (Doctor only)
router.put('/profile', protect, doctorOnly, doctorController.updateDoctorProfile);

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Protected
router.get('/:id', protect, doctorController.getDoctorById);

module.exports = router;
