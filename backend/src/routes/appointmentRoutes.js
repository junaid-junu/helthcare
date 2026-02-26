const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointmentHistory, getDoctorAppointments } = require('../controllers/appointmentController');
const { protect, doctorOnly } = require('../middleware/auth');

// Patient routes
router.post('/book', protect, bookAppointment);
router.get('/my-history', protect, getMyAppointmentHistory);

// Doctor routes
router.get('/doctor', protect, doctorOnly, getDoctorAppointments);

module.exports = router;
