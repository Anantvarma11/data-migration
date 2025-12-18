import React, { useState } from 'react';
import {
    Box, Typography, Grid, Card, CardContent,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
    IconButton
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMigration, type MigrationType } from '../../context/MigrationContext';
import { StrategyDescriptionDialog, type StrategyContent } from '../common/StrategyDescriptionDialog';

interface StrategyDef {
    type: MigrationType;
    title: string;
    description: string; // Short description for card
    path: string;
    icon: React.ReactNode;
    color: string;
    details: StrategyContent & { fullTitle: string };
}

const strategies: StrategyDef[] = [
    {
        type: 'transactional',
        title: 'Transactional DB',
        description: 'Replatform RDBMS to Cloud SQL/AlloyDB',
        path: '/transactional-db',
        icon: <StorageIcon sx={{ fontSize: 40 }} color="primary" />,
        color: '#e3f2fd',
        details: {
            fullTitle: 'Transactional Database Replatform Strategy',
            purpose: 'Replatform on-prem or self-managed relational databases to fully managed Google Cloud databases such as Cloud SQL or AlloyDB with minimal downtime.',
            whenToUse: [
                'Mission-critical OLTP systems',
                'Applications requiring near-zero downtime',
                'Legacy RDBMS environments (Oracle, MySQL, PostgreSQL)'
            ],
            flow: [
                'Configuration of source and target',
                'Schema & dependency discovery',
                'Continuous replication using CDC',
                'Data validation & consistency checks',
                'Controlled cutover'
            ],
            capabilities: [
                'Change Data Capture (CDC)',
                'Near-zero downtime migration',
                'Automated schema conversion',
                'Validation before cutover'
            ]
        }
    },
    {
        type: 'warehouse',
        title: 'Data Warehouse',
        description: 'Modernize to BigQuery',
        path: '/data-warehouse',
        icon: <AnalyticsIcon sx={{ fontSize: 40 }} color="secondary" />,
        color: '#e8f5e9',
        details: {
            fullTitle: 'Autonomous Data Warehouse Modernization Strategy',
            purpose: 'Modernize legacy data warehouses by migrating them to BigQuery, shifting from ETL to ELT with automated SQL translation and validation.',
            whenToUse: [
                'Legacy DW platforms (Teradata, Oracle, Netezza)',
                'Analytics modernization initiatives',
                'Large-scale reporting workloads'
            ],
            flow: [
                'Source DW assessment',
                'Data ingestion using BigQuery DTS / Migration Services',
                'SQL translation and optimization',
                'Validation and reconciliation',
                'Consumption via BI tools'
            ],
            capabilities: [
                'Gemini-powered SQL translation',
                'Automated ingestion pipelines',
                'End-to-end data validation',
                'Cloud-native analytics'
            ]
        }
    },
    {
        type: 'bulk',
        title: 'Bulk File Data',
        description: 'STS & Validation',
        path: '/bulk-file-data',
        icon: <CloudUploadIcon sx={{ fontSize: 40 }} color="info" />,
        color: '#e1f5fe',
        details: {
            fullTitle: 'Network-First Bulk File Migration Strategy',
            purpose: 'Securely migrate large volumes of unstructured data from on-prem file systems to Cloud Storage using online or offline transfer mechanisms.',
            whenToUse: [
                'File shares, NAS, object stores',
                'Large datasets (TB–PB scale)',
                'Limited or constrained network bandwidth'
            ],
            flow: [
                'Data size & network assessment',
                'Online transfer using Storage Transfer Service (STS) OR Offline transfer using Transfer Appliance',
                'Integrity validation',
                'Cloud storage landing'
            ],
            capabilities: [
                'Online & offline transfer options',
                'High-throughput ingestion',
                'Resumable and fault-tolerant transfers',
                'Integrity verification'
            ]
        }
    },
    {
        type: 'lift',
        title: 'Lift-and-Shift',
        description: 'VM Migration (M4VM)',
        path: '/lift-and-shift',
        icon: <CloudQueueIcon sx={{ fontSize: 40 }} color="warning" />,
        color: '#fff3e0',
        details: {
            fullTitle: 'Rapid Infrastructure Exit (Lift-and-Shift) Strategy',
            purpose: 'Quickly migrate virtual machines from on-prem environments to Google Compute Engine with minimal refactoring.',
            whenToUse: [
                'Time-sensitive data center exits',
                'Legacy applications not ready for refactor',
                'Infrastructure-first cloud adoption'
            ],
            flow: [
                'Continuous VM replication',
                'Test clone validation',
                'Performance and functional testing',
                'Production cutover'
            ],
            capabilities: [
                'Continuous background replication',
                'Test-clone validation',
                'Minimal downtime cutover',
                'Infrastructure-as-is migration'
            ]
        }
    },
];

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { migrations } = useMigration();

    const [selectedStrategy, setSelectedStrategy] = useState<StrategyDef | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in-progress': return 'primary';
            case 'validating': return 'warning';
            case 'failed': return 'error';
            default: return 'default';
        }
    };

    const getStrategyPath = (type: MigrationType) => {
        return strategies.find(s => s.type === type)?.path || '/';
    };

    // Safe navigation wrapper for table rows (kept as is for accessing active migrations)
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleCardClick = (strategy: StrategyDef) => {
        setSelectedStrategy(strategy);
    };

    const handleDialogNavigate = () => {
        if (selectedStrategy) {
            navigate(selectedStrategy.path);
            setSelectedStrategy(null);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Welcome back, {user?.displayName || user?.username}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Migration Control Plane
                </Typography>
            </Box>

            {/* Stats Overview */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="h4" color="primary" fontWeight="bold">{migrations.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Total Active Migrations</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main" fontWeight="bold">
                            {migrations.filter(m => m.status === 'completed').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Completed Migrations</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main" fontWeight="bold">
                            {migrations.filter(m => m.status === 'in-progress').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">In Progress</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Active Migrations Table */}
            {migrations.length > 0 ? (
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">Recent Activity</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Progress</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {migrations.map((row) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>{row.name}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {strategies.find(s => s.type === row.type)?.icon}
                                                {strategies.find(s => s.type === row.type)?.title}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={row.status} color={getStatusColor(row.status) as any} size="small" sx={{ textTransform: 'capitalize' }} />
                                        </TableCell>
                                        <TableCell>{row.progress}%</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleNavigation(`${getStrategyPath(row.type)}/${row.id}`)}>
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Paper sx={{ p: 4, textAlign: 'center', mb: 6, bgcolor: 'background.default', border: '1px dashed grey' }}>
                    <Typography color="text.secondary">No active migrations found.</Typography>
                    <Typography variant="caption">Select a strategy below to start one.</Typography>
                </Paper>
            )}

            {/* Strategy Access Catalog - Now READ ONLY */}
            <Typography variant="h5" gutterBottom fontWeight="bold">Migration Strategies</Typography>
            <Grid container spacing={3}>
                {strategies.map((strategy) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={strategy.title}>
                        <Card
                            sx={{
                                height: '100%',
                                bgcolor: strategy.color,
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.02)', boxShadow: 3 }
                            }}
                            variant="outlined"
                            onClick={() => handleCardClick(strategy)}
                        >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Box sx={{ mb: 2 }}>{strategy.icon}</Box>
                                <Typography gutterBottom variant="h6" component="div">
                                    {strategy.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {strategy.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Detailed Description Dialog */}
            {selectedStrategy && (
                <StrategyDescriptionDialog
                    open={Boolean(selectedStrategy)}
                    onClose={() => setSelectedStrategy(null)}
                    title={selectedStrategy.details.fullTitle}
                    content={selectedStrategy.details}
                    onNavigate={handleDialogNavigate}
                />
            )}
        </Box>
    );
};
