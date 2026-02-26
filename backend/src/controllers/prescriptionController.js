const Prescription = require('../models/Prescription');

// @desc    Add a new prescription
// @access  Private/Doctor
exports.addPrescription = async (req, res) => {
    const { patientId, medicines, treatmentNotes, followUpDate } = req.body;
    try {
        const prescription = await Prescription.create({
            patient: patientId,
            doctor: req.user._id, // Set from auth middleware
            medicines,
            treatmentNotes,
            followUpDate
        });
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get prescriptions for the logged in patient
// @access  Private/Patient
exports.getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.user._id }).populate('doctor', 'name specialization clinicAddress');
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get prescriptions for a specific patient (for doctors)
// @access  Private/Doctor
exports.getPatientPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.params.patientId }).populate('doctor', 'name specialization clinicAddress');
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
