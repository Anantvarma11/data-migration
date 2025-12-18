import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, Button, Slider,
    Card, CardContent, LinearProgress, Alert, Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useMigration } from '../../context/MigrationContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { CreateMigrationDialog } from '../common/CreateMigrationDialog';

export const BulkFileData: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getMigration, updateMigration, addLog, createMigration } = useMigration();
    const migration = id ? getMigration(id) : null;

    const [dataSize, setDataSize] = useState<number>(50); // TB
    const [bandwidth, setBandwidth] = useState<number>(1); // Gbps
    const [isTransferring, setIsTransferring] = useState(false);
    const [progress, setProgress] = useState(0);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    // LANDING PAGE (No ID)
    if (!id) {
        return (
            <Box sx={{ p: 6, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 6, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CloudUploadIcon sx={{ fontSize: 80, color: 'info.main', mb: 3 }} />
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Bulk Data Transfer
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Transfer exabytes of data securely using Storage Transfer Service (STS) or Transfer Appliance.
                    </Typography>
                    <Button
                        variant="contained"
                        color="info"
                        size="large"
                        sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.1rem' }}
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Start New Transfer
                    </Button>
                </Paper>

                <CreateMigrationDialog
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    strategyTitle="Bulk File Data"
                    onSubmit={(name) => {
                        const newId = createMigration(name, 'bulk');
                        setOpenCreateModal(false);
                        navigate(`/bulk-file-data/${newId}`);
                    }}
                />
            </Box>
        );
    }

    if (!migration) {
        return <Alert severity="error">Migration not found.</Alert>;
    }

    // Calculate Estimated Duration (Hours)
    // Size (TB) * 8 (Tb) * 1024 (Gb) / Bandwidth (Gbps) / 3600 (s)
    const estimatedHours = (dataSize * 8 * 1024) / bandwidth / 3600;
    const estimatedDays = estimatedHours / 24;

    const useAppliance = estimatedDays > 7; // Suggest appliance if > 1 week

    const startTransfer = () => {
        if (!id) return;
        setIsTransferring(true);
        updateMigration(id, { status: 'in-progress', config: { dataSize, bandwidth, method: useAppliance ? 'Appliance' : 'STS' } });
        addLog(id, `Transfer started via ${useAppliance ? 'Transfer Appliance' : 'Storage Transfer Service (STS)'}`, 'info');

        // Faster simulation
        let p = 0;
        const interval = setInterval(() => {
            p += (100 / (useAppliance ? 50 : 20)); // Appliance "slower" to simulate logistics, STS faster for demo
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setIsTransferring(false);
                updateMigration(id, { status: 'completed', progress: 100 });
                addLog(id, 'Transfer complete. Checksums verified.', 'success');
            }
            setProgress(p);
            updateMigration(id, { progress: p });
        }, 100);
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Bulk Data Transfer Simulator
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {migration?.name}
                    <Chip label={useAppliance ? "Recommendation: Transfer Appliance" : "Recommendation: STS Online"}
                        color={useAppliance ? "secondary" : "primary"}
                        sx={{ ml: 2, fontWeight: 'bold' }}
                    />
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>Parameters</Typography>

                        <Typography gutterBottom>Total Data Size: <strong>{dataSize} TB</strong></Typography>
                        <Slider
                            value={dataSize}
                            onChange={(_, val) => setDataSize(val as number)}
                            min={1} max={1000}
                            valueLabelDisplay="auto"
                            disabled={isTransferring || migration?.status === 'completed'}
                        />

                        <Typography gutterBottom sx={{ mt: 3 }}>Available Bandwidth: <strong>{bandwidth} Gbps</strong></Typography>
                        <Slider
                            value={bandwidth}
                            onChange={(_, val) => setBandwidth(val as number)}
                            min={0.1} max={100} step={0.1}
                            valueLabelDisplay="auto"
                            disabled={isTransferring || migration?.status === 'completed'}
                        />

                        <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Estimated Time</Typography>
                            <Typography variant="h4" fontWeight="bold">
                                {estimatedDays < 1 ? `${Math.round(estimatedHours)} Hours` : `${estimatedDays.toFixed(1)} Days`}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 4 }}
                            disabled={isTransferring || migration?.status === 'completed'}
                            onClick={startTransfer}
                            color={useAppliance ? "secondary" : "primary"}
                            startIcon={useAppliance ? <LocalShippingIcon /> : <CloudUploadIcon />}
                        >
                            Start Transfer ({useAppliance ? 'Offline' : 'Online'})
                        </Button>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Transfer Status</Typography>

                            {(isTransferring || migration?.status === 'completed') ? (
                                <Box sx={{ mt: 4, textAlign: 'center' }}>
                                    {useAppliance ? (
                                        <LocalShippingIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                                    ) : (
                                        <CloudUploadIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                                    )}

                                    <LinearProgress variant="determinate" value={progress} sx={{ height: 20, borderRadius: 10, mb: 1 }} />
                                    <Typography variant="h4">{Math.round(progress)}%</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {migration?.status === 'completed' ? 'Transfer Finalized' : 'Transferring Blocks...'}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'text.secondary' }}>
                                    <Typography>Configure parameters to start simulation</Typography>
                                </Box>
                            )}

                            {migration?.status === 'completed' && (
                                <Alert severity="success" sx={{ mt: 4 }}>
                                    <strong>Success!</strong> All {dataSize}TB data successfully verified in Cloud Storage.
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
