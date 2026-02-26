const express = require('express');
const router = express.Router();
const { addPrescription, getMyPrescriptions, getPatientPrescriptions } = require('../controllers/prescriptionController');
const { protect, doctorOnly } = require('../middleware/auth');

router.route('/')
    .post(protect, doctorOnly, addPrescription) // Doctors add prescriptions
    .get(protect, getMyPrescriptions); // Patients get their own prescriptions

router.get('/patient/:patientId', protect, doctorOnly, getPatientPrescriptions); // Doctors get specific patient prescriptions

module.exports = router;
