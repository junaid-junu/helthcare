const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

exports.registerPatient = async (req, res) => {
    const { name, email, password, age, height, weight, bloodGroup } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, age, height, weight, bloodGroup });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerDoctor = async (req, res) => {
    const { name, email, password, specialization, clinicAddress } = req.body;
    try {
        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) return res.status(400).json({ message: 'Doctor already exists' });

        const doctor = await Doctor.create({ name, email, password, specialization, clinicAddress });
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            role: doctor.role,
            token: generateToken(doctor._id, doctor.role),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Try to find the user in Patient Collection
        let user = await User.findOne({ email });
        let isDoctor = false;

        // If not found, try Doctor Collection
        if (!user) {
            user = await Doctor.findOne({ email });
            isDoctor = true;
        }

        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            ...(isDoctor && { specialization: user.specialization }),
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
