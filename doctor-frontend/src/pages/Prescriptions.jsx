import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, TextField, InputAdornment, Button, Grid, CircularProgress, Autocomplete, IconButton, Divider } from '@mui/material';
import { Pill, Save, Search, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const Prescriptions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we navigated here from the Patients directory with a pre-selected patient
    const preselectedPatient = location.state?.patient || null;

    const [patients, setPatients] = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(true);

    const [selectedPatient, setSelectedPatient] = useState(preselectedPatient);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [prescriptionData, setPrescriptionData] = useState({
        treatmentNotes: '',
        followUpDate: '',
        medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
    });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await api.get('/users');
                setPatients(data.filter(u => u.role === 'patient'));
            } catch (error) {
                toast.error('Failed to load patients for selection');
            } finally {
                setLoadingPatients(false);
            }
        };
        fetchPatients();
    }, []);

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

        if (!selectedPatient) {
            toast.error('Please select a patient first');
            return;
        }

        // Validate medicines
        const isValidMedicines = prescriptionData.medicines.every(m => m.name && m.dosage && m.frequency);
        if (!isValidMedicines) {
            toast.error('Please fill in required medicine details (Name, Dosage, Frequency)');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/prescriptions', { patientId: selectedPatient._id, ...prescriptionData });
            toast.success('Prescription created successfully');

            // Clear form
            setPrescriptionData({
                treatmentNotes: '',
                followUpDate: '',
                medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
            });
            if (!preselectedPatient) {
                setSelectedPatient(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create prescription');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="lg" disableGutters>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                    Write Prescription
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    Prescribe medications and establish follow-up schedules.
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <form onSubmit={handlePrescriptionSubmit}>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Patient Selection
                        </Typography>
                        <Autocomplete
                            options={patients}
                            getOptionLabel={(option) => `${option.name} (${option.email.split('@')[0]}...)`}
                            value={selectedPatient}
                            onChange={(event, newValue) => setSelectedPatient(newValue)}
                            loading={loadingPatients}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search and select patient..."
                                    variant="outlined"
                                    required
                                    sx={{ maxWidth: 500 }}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loadingPatients ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Medications
                    </Typography>

                    <Box sx={{ mb: 4, bgcolor: 'background.default', p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                        {prescriptionData.medicines.map((medicine, index) => (
                            <Grid container spacing={2} key={index} sx={{ mb: prescriptionData.medicines.length > 1 ? 3 : 1, alignItems: 'center' }}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="name"
                                        label="Medicine Name"
                                        value={medicine.name}
                                        onChange={(e) => handleMedicineChange(index, e)}
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Pill size={16} color="#94a3b8" /></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="dosage"
                                        label="Dosage"
                                        placeholder="e.g. 500mg"
                                        value={medicine.dosage}
                                        onChange={(e) => handleMedicineChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="frequency"
                                        label="Frequency"
                                        placeholder="e.g. 1-0-1 or Twice a day"
                                        value={medicine.frequency}
                                        onChange={(e) => handleMedicineChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={10} sm={2}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="duration"
                                        label="Duration"
                                        placeholder="e.g. 5 Days"
                                        value={medicine.duration}
                                        onChange={(e) => handleMedicineChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2} sm={1}>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeMedicineRow(index)}
                                        disabled={prescriptionData.medicines.length === 1}
                                        sx={{ bgcolor: 'error.50', '&:hover': { bgcolor: 'error.100' } }}
                                    >
                                        <LogOut size={18} style={{ transform: 'rotate(180deg)' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}

                        <Button
                            variant="outlined"
                            size="small"
                            onClick={addMedicineRow}
                            sx={{ mt: 1, borderRadius: 2, borderStyle: 'dashed', borderWidth: 2 }}
                        >
                            + Add Another Medicine
                        </Button>
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Instructions & Follow Up
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                name="treatmentNotes"
                                label="Treatment Instructions / Diet / Advice"
                                placeholder="E.g. Drink plenty of water. Avoid spicy food."
                                value={prescriptionData.treatmentNotes}
                                onChange={handlePrescriptionChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                name="followUpDate"
                                label="Follow-up Date"
                                InputLabelProps={{ shrink: true }}
                                value={prescriptionData.followUpDate}
                                onChange={handlePrescriptionChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, borderTop: 1, borderColor: 'divider', pt: 3 }}>
                        <Button
                            type="button"
                            onClick={() => navigate('/patients')}
                            color="inherit"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ borderRadius: 2, px: 4 }}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Save size={18} />}
                        >
                            {isSubmitting ? 'Creating...' : 'Sign & Prescribe'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Prescriptions;
