import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, TextField, InputAdornment, Button, Grid, CircularProgress, Autocomplete } from '@mui/material';
import { FileText, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const Reports = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we navigated here from the Patients directory with a pre-selected patient
    const preselectedPatient = location.state?.patient || null;

    const [patients, setPatients] = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(true);

    const [selectedPatient, setSelectedPatient] = useState(preselectedPatient);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [reportData, setReportData] = useState({
        bloodPressureSys: '',
        bloodPressureDia: '',
        sugarLevel: '',
        cholesterol: '',
        notes: ''
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

    const handleReportChange = (e) => setReportData({ ...reportData, [e.target.name]: e.target.value });

    const handleReportSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPatient) {
            toast.error('Please select a patient first');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/reports', { patientId: selectedPatient._id, ...reportData });
            toast.success('Medical report saved successfully');

            // Clear form
            setReportData({ bloodPressureSys: '', bloodPressureDia: '', sugarLevel: '', cholesterol: '', notes: '' });
            if (!preselectedPatient) {
                setSelectedPatient(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add report');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md" disableGutters>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.5px' }}>
                    File Medical Report
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    Record vitals, test results, and clinical notes for a patient.
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <form onSubmit={handleReportSubmit}>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Patient Selection
                        </Typography>
                        <Autocomplete
                            options={patients}
                            getOptionLabel={(option) => `${option.name} (${option.email})`}
                            value={selectedPatient}
                            onChange={(event, newValue) => setSelectedPatient(newValue)}
                            loading={loadingPatients}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search and select patient..."
                                    variant="outlined"
                                    required
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
                        Clinical Vitals & Metrics
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="bloodPressureSys"
                                label="Systolic Target (mmHg)"
                                type="number"
                                value={reportData.bloodPressureSys}
                                onChange={handleReportChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="bloodPressureDia"
                                label="Diastolic Target (mmHg)"
                                type="number"
                                value={reportData.bloodPressureDia}
                                onChange={handleReportChange}
                                variant="outlined"
                                required
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
                                label="Cholesterol Level (mg/dL)"
                                type="number"
                                value={reportData.cholesterol}
                                onChange={handleReportChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Doctor's Evaluation
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            name="notes"
                            label="Clinical Notes / Diagnosis"
                            placeholder="Enter detailed observations, analysis, and recommendations here..."
                            value={reportData.notes}
                            onChange={handleReportChange}
                            variant="outlined"
                            required
                        />
                    </Box>

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
                            {isSubmitting ? 'Saving Report...' : 'Save Medical Report'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Reports;
