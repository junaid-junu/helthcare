import React, { useContext, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, AppBar, Toolbar, IconButton, Typography, Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, useTheme, useMediaQuery } from '@mui/material';
import { Activity, Bell, LogOut, Menu as MenuIcon, LayoutDashboard, Users, FileText, Pill } from 'lucide-react';
import { AuthContext } from '../store/AuthContext';

const drawerWidth = 260;

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    if (!user) return null;
    const doctorName = user.name.includes('Dr.') ? user.name : `Dr. ${user.name}`;

    const menuItems = [
        { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { text: 'Patients', icon: <Users size={20} />, path: '/patients' },
        { text: 'Prescriptions', icon: <Pill size={20} />, path: '/prescriptions' },
        { text: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    ];

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ background: 'linear-gradient(to right, #14b8a6, #0f766e)', p: 1, borderRadius: 2, color: 'white', display: 'flex' }}>
                    <Activity size={24} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #0d9488, #115e59)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                    HealthCare Pro
                </Typography>
            </Box>
            <Divider sx={{ mx: 2, mb: 2 }} />

            <List sx={{ px: 2, flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? 'primary.50' : 'transparent',
                                    color: isActive ? 'primary.700' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: isActive ? 'primary.100' : 'action.hover',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'primary.600' : 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#f8fafc', borderColor: '#e2e8f0' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Logged in as</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 600 }}>
                            {doctorName.replace('Dr. ', '').charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {doctorName}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Desktop Sidebar */}
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content Workspace */}
            <Box component="main" sx={{ flexGrow: 1, p: 0, width: { md: `calc(100% - ${drawerWidth}px)` }, display: 'flex', flexDirection: 'column' }}>
                <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', zIndex: theme.zIndex.drawer - 1, bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Empty Space for alignment if mobile */}
                        <Box sx={{ display: { xs: 'none', md: 'block' } }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
                            <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}>
                                <Bell size={20} />
                            </IconButton>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: 32 }} />
                            <IconButton onClick={logout} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.50' } }} title="Logout">
                                <LogOut size={20} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Page Content Rendered Here */}
                <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
