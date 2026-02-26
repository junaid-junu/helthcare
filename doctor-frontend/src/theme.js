import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f766e', // teal-700
            light: '#14b8a6', // teal-500
            dark: '#115e59', // teal-800
        },
        secondary: {
            main: '#047857', // emerald-700
            light: '#34d399', // emerald-400
            dark: '#064e3b', // emerald-900
        },
        background: {
            default: '#f8fafc', // slate-50
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b', // slate-800
            secondary: '#64748b', // slate-500
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
        h1: {
            fontWeight: 800,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                containedPrimary: {
                    background: 'linear-gradient(to right, #14b8a6, #0f766e)',
                    boxShadow: '0 4px 6px -1px rgba(20, 184, 166, 0.4), 0 2px 4px -1px rgba(20, 184, 166, 0.06)',
                    '&:hover': {
                        background: 'linear-gradient(to right, #0f766e, #115e59)',
                    },
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                }
            }
        }
    },
});

export default theme;
