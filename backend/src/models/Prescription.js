const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true }, // e.g., "500mg"
    frequency: { type: String, required: true }, // e.g., "1-0-1", "Twice a day"
    duration: { type: String, required: true } // e.g., "5 days"
});

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },

    dateOfPrescription: { type: Date, default: Date.now },

    medicines: [medicineSchema],
    treatmentNotes: { type: String },
    followUpDate: { type: Date },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
