import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Box, Container, Grid, Paper, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Chip, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Divider, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Users, FileText, Pill, Search, Bell, LogOut, ChevronRight, Activity, Calendar, UserPlus } from 'lucide-react';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Create Patient Modal State
    const [openAddModal, setOpenAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        bloodGroup: ''
    });

    // Medical Report State
    const [openReportModal, setOpenReportModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [reportData, setReportData] = useState({
        bloodPressureSys: '',
        bloodPressureDia: '',
        sugarLevel: '',
        cholesterol: '',
        notes: ''
    });

    // Prescription State
    const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState({
        treatmentNotes: '',
        followUpDate: '',
        medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
    });

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData({ name: '', email: '', password: '', age: '', bloodGroup: '' });
    };

    const handleAddPatientChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddPatientSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/auth/register/patient', formData);
            toast.success('Patient created successfully');
            handleCloseAddModal();
            fetchPatients(); // refresh table
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create patient');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Report Handlers
    const handleOpenReportModal = (patient) => {
        setSelectedPatient(patient);
        setOpenReportModal(true);
    };
    const handleCloseReportModal = () => {
        setOpenReportModal(false);
        setSelectedPatient(null);
        setReportData({ bloodPressureSys: '', bloodPressureDia: '', sugarLevel: '', cholesterol: '', notes: '' });
    };
    const handleReportChange = (e) => setReportData({ ...reportData, [e.target.name]: e.target.value });

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/reports', { patientId: selectedPatient._id, ...reportData });
            toast.success('Medical report added successfully');
            handleCloseReportModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add report');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Prescription Handlers
    const handleOpenPrescriptionModal = (patient) => {
        setSelectedPatient(patient);
        setOpenPrescriptionModal(true);
    };
    const handleClosePrescriptionModal = () => {
        setOpenPrescriptionModal(false);
        setSelectedPatient(null);
        setPrescriptionData({ treatmentNotes: '', followUpDate: '', medicines: [{ name: '', dosage: '', frequency: '', duration: '' }] });
    };

    const handlePrescriptionChange = (e) => setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });

    const handleMedicineChange = (index, e) => {
        const newMedicines = [...prescriptionData.medicines];
        newMedicines[index][e.target.name] = e.target.value;
        setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
    };

    const addMedicineRow = () => {
        setPrescriptionData({
            ...prescriptionData,
            medicines: [...prescriptionData.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
        });
    };

    const removeMedicineRow = (index) => {
        const newMedicines = prescriptionData.medicines.filter((_, i) => i !== index);
        setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
    };

    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/prescriptions', { patientId: selectedPatient._id, ...prescriptionData });
            toast.success('Prescription added successfully');
            handleClosePrescriptionModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add prescription');
        } finally {
            setIsSubmitting(false);
        }
    };

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
            setPatients(data.filter(u => u.role === 'patient'));
        } catch (error) {
            toast.error('Failed to load patients');
        }
    };

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!user) return null;

    const doctorName = user.name.includes('Dr.') ? user.name : `Dr. ${user.name}`;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: 30 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ background: 'linear-gradient(to right, #14b8a6, #0f766e)', p: 1, borderRadius: 2, color: 'white', display: 'flex' }}>
                                <Activity size={20} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                                Provider Portal
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                                <Bell size={20} />
                            </IconButton>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: 32 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>{doctorName}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>General Practice</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 }}>
                                    {doctorName.replace('Dr. ', '').charAt(0)}
                                </Avatar>
                                <IconButton onClick={logout} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main', bgcolor: 'error.light' } }} title="Logout">
                                    <LogOut size={20} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Main Content Dashboard */}
            <Container component="main" maxWidth="xl" sx={{ flex: 1, py: 4 }}>

                {/* Header Section */}
                <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                            Overview
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            Here's what's happening with your patients today.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                            variant="outlined"
                            startIcon={<UserPlus size={16} />}
                            onClick={handleOpenAddModal}
                            sx={{ borderRadius: 2 }}
                        >
                            New Patient
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
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Total Patients</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>{patients.length}</Typography>
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
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
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
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
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

                {/* Patient Directory Section */}
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            Patient Directory
                        </Typography>

                        <TextField
                            size="small"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: { xs: '100%', sm: 300 }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} color="#94a3b8" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="patient directory table">
                            <TableHead sx={{ bgcolor: 'background.default' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Patient Details</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Contact</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Vitals/Status</TableCell>
                                    <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPatients.map(patient => (
                                    <TableRow
                                        key={patient._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' }, transition: 'background-color 0.2s' }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark', fontWeight: 600, width: 40, height: 40 }}>
                                                    {patient.name.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>{patient.name}</Typography>
                                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>ID: #{patient._id.substring(18, 24).toUpperCase()}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{patient.email}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Chip label={patient.age ? `${patient.age} yrs` : 'Age N/A'} size="small" variant="outlined" sx={{ borderRadius: 1.5 }} />
                                                <Chip label={patient.bloodGroup || 'Blood N/A'} size="small" sx={{ borderRadius: 1.5, bgcolor: patient.bloodGroup ? '#fef2f2' : 'action.selected', color: patient.bloodGroup ? '#ef4444' : 'text.primary', borderColor: patient.bloodGroup ? '#fca5a5' : 'transparent', borderWidth: patient.bloodGroup ? 1 : 0 }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                <Tooltip title="Prescribe Medicine">
                                                    <IconButton size="small" onClick={() => handleOpenPrescriptionModal(patient)} sx={{ color: '#2563eb', bgcolor: '#eff6ff', '&:hover': { bgcolor: '#dbeafe' }, borderRadius: 2 }}>
                                                        <Pill size={16} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Add Medical Report">
                                                    <IconButton size="small" onClick={() => handleOpenReportModal(patient)} sx={{ color: '#0d9488', bgcolor: '#f0fdfa', '&:hover': { bgcolor: '#ccfbf1' }, borderRadius: 2 }}>
                                                        <FileText size={16} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="View Full Profile">
                                                    <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                                        <ChevronRight size={16} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.disabled' }}>
                                                <Users size={40} style={{ opacity: 0.5, marginBottom: 16 }} />
                                                <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 500 }}>No patients found</Typography>
                                                <Typography variant="body2" sx={{ mb: 2 }}>Try adjusting your search query.</Typography>
                                                {searchTerm && (
                                                    <Button variant="text" size="small" onClick={() => setSearchTerm('')}>
                                                        Clear search
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            {/* Create Patient Modal */}
            <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <form onSubmit={handleAddPatientSubmit}>
                    <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Add New Patient</DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Enter the patient's details below to create an account for them.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    name="name"
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={handleAddPatientChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    value={formData.email}
                                    onChange={handleAddPatientChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    type="password"
                                    name="password"
                                    label="Temporary Password"
                                    value={formData.password}
                                    onChange={handleAddPatientChange}
                                    variant="outlined"
                                    helperText="Provide a temporary password to the patient."
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="age"
                                    label="Age (Optional)"
                                    value={formData.age}
                                    onChange={handleAddPatientChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Blood Group (Optional)</InputLabel>
                                    <Select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleAddPatientChange}
                                        label="Blood Group (Optional)"
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, pt: 1.5 }}>
                        <Button onClick={handleCloseAddModal} color="inherit" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ borderRadius: 2 }}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <UserPlus size={18} />}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Patient'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Add Medical Report Modal */}
            <Dialog open={openReportModal} onClose={handleCloseReportModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <form onSubmit={handleReportSubmit}>
                    <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Add Medical Report</DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Record vitals and test results for <Typography component="span" fontWeight="bold">{selectedPatient?.name}</Typography>.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="bloodPressureSys"
                                    label="Systolic BP (mmHg)"
                                    type="number"
                                    value={reportData.bloodPressureSys}
                                    onChange={handleReportChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="bloodPressureDia"
                                    label="Diastolic BP (mmHg)"
                                    type="number"
                                    value={reportData.bloodPressureDia}
                                    onChange={handleReportChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="sugarLevel"
                                    label="Sugar Level (mg/dL)"
                                    type="number"
                                    value={reportData.sugarLevel}
                                    onChange={handleReportChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="cholesterol"
                                    label="Cholesterol (mg/dL)"
                                    type="number"
                                    value={reportData.cholesterol}
                                    onChange={handleReportChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    name="notes"
                                    label="Doctor's Notes"
                                    value={reportData.notes}
                                    onChange={handleReportChange}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, pt: 1.5 }}>
                        <Button onClick={handleCloseReportModal} color="inherit" disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ borderRadius: 2 }} startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}>
                            {isSubmitting ? 'Saving...' : 'Save Report'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Prescribe Medicine Modal */}
            <Dialog open={openPrescriptionModal} onClose={handleClosePrescriptionModal} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <form onSubmit={handlePrescriptionSubmit}>
                    <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Prescribe Medicine</DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Creating prescription for <Typography component="span" fontWeight="bold">{selectedPatient?.name}</Typography>.
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Medicines</Typography>
                            {prescriptionData.medicines.map((medicine, index) => (
                                <Grid container spacing={2} key={index} sx={{ mb: 2, alignItems: 'center' }}>
                                    <Grid item xs={12} sm={3}>
                                        <TextField fullWidth size="small" required name="name" label="Medicine Name" value={medicine.name} onChange={(e) => handleMedicineChange(index, e)} />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField fullWidth size="small" required name="dosage" label="Dosage" placeholder="e.g. 500mg" value={medicine.dosage} onChange={(e) => handleMedicineChange(index, e)} />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField fullWidth size="small" required name="frequency" label="Frequency" placeholder="e.g. 1-0-1" value={medicine.frequency} onChange={(e) => handleMedicineChange(index, e)} />
                                    </Grid>
                                    <Grid item xs={10} sm={2}>
                                        <TextField fullWidth size="small" required name="duration" label="Duration" placeholder="e.g. 5 Days" value={medicine.duration} onChange={(e) => handleMedicineChange(index, e)} />
                                    </Grid>
                                    <Grid item xs={2} sm={1}>
                                        <IconButton color="error" onClick={() => removeMedicineRow(index)} disabled={prescriptionData.medicines.length === 1}>
                                            <LogOut size={18} style={{ transform: 'rotate(180deg)' }} /> {/* Using LogOut icon temporarily for delete */}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button variant="outlined" size="small" onClick={addMedicineRow} sx={{ mt: 1, borderRadius: 2 }}>
                                + Add Medicine
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    name="treatmentNotes"
                                    label="Treatment Instructions / Notes"
                                    value={prescriptionData.treatmentNotes}
                                    onChange={handlePrescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="followUpDate"
                                    label="Follow-up Date (Optional)"
                                    InputLabelProps={{ shrink: true }}
                                    value={prescriptionData.followUpDate}
                                    onChange={handlePrescriptionChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, pt: 1.5 }}>
                        <Button onClick={handleClosePrescriptionModal} color="inherit" disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ borderRadius: 2 }} startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}>
                            {isSubmitting ? 'Prescribing...' : 'Prescribe'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default Home;
