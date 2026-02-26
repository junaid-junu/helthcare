import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Box, Container, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Avatar, CircularProgress, Card, CardContent, Chip, Tabs, Tab } from '@mui/material';
import { ArrowLeft, FileText, Pill, Activity, Droplets, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const MedicalRecords = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchRecords();
    }, [user, navigate]);

    const fetchRecords = async () => {
        try {
            const [respReports, respPrescriptions] = await Promise.all([
                api.get('/reports/my-reports'),
                api.get('/prescriptions/my-prescriptions')
            ]);
            setReports(respReports.data);
            setPrescriptions(respPrescriptions.data);
        } catch (error) {
            toast.error('Failed to load medical records');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (!user || loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 30 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton onClick={() => navigate('/dashboard')} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}>
                                <ArrowLeft size={20} />
                            </IconButton>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                                Medical Records
                            </Typography>
                        </Box>

                        <Avatar sx={{ bgcolor: 'info.light', color: 'info.dark', fontWeight: 700 }}>
                            {user.name.charAt(0)}
                        </Avatar>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                        <Tab label="Test Reports & Vitals" icon={<Activity size={18} />} iconPosition="start" />
                        <Tab label="Prescriptions" icon={<Pill size={18} />} iconPosition="start" />
                    </Tabs>
                </Box>

                {tabValue === 0 && (
                    <Box>
                        {reports.length === 0 ? (
                            <Paper sx={{ p: 6, borderRadius: 3, textAlign: 'center', color: 'text.secondary' }}>
                                <FileText size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                                <Typography variant="h6">No Test Reports</Typography>
                                <Typography variant="body2">Your doctors haven't added any test reports or vitals for you yet.</Typography>
                            </Paper>
                        ) : (
                            <Grid container spacing={3}>
                                {reports.map(report => (
                                    <Grid item xs={12} key={report._id}>
                                        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                                            <CardContent sx={{ p: 3 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Health Vitals Report</Typography>
                                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                                            {dayjs(report.dateOfTest || report.createdAt).format('MMMM D, YYYY')} &bull; Provider: Dr. {report.doctor?.name}
                                                        </Typography>
                                                    </Box>
                                                    <Chip label="Finalized" size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 600 }} />
                                                </Box>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={6} sm={4}>
                                                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                                                                <HeartPulse size={16} color="#ef4444" />
                                                                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Blood Pressure</Typography>
                                                            </Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                                {report.bloodPressureSys}/{report.bloodPressureDia} <Typography component="span" variant="caption" color="text.disabled">mmHg</Typography>
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={6} sm={4}>
                                                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                                                                <Droplets size={16} color="#3b82f6" />
                                                                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Sugar Level</Typography>
                                                            </Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                                {report.sugarLevel || '--'} <Typography component="span" variant="caption" color="text.disabled">mg/dL</Typography>
                                                            </Typography>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} sm={4}>
                                                        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                                                                <Activity size={16} color="#eab308" />
                                                                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Cholesterol</Typography>
                                                            </Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                                {report.cholesterol || '--'} <Typography component="span" variant="caption" color="text.disabled">mg/dL</Typography>
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                                {report.notes && (
                                                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>Doctor's Notes</Typography>
                                                        <Typography variant="body2" sx={{ color: 'text.primary' }}>{report.notes}</Typography>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box>
                        {prescriptions.length === 0 ? (
                            <Paper sx={{ p: 6, borderRadius: 3, textAlign: 'center', color: 'text.secondary' }}>
                                <Pill size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                                <Typography variant="h6">No Prescriptions</Typography>
                                <Typography variant="body2">You do not have any active or past prescriptions.</Typography>
                            </Paper>
                        ) : (
                            <Grid container spacing={3}>
                                {prescriptions.map(pres => (
                                    <Grid item xs={12} key={pres._id}>
                                        <Card sx={{ borderRadius: 3, boxShadow: 1, borderLeft: '4px solid', borderColor: '#8b5cf6' }}>
                                            <CardContent sx={{ p: 3 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>Medical Prescription</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                                    Issued on {dayjs(pres.dateOfPrescription || pres.createdAt).format('MMMM D, YYYY')} by Dr. {pres.doctor?.name}
                                                </Typography>

                                                {pres.medicines && pres.medicines.map((med, idx) => (
                                                    <Box key={idx} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Avatar sx={{ bgcolor: '#ede9fe', color: '#8b5cf6', width: 32, height: 32 }}><Pill size={16} /></Avatar>
                                                            <Box>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{med.name}</Typography>
                                                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                                    <Chip label={med.dosage} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                                    <Chip label={med.frequency} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>{med.duration}</Typography>
                                                    </Box>
                                                ))}

                                                {pres.treatmentNotes && (
                                                    <Box sx={{ mt: 3 }}>
                                                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Instructions</Typography>
                                                        <Typography variant="body2">{pres.treatmentNotes}</Typography>
                                                    </Box>
                                                )}

                                                {pres.followUpDate && (
                                                    <Box sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#fffbeb', p: 1, px: 2, borderRadius: 2 }}>
                                                        <CalendarIcon size={16} color="#d97706" />
                                                        <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>Follow-up on {dayjs(pres.followUpDate).format('MMMM D, YYYY')}</Typography>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default MedicalRecords;
