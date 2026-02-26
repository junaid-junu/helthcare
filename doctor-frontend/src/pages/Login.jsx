import React, { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box, Typography, TextField, Button, Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import { Stethoscope, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { styled } from '@mui/material/styles';

const GlassPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    color: 'white',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'none',
    '&:hover': {
        transform: 'translateY(-4px)',
    }
}));

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(email, password);
            toast.success('Authentication successful');
            navigate('/');
        } catch (err) {
            toast.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Left Side - Visual/Hero Area */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, width: '50%', position: 'relative', background: 'linear-gradient(to bottom right, #115e59, #0f766e, #059669)', overflow: 'hidden', isolate: 'isolate' }}>
                {/* Abstract background elements */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2 }}>
                    <Box sx={{ position: 'absolute', top: -80, left: -80, width: 500, height: 500, bgcolor: '#5eead4', borderRadius: '50%', mixBlendMode: 'overlay', filter: 'blur(100px)' }} />
                    <Box sx={{ position: 'absolute', bottom: 40, right: 40, width: 400, height: 400, bgcolor: '#6ee7b7', borderRadius: '50%', mixBlendMode: 'overlay', filter: 'blur(100px)', animation: 'pulse 2s infinite' }} />
                </Box>

                <Box sx={{ position: 'relative', zIndex: 10, p: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'white', mb: 'auto' }}>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1.5, borderRadius: 3, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Stethoscope size={28} color="#f0fdfa" />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>Provider Portal</Typography>
                        </Box>

                        <Box sx={{ color: 'white', maxWidth: 480, mb: 10 }}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                                Elevate your <br />
                                <Box component="span" sx={{ color: '#99f6e4' }}>patient care.</Box>
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(240, 253, 250, 0.9)', fontWeight: 300, lineHeight: 1.6 }}>
                                Access secure medical records, manage appointments, and connect with your patients through our enterprise-grade healthcare platform.
                            </Typography>
                        </Box>

                        <GlassPaper elevation={0}>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '50%' }}>
                                <ShieldCheck size={24} color="#f0fdfa" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>HIPAA Compliant</Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(204, 251, 241, 0.8)' }}>Secure architecture designed for healthcare.</Typography>
                            </Box>
                        </GlassPaper>
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: { xs: 4, sm: 6, lg: 12 }, bgcolor: 'background.paper' }}>
                <Box sx={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                        <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center', mb: 4 }}>
                            <Box sx={{ background: 'linear-gradient(to bottom right, #0d9488, #10b981)', p: 2, borderRadius: 4, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <Stethoscope size={40} color="white" />
                            </Box>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>Provider Sign In</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>Enter your credentials to access the portal.</Typography>
                    </Box>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>Professional Email</Typography>
                            <TextField
                                fullWidth
                                required
                                type="email"
                                placeholder="dr.name@hospital.com"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail size={20} color="#94a3b8" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 3, bgcolor: 'background.default' }
                                }}
                            />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>Password</Typography>
                                <Typography component="a" href="#" variant="body2" sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}>Forgot password?</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                required
                                type="password"
                                placeholder="••••••••"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock size={20} color="#94a3b8" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 3, bgcolor: 'background.default' }
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            endIcon={!isSubmitting && <ArrowRight size={20} />}
                            sx={{ mt: 1, py: 1.5, fontSize: '1.1rem', borderRadius: 3 }}
                        >
                            {isSubmitting ? 'Authenticating...' : 'Sign In Securely'}
                        </Button>
                    </form>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                        Need system access?{' '}
                        <Typography component="a" href="#" sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}>
                            Contact IT Support
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
