const mongoose = require('mongoose');

const testReportSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },

    dateOfTest: { type: Date, default: Date.now },

    // Health Metrics
    bloodPressureSys: { type: Number }, // Systolic
    bloodPressureDia: { type: Number }, // Diastolic
    sugarLevel: { type: Number }, // mg/dL
    cholesterol: { type: Number }, // mg/dL

    notes: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestReport', testReportSchema);
