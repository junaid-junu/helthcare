const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "https://helthcare-wl96.vercel.app",
    "https://helthcare-one.vercel.app",
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/doctors', require('./src/routes/doctorRoutes'));
app.use('/api/reports', require('./src/routes/testReportRoutes'));
app.use('/api/prescriptions', require('./src/routes/prescriptionRoutes'));
app.use('/api/appointments', require('./src/routes/appointmentRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
