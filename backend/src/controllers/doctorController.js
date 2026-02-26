const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select('-password');
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select('-password');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id);
        // Only update if role is doctor
        if (!doctor || req.user.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = req.body.name || doctor.name;
        doctor.phone = req.body.phone || doctor.phone;
        doctor.clinicAddress = req.body.clinicAddress || doctor.clinicAddress;
        doctor.specialization = req.body.specialization || doctor.specialization;

        const updatedDoctor = await doctor.save();
        res.json({
            _id: updatedDoctor._id,
            name: updatedDoctor.name,
            email: updatedDoctor.email,
            role: updatedDoctor.role,
            phone: updatedDoctor.phone,
            clinicAddress: updatedDoctor.clinicAddress,
            specialization: updatedDoctor.specialization
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
