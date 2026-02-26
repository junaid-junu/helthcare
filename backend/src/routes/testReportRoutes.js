const express = require('express');
const router = express.Router();
const { addReport, getMyReports, getPatientReports } = require('../controllers/testReportController');
const { protect, doctorOnly } = require('../middleware/auth');

router.route('/')
    .post(protect, doctorOnly, addReport) // Doctors add reports
    .get(protect, getMyReports); // Patients get their own reports

router.get('/patient/:patientId', protect, doctorOnly, getPatientReports); // Doctors get specific patient reports

module.exports = router;
