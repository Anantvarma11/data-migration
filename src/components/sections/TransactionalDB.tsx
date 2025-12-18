import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, Stepper, Step, StepLabel, Button,
    TextField, FormControlLabel, Switch, Alert, LinearProgress, List, ListItem, ListItemText
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useMigration } from '../../context/MigrationContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import { CreateMigrationDialog } from '../common/CreateMigrationDialog';

const steps = ['Configuration', 'Discovery', 'Replication', 'Cutover'];

export const TransactionalDB: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getMigration, updateMigration, addLog, createMigration } = useMigration();
    const migration = id ? getMigration(id) : null;

    const [sourceDb, setSourceDb] = useState('');
    const [targetRegion, setTargetRegion] = useState('');
    const [enableCdc, setEnableCdc] = useState(true);
    const [isSimulating, setIsSimulating] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    // LANDING PAGE STATE (No ID)
    if (!id) {
        return (
            <Box sx={{ p: 6, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 6, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <StorageIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Transactional Database Migration
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Replatform your legacy RDBMS (Oracle, SQL Server, MySQL) to fully managed Google Cloud SQL or AlloyDB with zero downtime.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.1rem' }}
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Start New Migration
                    </Button>
                </Paper>

                <CreateMigrationDialog
                    open={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    strategyTitle="Transactional DB"
                    onSubmit={(name) => {
                        const newId = createMigration(name, 'transactional');
                        setOpenCreateModal(false);
                        navigate(`/transactional-db/${newId}`);
                    }}
                />
            </Box>
        );
    }

    // SIMULATOR STATE (Active ID)
    if (!migration) {
        return <Alert severity="error">Migration not found.</Alert>;
    }

    const activeStep = migration?.currentStep || 0;

    const handleConfigSubmit = () => {
        if (!sourceDb || !targetRegion) return;

        if (id) {
            updateMigration(id, {
                currentStep: 1,
                config: { sourceDb, targetRegion, enableCdc },
                status: 'in-progress'
            });
            addLog(id, `Configuration saved: Source=${sourceDb}, Region=${targetRegion}, CDC=${enableCdc}`, 'success');
        }
    };

    const runDiscovery = () => {
        if (!id) return;
        setIsSimulating(true);
        addLog(id, 'Starting schema discovery...', 'info');

        setTimeout(() => {
            addLog(id, 'Schema analyzed. 142 Tables found.', 'info');
        }, 1000);

        setTimeout(() => {
            addLog(id, 'Compatibility check passed. 98% cloud compatible.', 'success');
            updateMigration(id, { currentStep: 2, progress: 25 });
            setIsSimulating(false);
        }, 2500);
    };

    const startReplication = () => {
        if (!id) return;
        setIsSimulating(true);
        addLog(id, 'Initializing CDC stream...', 'info');
        updateMigration(id, { status: 'in-progress' });

        let p = 25;
        const interval = setInterval(() => {
            p += 10;
            if (p > 90) {
                clearInterval(interval);
                setIsSimulating(false);
                addLog(id, 'Replication caught up. Latency < 200ms.', 'success');
                updateMigration(id, { currentStep: 3, progress: 90, status: 'validating' });
            } else {
                updateMigration(id, { progress: p });
            }
        }, 500);
    };

    const performCutover = () => {
        if (!id) return;
        setIsSimulating(true);
        addLog(id, 'Stopping source writes...', 'warning');

        setTimeout(() => {
            addLog(id, 'Final CDC drain complete.', 'info');
            addLog(id, 'Promoting Target AlloyDB to Primary.', 'success');
            updateMigration(id, { status: 'completed', progress: 100 });
            setIsSimulating(false);
        }, 2000);
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Transactional DB Simulator
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {migration?.name} <Typography component="span" variant="caption">({migration?.id})</Typography>
                    </Typography>
                </Box>
                <Paper sx={{ p: 1.5, px: 3, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase">Status</Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {migration?.status || 'Draft'}
                    </Typography>
                </Paper>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4, minHeight: 400 }}>
                        {activeStep === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>Source Configuration</Typography>
                                <TextField
                                    fullWidth
                                    label="Source Database Connection String"
                                    placeholder="jdbc:postgresql://10.0.0.5:5432/crm_prod"
                                    margin="normal"
                                    value={sourceDb}
                                    onChange={(e) => setSourceDb(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    select
                                    label="Target GCP Region"
                                    margin="normal"
                                    value={targetRegion}
                                    onChange={(e) => setTargetRegion(e.target.value)}
                                    title="Target Region"
                                    SelectProps={{ native: true }}
                                >
                                    <option value="" disabled></option>
                                    <option value="us-central1">us-central1 (Iowa)</option>
                                    <option value="europe-west1">europe-west1 (Belgium)</option>
                                    <option value="asia-south1">asia-south1 (Mumbai)</option>
                                </TextField>
                                <FormControlLabel
                                    control={<Switch checked={enableCdc} onChange={(e) => setEnableCdc(e.target.checked)} />}
                                    label="Enable Change Data Capture (CDC) for Zero Downtime"
                                    sx={{ mt: 2 }}
                                />
                                <Box sx={{ mt: 4 }}>
                                    <Button variant="contained" onClick={handleConfigSubmit} disabled={!sourceDb || !targetRegion}>
                                        Save & Continue
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {activeStep === 1 && (
                            <Box textAlign="center" py={4}>
                                <Typography variant="h6" gutterBottom>Schema Discovery</Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    Analyze source schema, stored procedures, and dependencies.
                                </Typography>
                                {isSimulating ? (
                                    <Box sx={{ width: '100%', mt: 4 }}>
                                        <LinearProgress />
                                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Scanning tables...</Typography>
                                    </Box>
                                ) : (
                                    <Button variant="contained" size="large" onClick={runDiscovery}>
                                        Run Discovery
                                    </Button>
                                )}
                            </Box>
                        )}

                        {activeStep === 2 && (
                            <Box textAlign="center" py={4}>
                                <Typography variant="h6" gutterBottom>Data Replication</Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    Perform initial dump and start CDC sync.
                                </Typography>
                                {isSimulating || (migration?.progress || 0) > 25 ? (
                                    <Box sx={{ width: '100%', mt: 4 }}>
                                        <LinearProgress variant="determinate" value={migration?.progress} />
                                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                            Replicating... {migration?.progress}%
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Button variant="contained" size="large" onClick={startReplication}>
                                        Start Replication
                                    </Button>
                                )}
                            </Box>
                        )}

                        {activeStep === 3 && (
                            <Box textAlign="center" py={4}>
                                {migration?.status === 'completed' ? (
                                    <Box>
                                        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h5">Migration Complete</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Application is now running on Cloud SQL.
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h6" gutterBottom color="warning.main">Ready for Cutover</Typography>
                                        <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
                                            Warning: This action will stop writes to the source database and promote the target replica.
                                        </Alert>
                                        {isSimulating ? (
                                            <LinearProgress />
                                        ) : (
                                            <Button variant="contained" color="error" size="large" onClick={performCutover}>
                                                Initiate Cutover
                                            </Button>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: '#212121', color: '#fff' }}>
                            <Typography variant="subtitle2" fontFamily="monospace">Migration Console</Typography>
                        </Box>
                        <List sx={{ flexGrow: 1, overflow: 'auto', bgcolor: '#000', color: '#00e676', p: 1, fontFamily: 'monospace' }}>
                            {migration?.logs.map((log, index) => (
                                <ListItem key={index} dense disablePadding>
                                    <ListItemText
                                        primary={`[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`}
                                        primaryTypographyProps={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.8rem',
                                            color: log.type === 'error' ? '#ff5252' : log.type === 'warning' ? '#ffab40' : undefined
                                        }}
                                    />
                                </ListItem>
                            ))}
                            {migration?.logs.length === 0 && (
                                <Typography variant="caption" color="grey.700" sx={{ p: 1 }}>Checking system...</Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
