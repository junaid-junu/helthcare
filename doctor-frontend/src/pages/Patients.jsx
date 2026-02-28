import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Tooltip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Search, Pill, FileText, ChevronRight, Users, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const Patients = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', age: '', bloodGroup: ''
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/users');
            setPatients(data.filter(u => u.role === 'patient'));
        } catch (error) {
            toast.error('Failed to load patients');
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData({ name: '', email: '', password: '', age: '', bloodGroup: '' });
    };

    const handleAddPatientChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddPatientSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/auth/register/patient', formData);
            toast.success('Patient created successfully');
            handleCloseAddModal();
            fetchPatients();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create patient');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="xl" disableGutters>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                        Patient Directory
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        Manage all your registered patients.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<UserPlus size={18} />}
                    onClick={handleOpenAddModal}
                    sx={{ borderRadius: 2 }}
                >
                    Add Patient
                </Button>
            </Box>

            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        All Patients
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: { xs: '100%', sm: 300 }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Search size={18} color="#94a3b8" /></InputAdornment>,
                        }}
                    />
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Patient Details</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Contact</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Vitals/Status</TableCell>
                                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}><CircularProgress /></TableCell>
                                </TableRow>
                            ) : filteredPatients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.disabled' }}>
                                            <Users size={40} style={{ opacity: 0.5, marginBottom: 16 }} />
                                            <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 500 }}>No patients found</Typography>
                                            <Typography variant="body2" sx={{ mb: 2 }}>Try adjusting your search query.</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPatients.map(patient => (
                                    <TableRow key={patient._id} sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: 'action.hover' }, transition: 'background-color 0.2s' }}>
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark', fontWeight: 600 }}>
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
                                                    <IconButton size="small" onClick={() => navigate('/prescriptions', { state: { patient } })} sx={{ color: '#2563eb', bgcolor: '#eff6ff', '&:hover': { bgcolor: '#dbeafe' }, borderRadius: 2 }}>
                                                        <Pill size={16} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Add Medical Report">
                                                    <IconButton size="small" onClick={() => navigate('/reports', { state: { patient } })} sx={{ color: '#0d9488', bgcolor: '#f0fdfa', '&:hover': { bgcolor: '#ccfbf1' }, borderRadius: 2 }}>
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                <form onSubmit={handleAddPatientSubmit}>
                    <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Add New Patient</DialogTitle>
                    <DialogContent dividers>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Enter the patient's details below to create an account for them.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth required name="name" label="Full Name" value={formData.name} onChange={handleAddPatientChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth required type="email" name="email" label="Email Address" value={formData.email} onChange={handleAddPatientChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth required type="password" name="password" label="Temporary Password" value={formData.password} onChange={handleAddPatientChange} variant="outlined" helperText="Provide a temporary password to the patient." />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type="number" name="age" label="Age (Optional)" value={formData.age} onChange={handleAddPatientChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Blood Group (Optional)</InputLabel>
                                    <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleAddPatientChange} label="Blood Group (Optional)">
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
                        <Button onClick={handleCloseAddModal} color="inherit" disabled={isSubmitting}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ borderRadius: 2 }} startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <UserPlus size={18} />}>
                            {isSubmitting ? 'Creating...' : 'Create Patient'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default Patients;
