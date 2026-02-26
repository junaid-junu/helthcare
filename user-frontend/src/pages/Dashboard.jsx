import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Box, Container, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Divider, Chip } from '@mui/material';
import { Activity, FileText, HeartPulse, Droplets, Bell, LogOut, Download, Calendar, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthChart from '../components/Charts/HealthChart';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 30 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ background: 'linear-gradient(to right, #3b82f6, #2dd4bf)', p: 1, borderRadius: 2, color: 'white', display: 'flex' }}>
                                <HeartPulse size={20} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                                CareSync
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                                <Bell size={20} />
                            </IconButton>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: 32 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>{user.name}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Patient Profile</Typography>
                                </Box>
                                <Avatar
                                    sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700, cursor: 'pointer' }}
                                    onClick={() => navigate('/profile')}
                                    title="View Profile"
                                >
                                    {user.name.charAt(0)}
                                </Avatar>
                                <IconButton onClick={logout} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main', bgcolor: 'error.light' } }} title="Logout">
                                    <LogOut size={20} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Content */}
            <Container component="main" maxWidth="xl" sx={{ flex: 1, py: 4 }}>

                {/* Header Section */}
                <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                            Welcome Back, {user.name.split(' ')[0]}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            Here is a summary of your recent health metrics.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Calendar size={16} />}
                            onClick={() => navigate('/appointments')}
                            sx={{ color: 'text.primary', borderColor: 'divider', bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
                        >
                            Appointments
                        </Button>
                    </Box>
                </Box>

                {/* KPI Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: '#fef2f2', color: '#ef4444', borderRadius: 2, display: 'flex' }}>
                                    <HeartPulse size={24} />
                                </Box>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Blood Pressure</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                120/80 <Typography component="span" variant="body2" sx={{ color: 'text.disabled' }}>mmHg</Typography>
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: '#eff6ff', color: '#3b82f6', borderRadius: 2, display: 'flex' }}>
                                    <Droplets size={24} />
                                </Box>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Sugar Level (Fasting)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                95 <Typography component="span" variant="body2" sx={{ color: 'text.disabled' }}>mg/dL</Typography>
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: '#f0fdfa', color: '#0d9488', borderRadius: 2, display: 'flex' }}>
                                    <FileText size={24} />
                                </Box>
                                <Button
                                    size="small"
                                    onClick={() => navigate('/records')}
                                    sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600, minWidth: 'auto', p: 0.5 }}
                                >
                                    View all
                                </Button>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Recent Reports</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                3 <Typography component="span" variant="body2" sx={{ color: 'text.disabled' }}>available</Typography>
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: '#eef2ff', color: '#6366f1', borderRadius: 2, display: 'flex' }}>
                                    <Activity size={24} />
                                </Box>
                                <Button
                                    size="small"
                                    onClick={() => navigate('/records')}
                                    sx={{ color: '#6366f1', textTransform: 'none', fontWeight: 600, minWidth: 'auto', p: 0.5 }}
                                >
                                    View all
                                </Button>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Active Prescriptions</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                2 <Typography component="span" variant="body2" sx={{ color: 'text.disabled' }}>meds</Typography>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Charts Section */}
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Blood Pressure Tracking</Typography>
                                <Chip label="Normal" size="small" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 600 }} />
                            </Box>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <HealthChart type="bp" />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Blood Sugar History</Typography>
                                <Chip label="Stable" size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 600 }} />
                            </Box>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <HealthChart type="sugar" />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;
