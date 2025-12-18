import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Button } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const strategies = [
    {
        title: 'Transactional DB',
        description: 'Replatform RDBMS to managed Cloud SQL & AlloyDB using AI-augmented DMS.',
        path: '/transactional-db',
        icon: <StorageIcon sx={{ fontSize: 60 }} color="primary" />,
        color: '#e3f2fd'
    },
    {
        title: 'Data Warehouse',
        description: 'Modernize legacy warehouses to BigQuery with automated SQL translation and validation.',
        path: '/data-warehouse',
        icon: <AnalyticsIcon sx={{ fontSize: 60 }} color="secondary" />,
        color: '#e8f5e9'
    },
    {
        title: 'Bulk File Data',
        description: 'Secure, high-throughput transfer of unstructured data via STS and Transfer Appliance.',
        path: '/bulk-file-data',
        icon: <CloudUploadIcon sx={{ fontSize: 60 }} color="info" />,
        color: '#e1f5fe'
    },
    {
        title: 'CDC & Streaming',
        description: 'Transform rigid streams to serverless CDC & Pub/Sub pipelines.',
        path: '/cdc-streaming',
        icon: <SyncAltIcon sx={{ fontSize: 60 }} color="success" />,
        color: '#e8f5e9'
    },
    {
        title: 'Lift-and-Shift',
        description: 'Rapid infrastructure exit for VMs to Compute Engine with minimal downtime.',
        path: '/lift-and-shift',
        icon: <CloudQueueIcon sx={{ fontSize: 60 }} color="warning" />,
        color: '#fff3e0'
    },
];

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Box>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Welcome {user?.displayName || user?.username || 'User'}
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>
                    Specialized Migration Services
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    Accelerate your journey to Google Cloud with our specialized migration playbooks.
                    Select a strategy below to view the architecture and process.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {strategies.map((strategy) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={strategy.title}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.02)' }
                            }}
                        >
                            <CardActionArea onClick={() => navigate(strategy.path)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', pt: 4 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    {strategy.icon}
                                </Box>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {strategy.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {strategy.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Button size="small" variant="contained" onClick={() => navigate(strategy.path)}>
                                    View Strategy
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
