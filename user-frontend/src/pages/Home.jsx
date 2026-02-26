import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import { HeartPulse, ArrowRight, ShieldCheck, Clock, Activity } from 'lucide-react';
import { styled } from '@mui/material/styles';

const GlassPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
    height: 48,
    width: 48,
    backgroundColor: color + '20',
    color: color,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* Background elements */}
            <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', bgcolor: 'primary.light', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(100px)', opacity: 0.2 }} />
            <Box sx={{ position: 'absolute', top: '20%', right: '-10%', width: '40%', height: '40%', bgcolor: 'secondary.light', borderRadius: '50%', mixBlendMode: 'multiply', filter: 'blur(100px)', opacity: 0.2 }} />

            {/* Navbar */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ zIndex: 10, pt: 2, pb: 2 }}>
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, md: 6 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HeartPulse color="#2563eb" size={32} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
                            CareSync
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => navigate('/login')}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                    >
                        Sign In
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', mt: { xs: 4, md: 0 }, pb: 8 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 10, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100', color: 'primary.700', mb: 4, typography: 'body2', fontWeight: 500 }}>
                    The future of healthcare management
                </Box>

                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 800, color: 'text.primary', letterSpacing: '-1.5px', lineHeight: 1.1, mb: 3 }}>
                    Your health journey, <br sx={{ display: { xs: 'none', md: 'block' } }} />
                    <Box component="span" sx={{ background: 'linear-gradient(to right, #2563eb, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        beautifully unified.
                    </Box>
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.25rem', color: 'text.secondary', maxWidth: 600, mb: 6, lineHeight: 1.6 }}>
                    Experience a seamless connection with your healthcare providers. Manage appointments, track lab results, and stay on top of your well-being.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 10 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/login')}
                        endIcon={<ArrowRight size={20} />}
                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ px: 4, py: 1.5, fontSize: '1.1rem', color: 'text.primary', borderColor: 'divider', bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
                    >
                        Learn More
                    </Button>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={4} sx={{ textAlign: 'left' }}>
                    <Grid item xs={12} md={4}>
                        <GlassPaper>
                            <IconWrapper color="#2563eb">
                                <ShieldCheck size={24} />
                            </IconWrapper>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Bank-level Security</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Your medical records are encrypted and stored with industry-leading security protocols.</Typography>
                        </GlassPaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GlassPaper>
                            <IconWrapper color="#0f766e">
                                <Clock size={24} />
                            </IconWrapper>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>24/7 Access</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>View your test reports and prescriptions anytime, anywhere, on any device.</Typography>
                        </GlassPaper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GlassPaper>
                            <IconWrapper color="#4f46e5">
                                <Activity size={24} />
                            </IconWrapper>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Health Tracking</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Visualize your vitals over time with interactive charts designed for clarity.</Typography>
                        </GlassPaper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
