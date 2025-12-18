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
    Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    variant: 'permanent' | 'temporary' | 'persistent';
    sx?: SxProps<Theme>;
}

const menuItems = [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'Transactional DB', path: '/transactional-db', icon: <StorageIcon /> },
    { text: 'Data Warehouse', path: '/data-warehouse', icon: <AnalyticsIcon /> },
    { text: 'Bulk File Data', path: '/bulk-file-data', icon: <CloudUploadIcon /> },
    { text: 'CDC & Streaming', path: '/cdc-streaming', icon: <SyncAltIcon /> },
    { text: 'Lift-and-Shift', path: '/lift-and-shift', icon: <CloudQueueIcon /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant, sx }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: string) => {
        navigate(path);
        if (variant === 'temporary') {
            onClose();
        }
    };

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                ...sx,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    Migration Platform
                </Typography>
            </Toolbar>
            <Divider />
            <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: '8px',
                                    margin: '4px 8px',
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.contrastText',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname === item.path ? 'inherit' : 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ m: 1, borderRadius: 1 }}>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ m: 1, borderRadius: 1 }}>
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};
