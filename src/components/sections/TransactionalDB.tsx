import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StrategyCard = ({ title, content }: { title: string, content: string }) => (
    <Card sx={{ mb: 2, height: '100%' }}>
        <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {content}
            </Typography>
        </CardContent>
    </Card>
);

const AcceleratorCard = ({ title }: { title: string }) => (
    <Card sx={{ textAlign: 'center', p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold">
            {title}
        </Typography>
    </Card>
);

const ArchitectureNode = ({ icon, label, subLabel }: { icon: React.ReactNode, label: string, subLabel?: string }) => (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, bgcolor: 'white' }}>
        <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
        <Typography variant="subtitle2" fontWeight="bold">{label}</Typography>
        {subLabel && <Typography variant="caption" color="text.secondary">{subLabel}</Typography>}
    </Paper>
);

export const TransactionalDB: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The AI-Augmented Replatform Strategy
            </Typography>

            <Grid container spacing={4}>
                {/* Left Column: Strategy Overview */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <StrategyCard
                            title="Primary Goal"
                            content="Move databases to managed services (Cloud SQL / AlloyDB) using a Replatform strategy with minimal downtime."
                        />
                        <StrategyCard
                            title="Strategic Imperative"
                            content="Mandate Change Data Capture (CDC) replication for near-zero downtime cutover with dedicated validation for absolute data fidelity."
                        />
                        <StrategyCard
                            title="Heterogeneous Migrations"
                            content="Leverage Gemini in Database Migration Service (DMS) to automate high-risk conversion of proprietary schemas, stored procedures, and code."
                        />
                    </Box>
                </Grid>

                {/* Right Column: Architecture Diagram */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Architecture Process
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fafafa', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

                            {/* On-Prem RDBMS */}
                            <ArchitectureNode
                                icon={<StorageIcon fontSize="large" />}
                                label="On-Prem RDBMS"
                            />

                            <ArrowDownwardIcon color="action" />

                            {/* DMS + Gemini */}
                            <ArchitectureNode
                                icon={<SmartToyIcon fontSize="large" color="secondary" />}
                                label="DMS + Gemini AI"
                                subLabel="Automated Conversion"
                            />

                            <ArrowDownwardIcon color="action" />

                            {/* Cloud Targets */}
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <ArchitectureNode
                                    icon={<CloudIcon fontSize="large" />}
                                    label="Cloud SQL"
                                />
                                <ArchitectureNode
                                    icon={<StorageIcon fontSize="large" />}
                                    label="AlloyDB"
                                    subLabel="PostgreSQL Compatible"
                                />
                            </Box>

                            <Divider sx={{ width: '100%', my: 2 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="span" sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }} />
                                Cloud Monitoring & Logging
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Accelerators Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Google-Native Accelerators
                </Typography>
                <Grid container spacing={2}>
                    {['Database Migration Service (DMS)', 'Gemini in DMS', 'Migration Center', 'Cloud Operations Suite'].map((tool) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tool}>
                            <AcceleratorCard title={tool} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
