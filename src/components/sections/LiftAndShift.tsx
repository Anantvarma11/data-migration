import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Paper } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ProcessStep = ({ title, icon, description }: { title: string, icon: React.ReactNode, description?: string }) => (
    <Paper elevation={3} sx={{ p: 2, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
    </Paper>
);

const Connector = ({ label }: { label?: string }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
        {label && <Typography variant="caption" sx={{ mb: 0.5 }}>{label}</Typography>}
        <ArrowRightIcon fontSize="large" color="action" />
    </Box>
);

export const LiftAndShift: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The Rapid Infrastructure Exit Strategy
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Objective</Typography>
                            <Typography variant="body1">Speed-first rehost using Migrate for Virtual Machines (M4VM).</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="secondary">Replication</Typography>
                            <Typography variant="body1">Continuous background replication with minimal performance impact.</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="warning.main">Validation</Typography>
                            <Typography variant="body1">Mandatory test-clone validation before cutover.</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Migration Lifecycle
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fff', overflowX: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 600 }}>
                            <ProcessStep title="On-Prem VM" icon={<ComputerIcon fontSize="large" />} />

                            <Connector label="Replication" />

                            <ProcessStep title="Replicated Data" icon={<CloudSyncIcon fontSize="large" />} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                                <Box sx={{ height: 40, borderLeft: '2px dashed #999' }} />
                                <Paper sx={{ p: 1, mt: 1, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
                                    <Typography variant="caption" fontWeight="bold">Test Clone</Typography>
                                </Paper>
                            </Box>

                            <Connector label="Cutover" />

                            <ProcessStep title="Live CE VM" icon={<FlightTakeoffIcon fontSize="large" color="success" />} />
                        </Box>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Core Tools
                        </Typography>
                        <Grid container spacing={2}>
                            {['Migrate to Virtual Machines (M4VM)', 'Migration Center', 'Cloud Operations Suite', 'Terraform (IaC)'].map((tool) => (
                                <Grid key={tool} size={{ xs: 12, sm: 6 }}>
                                    <Button variant="outlined" fullWidth color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                                        {tool}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
