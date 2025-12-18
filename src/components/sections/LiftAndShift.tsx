import React, { useState } from 'react';
import {
    Box, Typography, Grid, Paper, Stepper, Step, StepLabel, Button,
    LinearProgress, Alert, Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useMigration, type MigrationLog } from '../../context/MigrationContext';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ScienceIcon from '@mui/icons-material/Science';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CreateMigrationDialog } from '../common/CreateMigrationDialog';

const steps = ['Assessment', 'Replication', 'Test Clone', 'Cutover'];

export const LiftAndShift: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getMigration, updateMigration, addLog, createMigration } = useMigration();
    const migration = id ? getMigration(id) : null;

    const [replicationProgress, setReplicationProgress] = useState(0);
    const [testCloneStatus, setTestCloneStatus] = useState<'not_started' | 'creating' | 'ready' | 'verified'>('not_started');
    const [openCreateModal, setOpenCreateModal] = useState(false);

    // LANDING PAGE (No ID)
    if (!id) {
        return (
            <Box sx={{ p: 6, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 6, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ComputerIcon sx={{ fontSize: 80, color: 'warning.main', mb: 3 }} />
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Lift-and-Shift Migration (M4VM)
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Migrate virtual machines (VMware, Hyper-V, AWS EC2) directly to Compute Engine without modification.
                    </Typography>
                    <Button
                        variant="contained"
                        color="warning"
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
                    strategyTitle="Lift & Shift"
                    onSubmit={(name) => {
                        const newId = createMigration(name, 'lift');
                        setOpenCreateModal(false);
                        navigate(`/lift-and-shift/${newId}`);
                    }}
                />
            </Box>
        );
    }

    const activeStep = migration?.currentStep || 0;

    const runAssessment = () => {
        if (!id) return;
        addLog(id, 'Starting VM dependency mapping...', 'info');
        setTimeout(() => {
            addLog(id, 'Assessment complete. Group: "Prod-Web-Server" identified.', 'success');
            updateMigration(id, { currentStep: 1, status: 'in-progress' });
        }, 1500);
    };

    const startReplication = () => {
        if (!id) return;
        addLog(id, 'Initializing replication to Google Cloud...', 'info');
        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            if (p >= 100) {
                clearInterval(interval);
                addLog(id, 'Replication active. RPO < 1min.', 'success');
                updateMigration(id, { currentStep: 2, progress: 50 });
            }
            setReplicationProgress(p);
        }, 300);
    };

    const createTestClone = () => {
        if (!id) return;
        setTestCloneStatus('creating');
        addLog(id, 'Spinning up isolated Test Clone...', 'warning');
        setTimeout(() => {
            setTestCloneStatus('ready');
            addLog(id, 'Test Clone ready at 34.12.10.x', 'info');
        }, 2000);
    };

    const verifyClone = () => {
        if (!id) return;
        addLog(id, 'Running automated smoke tests on clone...', 'info');
        setTimeout(() => {
            setTestCloneStatus('verified');
            addLog(id, 'Clone validation passed. Ready for cutover.', 'success');
        }, 1500);
    };

    const executeCutover = () => {
        if (!id) return;
        addLog(id, 'Shutting down on-prem VM...', 'warning');
        setTimeout(() => {
            addLog(id, 'Final sync complete.', 'info');
            addLog(id, 'Starting Cloud VM instance...', 'info');
            setTimeout(() => {
                updateMigration(id, { currentStep: 4, status: 'completed', progress: 100 });
                addLog(id, 'Cutover successful. New IP: 35.200.10.x', 'success');
            }, 1500);
        }, 1500);
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Lift-and-Shift Simulator
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {migration?.name} <Chip label={migration?.status} size="small" sx={{ ml: 2, textTransform: 'capitalize' }} />
                </Typography>
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
                            <Box textAlign="center" py={4}>
                                <ComputerIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>Assess Environment</Typography>
                                <Typography paragraph color="text.secondary">Scan VMWare/AWS environment for dependencies.</Typography>
                                <Button variant="contained" onClick={runAssessment}>Run Assessment</Button>
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box textAlign="center" py={4}>
                                <CloudSyncIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>Replication</Typography>
                                <Box sx={{ width: '80%', mx: 'auto', mt: 3 }}>
                                    <LinearProgress variant="determinate" value={replicationProgress} />
                                    <Typography variant="caption">{replicationProgress}% Synced</Typography>
                                </Box>
                                <Button variant="contained" sx={{ mt: 3 }} onClick={startReplication} disabled={replicationProgress > 0}>
                                    Start Replication
                                </Button>
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box textAlign="center" py={4}>
                                <ScienceIcon sx={{ fontSize: 60, color: testCloneStatus === 'verified' ? 'success.main' : 'warning.main', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>Test Clone Validation</Typography>
                                <Typography paragraph color="text.secondary">Gating Requirement: You must verify a test clone before cutting over.</Typography>

                                {testCloneStatus === 'not_started' && <Button variant="contained" color="warning" onClick={createTestClone}>Create Test Clone</Button>}
                                {testCloneStatus === 'creating' && <LinearProgress />}
                                {testCloneStatus === 'ready' && (
                                    <Box>
                                        <Alert severity="info" sx={{ mb: 2 }}>Clone Running. IP: 34.12.10.x</Alert>
                                        <Button variant="outlined" onClick={verifyClone}>Verify Functionality</Button>
                                    </Box>
                                )}
                                {testCloneStatus === 'verified' && (
                                    <Box>
                                        <Alert severity="success" sx={{ mb: 2 }}>Clone Verified!</Alert>
                                        <Button variant="contained" color="primary" onClick={() => updateMigration(id, { currentStep: 3 })}>
                                            Proceed to Cutover
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                        {activeStep === 3 && (
                            <Box textAlign="center" py={4}>
                                <FlightTakeoffIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                                <Typography variant="h5" gutterBottom>Ready for Cutover</Typography>
                                <Typography paragraph>This will transform the VM to a native Compute Engine instance.</Typography>
                                <Button variant="contained" color="error" size="large" onClick={executeCutover}>
                                    Execute Cutover
                                </Button>
                            </Box>
                        )}
                        {activeStep === 4 && (
                            <Box textAlign="center" py={4}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                                <Typography variant="h4" gutterBottom>Migration Complete</Typography>
                                <Button variant="outlined" onClick={() => navigate('/')}>Return to Dashboard</Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ height: 400, bgcolor: '#000', color: '#00e676', p: 2, overflow: 'auto', fontFamily: 'monospace' }}>
                        <Typography variant="caption" sx={{ color: '#fff', borderBottom: '1px solid #333', display: 'block', mb: 1 }}>Console Output</Typography>
                        {migration?.logs.map((log: MigrationLog, i: number) => (
                            <Box key={i} sx={{ mb: 0.5 }}>
                                <span style={{ color: '#666' }}>[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
