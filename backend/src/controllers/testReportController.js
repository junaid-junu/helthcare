const TestReport = require('../models/TestReport');

// @desc    Add a new test report
// @access  Private/Doctor
exports.addReport = async (req, res) => {
    const { patientId, bloodPressureSys, bloodPressureDia, sugarLevel, cholesterol, notes } = req.body;
    try {
        const report = await TestReport.create({
            patient: patientId,
            doctor: req.user._id, // Set from auth middleware
            bloodPressureSys,
            bloodPressureDia,
            sugarLevel,
            cholesterol,
            notes
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get reports for the logged in patient
// @access  Private/Patient
exports.getMyReports = async (req, res) => {
    try {
        const reports = await TestReport.find({ patient: req.user._id }).populate('doctor', 'name specialization');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get reports for a specific patient (for doctors)
// @access  Private/Doctor
exports.getPatientReports = async (req, res) => {
    try {
        const reports = await TestReport.find({ patient: req.params.patientId }).populate('doctor', 'name specialization');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
