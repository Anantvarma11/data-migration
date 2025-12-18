import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 280;

export const Layout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar onDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Sidebar
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                />
                <Sidebar
                    variant="permanent"
                    open
                    onClose={() => { }}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
