const express = require('express');
const router = express.Router();
const { registerPatient, registerDoctor, login } = require('../controllers/authController');

router.post('/register/patient', registerPatient);
router.post('/register/doctor', registerDoctor); // usually secured by Admin in production
router.post('/login', login);

module.exports = router;
