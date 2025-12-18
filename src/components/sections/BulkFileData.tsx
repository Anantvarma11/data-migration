import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Container, Chip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloudIcon from '@mui/icons-material/Cloud';
import SpeedIcon from '@mui/icons-material/Speed';

// ... FeatureCard, Node can be inlined or imported if I moved to common. But here I inline.
const FeatureCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ color: 'primary.main', mb: 2 }}>{icon}</Box>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{value}</Typography>
        </CardContent>
    </Card>
);

const Node = ({ label, icon, color = 'default' }: { label: string, icon: React.ReactNode, color?: 'default' | 'primary' | 'secondary' }) => (
    <Paper elevation={3} sx={{ p: 2, minWidth: 140, textAlign: 'center', bgcolor: color === 'primary' ? 'primary.main' : 'white', color: color === 'primary' ? 'white' : 'text.primary' }}>
        <Box sx={{ mb: 1, color: color === 'primary' ? 'white' : 'inherit' }}>{icon}</Box>
        <Typography variant="subtitle2" fontWeight="bold">{label}</Typography>
    </Paper>
);

export const BulkFileData: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The Network-First, Integrity-Second Strategy
            </Typography>

            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Strategy"
                        value="Rehost / Retain Strategy"
                        icon={<FolderIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Decision"
                        value="Online vs Offline Transfer"
                        icon={<CloudUploadIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Throughput"
                        value="1.5× Benchmark (Fio)"
                        icon={<SpeedIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Resilience"
                        value="STS Minimum 3 Agents"
                        icon={<CloudIcon fontSize="large" />}
                    />
                </Grid>
            </Grid>

            {/* Diagram Section */}
            <Typography variant="h5" gutterBottom>
                Architecture & Data Flow
            </Typography>
            <Paper variant="outlined" sx={{ p: 4, bgcolor: '#f8f9fa', mb: 6 }}>
                <Container maxWidth="md">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

                        {/* Top */}
                        <Node label="On-Prem FS" icon={<FolderIcon fontSize="large" />} />

                        {/* Branching Lines - Simplified visuals */}
                        <Box sx={{ width: '60%', height: 40, borderLeft: '2px dashed #ccc', borderRight: '2px dashed #ccc', borderTop: '2px dashed #ccc', mt: 1 }} />

                        {/* Middle Row */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mt: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ mb: 1 }}>Online</Typography>
                                <Node label="Storage Transfer Service" icon={<CloudUploadIcon />} color="primary" />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ mb: 1 }}>Offline</Typography>
                                <Node label="Transfer Appliance" icon={<LocalShippingIcon />} color="secondary" />
                            </Box>
                        </Box>

                        {/* Converging Lines */}
                        <Box sx={{ width: '60%', height: 40, borderLeft: '2px dashed #ccc', borderRight: '2px dashed #ccc', borderBottom: '2px dashed #ccc', mb: 1 }} />

                        {/* Bottom */}
                        <Node label="Cloud Storage" icon={<CloudIcon fontSize="large" />} />
                    </Box>

                    {/* Footer Stats */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                        <Chip label="Dedicated Interconnect" variant="outlined" />
                        <Chip label="VPC Service Controls" variant="outlined" />
                        <Chip label="Cloud Monitoring" variant="outlined" />
                    </Box>
                </Container>
            </Paper>

            <Typography variant="h5" gutterBottom>
                Tools Implemented
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Card sx={{ p: 2 }}>Storage Transfer Service (STS)</Card>
                <Card sx={{ p: 2 }}>Transfer Appliance (TA)</Card>
                <Card sx={{ p: 2 }}>NetApp Volumes / Cloud Native Qumulo</Card>
            </Box>
        </Box>
    );
};
