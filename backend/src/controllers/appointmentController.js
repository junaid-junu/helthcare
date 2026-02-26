const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @access  Private/Patient
exports.bookAppointment = async (req, res) => {
    const { doctorId, date, time, reason } = req.body;
    try {
        const appointment = await Appointment.create({
            patient: req.user._id, // Set from auth middleware
            doctor: doctorId,
            date,
            time,
            reason
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get appointments for the logged in patient
// @access  Private/Patient
exports.getMyAppointmentHistory = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id })
            .populate('doctor', 'name specialization clinicAddress')
            .sort({ date: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get appointments for a specific doctor
// @access  Private/Doctor
exports.getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user._id })
            .populate('patient', 'name email age bloodGroup')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
