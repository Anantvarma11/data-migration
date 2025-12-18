import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Paper, Button, Checkbox,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    LinearProgress, Chip, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useMigration } from '../../context/MigrationContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { CreateMigrationDialog } from '../common/CreateMigrationDialog';

const MOCK_TABLES = [
    { name: 'SALES_TRANSACTIONS', rows: '45.2M', size: '12 GB' },
    { name: 'CUSTOMER_MASTER', rows: '1.2M', size: '250 MB' },
    { name: 'INVENTORY_LOGS', rows: '128.5M', size: '85 GB' },
    { name: 'WEB_ANALYTICS', rows: '850.1M', size: '420 GB' },
];

export const DataWarehouse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getMigration, updateMigration, addLog, createMigration } = useMigration();
    const migration = id ? getMigration(id) : null;

    const [selectedTables, setSelectedTables] = useState<string[]>([]);
    const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'extracting' | 'loading' | 'validating' | 'finished'>('idle');
    const [progress, setProgress] = useState(0);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    // LANDING PAGE (No ID)
    if (!id) {
        return (
            <Box sx={{ p: 6, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 6, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AnalyticsIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 3 }} />
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                        Data Warehouse Migration
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Modernize your enterprise data warehouse (Teradata, Netezza, Redshift) to Google BigQuery serverless analytics.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
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
                    strategyTitle="Data Warehouse"
                    onSubmit={(name) => {
                        const newId = createMigration(name, 'warehouse');
                        setOpenCreateModal(false);
                        navigate(`/data-warehouse/${newId}`);
                    }}
                />
            </Box>
        );
    }

    if (!migration) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Migration ID not found.</Typography>
                <Button onClick={() => navigate('/data-warehouse')}>Return to Strategy Page</Button>
            </Box>
        );
    }

    useEffect(() => {
        if (migration?.status === 'completed') {
            setPipelineStatus('finished');
        } else if (migration?.status === 'in-progress') {
            setPipelineStatus('extracting');
        }
    }, [migration]);

    const toggleTable = (name: string) => {
        if (selectedTables.includes(name)) {
            setSelectedTables(prev => prev.filter(t => t !== name));
        } else {
            setSelectedTables(prev => [...prev, name]);
        }
    };

    const runPipeline = () => {
        if (!id) return;
        setPipelineStatus('extracting');
        updateMigration(id, { status: 'in-progress', config: { tables: selectedTables } });
        addLog(id, `Pipeline started for ${selectedTables.length} tables.`, 'info');

        let p = 0;
        const extractInterval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 33) {
                clearInterval(extractInterval);
                setPipelineStatus('loading');
                addLog(id, 'Extraction complete. Starting BigQuery load...', 'info');
                startLoading();
            }
        }, 300);
    };

    const startLoading = () => {
        if (!id) return;
        let p = 33;
        const loadInterval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 66) {
                clearInterval(loadInterval);
                setPipelineStatus('validating');
                addLog(id, 'Data loaded. Running validation checks...', 'warning');
                startValidation();
            }
        }, 300);
    };

    const startValidation = () => {
        if (!id) return;
        let p = 66;
        const validateInterval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(validateInterval);
                setPipelineStatus('finished');
                updateMigration(id, { status: 'completed', progress: 100 });
                addLog(id, 'Validation passed. Row counts match 100%.', 'success');
            }
        }, 300);
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Data Warehouse ELT Simulator
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {migration?.name} <Box component="span" sx={{ ml: 2 }}><Chip label={pipelineStatus.toUpperCase()} color="primary" variant="outlined" size="small" /></Box>
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Source Tables (Teradata)</Typography>
                            <Button
                                variant="contained"
                                startIcon={<PlayArrowIcon />}
                                disabled={selectedTables.length === 0 || pipelineStatus !== 'idle'}
                                onClick={runPipeline}
                            >
                                Run ELT Pipeline
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox"></TableCell>
                                        <TableCell>Table Name</TableCell>
                                        <TableCell>Rows</TableCell>
                                        <TableCell>Size</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {MOCK_TABLES.map((row) => (
                                        <TableRow key={row.name} hover onClick={() => pipelineStatus === 'idle' && toggleTable(row.name)} sx={{ cursor: 'pointer' }}>
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedTables.includes(row.name)} disabled={pipelineStatus !== 'idle'} />
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.rows}</TableCell>
                                            <TableCell>{row.size}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {pipelineStatus !== 'idle' && (
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" gutterBottom>Pipeline Status</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box sx={{ flex: 1, mr: 2 }}>
                                    <Typography variant="caption" fontWeight="bold">OVERALL PROGRESS</Typography>
                                    <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
                                </Box>
                                <Typography variant="body2">{Math.round(progress)}%</Typography>
                            </Box>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid size={{ xs: 4 }}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: progress > 0 ? '#e3f2fd' : 'transparent', borderColor: pipelineStatus === 'extracting' ? 'primary.main' : 'divider' }}>
                                        <Typography variant="subtitle2">1. Extraction</Typography>
                                        <Typography variant="caption" color="text.secondary">BigQuery DTS</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: progress > 33 ? '#e3f2fd' : 'transparent', borderColor: pipelineStatus === 'loading' ? 'primary.main' : 'divider' }}>
                                        <Typography variant="subtitle2">2. Loading</Typography>
                                        <Typography variant="caption" color="text.secondary">BigQuery Storage API</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: progress > 66 ? '#e3f2fd' : 'transparent', borderColor: pipelineStatus === 'validating' ? 'primary.main' : 'divider' }}>
                                        <Typography variant="subtitle2">3. Validation</Typography>
                                        <Typography variant="caption" color="text.secondary">Data Validation Tool</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    {pipelineStatus === 'finished' ? (
                        <Paper sx={{ p: 3, border: 1, borderColor: 'success.main', bgcolor: '#f1f8e9' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <CheckCircleIcon color="success" />
                                <Typography variant="h6">Validation Passed</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <List dense>
                                <ListItem>
                                    <ListItemText primary="Row Counts" secondary="Matched (100%)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Schema Check" secondary="Matched (0 Errors)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Primary Keys" secondary="Verified" />
                                </ListItem>
                            </List>
                        </Paper>
                    ) : (
                        <Paper sx={{ p: 3, opacity: 0.7 }}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>Metrics</Typography>
                            <Typography variant="body2" paragraph>
                                Real-time validation metrics will appear here once the pipeline reaches the validation stage.
                            </Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
