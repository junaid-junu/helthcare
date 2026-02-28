import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Box, Container, Grid, Paper, Typography, Chip, Button } from '@mui/material';
import { Users, FileText, Pill, Calendar, UserPlus } from 'lucide-react';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [patientsCount, setPatientsCount] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPatients();
    }, [user, navigate]);

    const fetchPatients = async () => {
        try {
            const { data } = await api.get('/users');
            setPatientsCount(data.filter(u => u.role === 'patient').length);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        }
    };

    if (!user) return null;

    return (
        <Container component="main" maxWidth="xl" disableGutters>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                        Overview
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        Here's what's happening with your clinic today.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                        variant="outlined"
                        startIcon={<UserPlus size={16} />}
                        onClick={() => navigate('/patients')}
                        sx={{ borderRadius: 2 }}
                    >
                        View Patients
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Calendar size={16} />}
                        sx={{ borderRadius: 2 }}
                    >
                        Schedule Appointment
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Paper
                        onClick={() => navigate('/patients')}
                        sx={{ p: 3, borderRadius: 3, cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Total Patients</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>{patientsCount}</Typography>
                            </Box>
                            <Box sx={{ p: 1.5, bgcolor: '#eff6ff', color: '#2563eb', borderRadius: 2, display: 'flex' }}>
                                <Users size={24} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label="+4%" size="small" sx={{ bgcolor: '#d1fae5', color: '#047857', fontWeight: 600, height: 24 }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>from last month</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        onClick={() => navigate('/reports')}
                        sx={{ p: 3, borderRadius: 3, cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Pending Reports</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>12</Typography>
                            </Box>
                            <Box sx={{ p: 1.5, bgcolor: '#fffbeb', color: '#d97706', borderRadius: 2, display: 'flex' }}>
                                <FileText size={24} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>Requires your attention</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        onClick={() => navigate('/prescriptions')}
                        sx={{ p: 3, borderRadius: 3, cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Active Prescriptions</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>84</Typography>
                            </Box>
                            <Box sx={{ p: 1.5, bgcolor: '#f0fdfa', color: '#0d9488', borderRadius: 2, display: 'flex' }}>
                                <Pill size={24} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label="+12%" size="small" sx={{ bgcolor: '#d1fae5', color: '#047857', fontWeight: 600, height: 24 }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>active renewals</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Additional Dashboard Content Could Go Here */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 4 }}>Recent Activity</Typography>
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: 'background.paper', border: '1px dashed', borderColor: 'divider', boxShadow: 'none' }}>
                <Typography color="text.secondary">No recent activity to display.</Typography>
            </Paper>

        </Container>
    );
};

export default Home;
