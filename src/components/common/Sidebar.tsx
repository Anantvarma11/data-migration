import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Box,
    Typography
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const drawerWidth = 280;

interface SidebarProps {
    variant?: 'permanent' | 'persistent' | 'temporary';
    open?: boolean;
    onClose?: () => void;
    sx?: SxProps<Theme>;
}

const MENU_ITEMS = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Transactional DB', icon: <StorageIcon />, path: '/transactional-db' },
    { text: 'Data Warehouse', icon: <AnalyticsIcon />, path: '/data-warehouse' },
    { text: 'Bulk File Data', icon: <CloudUploadIcon />, path: '/bulk-file-data' },
    { text: 'Lift & Shift', icon: <CloudQueueIcon />, path: '/lift-and-shift' },
];

export const Sidebar: React.FC<SidebarProps> = ({ variant, open, onClose, sx }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to determine if a route is active (including sub-routes for ID params)
    const isSelected = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3 }}>
                <Box
                    component="img"
                    src="https://www.gstatic.com/images/branding/product/1x/google_cloud_48dp.png"
                    alt="Google Cloud"
                    sx={{ height: 32, mr: 2 }}
                />
                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: 'text.primary', letterSpacing: -0.5 }}>
                    Migrate
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ px: 2, py: 2 }}>
                {MENU_ITEMS.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={isSelected(item.path)}
                            onClick={() => {
                                navigate(item.path);
                                if (onClose && variant === 'temporary') onClose();
                            }}
                            sx={{
                                // Theme overrides basic shapes, we just keep hover behavior if needed
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: isSelected(item.path) ? 'inherit' : 'text.secondary' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: isSelected(item.path) ? 600 : 400,
                                    fontSize: '0.95rem'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block" align="center">
                    v1.0.0 (MVP)
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ ...sx, width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant={variant}
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid rgba(0,0,0,0.08)'
                    },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid rgba(0,0,0,0.08)',
                        height: '100vh',
                        position: 'fixed'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};
