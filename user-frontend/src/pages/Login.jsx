import React, { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box, Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import { Activity, Mail, Lock, HeartPulse, ArrowRight } from 'lucide-react';
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
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Left Side - Visual/Hero Area */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, width: '50%', position: 'relative', background: 'linear-gradient(to bottom right, #1d4ed8, #2563eb, #2dd4bf)', overflow: 'hidden', isolate: 'isolate' }}>
                {/* Abstract background elements */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2 }}>
                    <Box sx={{ position: 'absolute', top: 80, left: 80, width: 384, height: 384, bgcolor: '#ffffff', borderRadius: '50%', mixBlendMode: 'overlay', filter: 'blur(100px)' }} />
                    <Box sx={{ position: 'absolute', bottom: 80, right: 80, width: 384, height: 384, bgcolor: '#93c5fd', borderRadius: '50%', mixBlendMode: 'overlay', filter: 'blur(100px)', animation: 'pulse 2s infinite' }} />
                </Box>

                <Box sx={{ position: 'relative', zIndex: 10, p: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'white', mb: 'auto' }}>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: 2, backdropFilter: 'blur(4px)' }}>
                                <HeartPulse size={32} color="white" />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>CareSync</Typography>
                        </Box>

                        <Box sx={{ color: 'white', maxWidth: 480, mb: 10 }}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                                Your health, <br />
                                <Box component="span" sx={{ color: '#dbeafe' }}>simplified.</Box>
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#f0fdfa', fontWeight: 300, lineHeight: 1.6 }}>
                                Access your medical records, connect with your healthcare providers, and take control of your well-being in one unified portal.
                            </Typography>
                        </Box>

                        <GlassPaper elevation={0}>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: '50%' }}>
                                <Activity size={24} color="#f0fdfa" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Secure & Confidential</Typography>
                                <Typography variant="body2" sx={{ color: '#ccfbf1' }}>Enterprise-grade encryption for your peace of mind.</Typography>
                            </Box>
                        </GlassPaper>
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: { xs: 4, sm: 6, lg: 12 }, bgcolor: 'background.paper' }}>
                <Box sx={{ w: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                        <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center', mb: 4 }}>
                            <Box sx={{ background: 'linear-gradient(to bottom right, #3b82f6, #2dd4bf)', p: 2, borderRadius: 4, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <HeartPulse size={40} color="white" />
                            </Box>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>Welcome Back</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>Please enter your details to sign in.</Typography>
                    </Box>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>Email Address</Typography>
                            <TextField
                                fullWidth
                                required
                                type="email"
                                placeholder="your@email.com"
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
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                        Don't have an account?{' '}
                        <Typography component="a" href="#" sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } }}>
                            Contact your provider
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
