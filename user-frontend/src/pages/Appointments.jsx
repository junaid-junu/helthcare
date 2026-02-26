import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Box, Container, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Select, MenuItem, FormControl, InputLabel, TextField, CircularProgress, Card, CardContent, Divider, Chip } from '@mui/material';
import { ArrowLeft, Calendar as CalendarIcon, Clock, HeartPulse, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const Appointments = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [history, setHistory] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [loading, setLoading] = useState(true);

    const [bookingData, setBookingData] = useState({
        doctorId: '',
        date: '',
        time: '',
        reason: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            // First fetch all users, then filter doctors (as we did in provider portal)
            // Or better, if we had a /api/users endpoint that returned all or a /api/doctors endpoint
            const resDoctors = await api.get('/users');
            setDoctors(resDoctors.data.filter(u => u.role === 'doctor'));

            const resHistory = await api.get('/appointments/my-history');
            setHistory(resHistory.data);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleBookingChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        setIsBooking(true);
        try {
            await api.post('/appointments/book', bookingData);
            toast.success('Appointment booked successfully!');
            setBookingData({ doctorId: '', date: '', time: '', reason: '' });
            fetchData(); // refresh history
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to book appointment');
        } finally {
            setIsBooking(false);
        }
    };

    if (!user || loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 30 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton onClick={() => navigate('/dashboard')} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}>
                                <ArrowLeft size={20} />
                            </IconButton>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                                Appointments
                            </Typography>
                        </Box>

                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 }}>
                            {user.name.charAt(0)}
                        </Avatar>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container component="main" maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                <Grid container spacing={4}>

                    {/* Left Column: Book Appointment */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Paper sx={{ p: 4, borderRadius: 3, position: 'sticky', top: 100 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Book an Appointment</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                Select a provider and time that works best for you.
                            </Typography>

                            <form onSubmit={handleBookAppointment}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel>Select Doctor</InputLabel>
                                    <Select
                                        name="doctorId"
                                        value={bookingData.doctorId}
                                        label="Select Doctor"
                                        onChange={handleBookingChange}
                                        required
                                    >
                                        {doctors.map(doc => (
                                            <MenuItem key={doc._id} value={doc._id}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main', fontSize: '0.8rem' }}>{doc.name.charAt(0)}</Avatar>
                                                    Dr. {doc.name} - {doc.specialization || 'General'}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            type="date"
                                            label="Date"
                                            name="date"
                                            value={bookingData.date}
                                            onChange={handleBookingChange}
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ min: dayjs().format('YYYY-MM-DD') }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Time block</InputLabel>
                                            <Select
                                                name="time"
                                                value={bookingData.time}
                                                label="Time block"
                                                onChange={handleBookingChange}
                                            >
                                                <MenuItem value="09:00 AM">09:00 AM</MenuItem>
                                                <MenuItem value="10:00 AM">10:00 AM</MenuItem>
                                                <MenuItem value="11:30 AM">11:30 AM</MenuItem>
                                                <MenuItem value="02:00 PM">02:00 PM</MenuItem>
                                                <MenuItem value="03:30 PM">03:30 PM</MenuItem>
                                                <MenuItem value="05:00 PM">05:00 PM</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Reason for Visit"
                                    name="reason"
                                    value={bookingData.reason}
                                    onChange={handleBookingChange}
                                    sx={{ mb: 3 }}
                                    placeholder="Briefly describe your symptoms or reason for scheduling..."
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isBooking}
                                    startIcon={isBooking ? <CircularProgress size={20} color="inherit" /> : <CalendarIcon size={20} />}
                                    sx={{ borderRadius: 2, py: 1.5 }}
                                >
                                    {isBooking ? 'Booking...' : 'Confirm Appointment'}
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Right Column: Appointment History */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>My Appointments</Typography>
                        </Box>

                        {history.length === 0 ? (
                            <Paper sx={{ p: 6, borderRadius: 3, textAlign: 'center', color: 'text.secondary' }}>
                                <CalendarIcon size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                                <Typography variant="h6">No Appointments Yet</Typography>
                                <Typography variant="body2">You haven't booked any appointments to display.</Typography>
                            </Paper>
                        ) : (
                            <Grid container spacing={2}>
                                {history.map(apt => {
                                    const isFuture = dayjs(apt.date).isAfter(dayjs());

                                    return (
                                        <Grid item xs={12} key={apt._id}>
                                            <Card sx={{ borderRadius: 3, borderLeft: '4px solid', borderColor: isFuture ? 'primary.main' : 'text.disabled', boxShadow: 1 }}>
                                                <CardContent sx={{ p: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                                        <Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                                    Dr. {apt.doctor?.name || 'Unknown'}
                                                                </Typography>
                                                                <Chip
                                                                    label={isFuture ? 'Upcoming' : 'Completed'}
                                                                    size="small"
                                                                    sx={{ bgcolor: isFuture ? 'primary.50' : 'background.default', color: isFuture ? 'primary.700' : 'text.disabled', fontWeight: 600 }}
                                                                />
                                                            </Box>

                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5, color: 'text.secondary' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <CalendarIcon size={16} />
                                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{dayjs(apt.date).format('MMMM D, YYYY')}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <Clock size={16} />
                                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{apt.time}</Typography>
                                                                </Box>
                                                            </Box>

                                                            {apt.reason && (
                                                                <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>"{apt.reason}"</Typography>
                                                                </Box>
                                                            )}
                                                        </Box>

                                                        {isFuture && (
                                                            <Button variant="outlined" color="error" size="small" sx={{ borderRadius: 2 }}>
                                                                Cancel
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Appointments;
