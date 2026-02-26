import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Box, Container, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Divider, TextField, CircularProgress } from '@mui/material';
import { Activity, Bell, LogOut, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, logout, login } = useContext(AuthContext); // we might need to update user context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        height: '',
        weight: '',
        bloodGroup: '',
        medicalHistory: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [user, navigate]);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/users/profile');
            setFormData({
                name: data.name || '',
                age: data.age || '',
                height: data.height || '',
                weight: data.weight || '',
                bloodGroup: data.bloodGroup || '',
                medicalHistory: data.medicalHistory || ''
            });
        } catch (error) {
            toast.error('Failed to load profile details');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { data } = await api.put('/users/profile', formData);
            toast.success('Profile updated successfully');
            // Inform context that user data changed if needed (would require a setUser in AuthContext)
            // For now, next login or refresh will fetch latest
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

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
                                My Profile
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>{user.name}</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 }}>
                                    {user.name.charAt(0)}
                                </Avatar>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Content */}
            <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 700 }}>
                            {formData.name ? formData.name.charAt(0) : user.name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>{formData.name || user.name}</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <form onSubmit={handleSaveProfile}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Personal Information</Typography>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    value={user.email}
                                    disabled
                                    variant="outlined"
                                    helperText="Email cannot be changed."
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Height (cm)"
                                    name="height"
                                    type="number"
                                    value={formData.height}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Weight (kg)"
                                    name="weight"
                                    type="number"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Blood Group"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="e.g. O+"
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Medical History</Typography>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Medical History / Allergies"
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isSaving}
                                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save size={20} />}
                                sx={{ borderRadius: 2, px: 4 }}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Profile;
