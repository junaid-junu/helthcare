import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb', // blue-600
            light: '#60a5fa', // blue-400
            dark: '#1d4ed8', // blue-700
        },
        secondary: {
            main: '#0f766e', // teal-700
            light: '#2dd4bf', // teal-400
            dark: '#0f172a', // slate-900 (as contrast)
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
                    borderRadius: 12,
                    padding: '10px 24px',
                },
                containedPrimary: {
                    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
                    '&:hover': {
                        background: 'linear-gradient(to right, #1d4ed8, #1e3a8a)',
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
