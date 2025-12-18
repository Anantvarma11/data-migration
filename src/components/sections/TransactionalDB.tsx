import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncIcon from '@mui/icons-material/Sync';
import StorageIcon from '@mui/icons-material/Storage';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StrategyPoint = ({ text }: { text: string }) => (
    <ListItem>
        <ListItemIcon>
            <VerifiedUserIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

const LayerBox = ({ number, title, content }: { number: number, title: string, content: string[] }) => (
    <Paper elevation={2} sx={{ p: 2, mb: 2, borderLeft: 6, borderColor: 'primary.main', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, flexShrink: 0 }}>
            {number}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {content.map(c => <Chip key={c} label={c} size="small" variant="outlined" />)}
            </Box>
        </Box>
    </Paper>
);

const PhaseStep = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ mr: 1, mt: 0.5, color: '#00695c' }}> {/* Teal for Transactional DB */}
                {icon}
            </Box>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {number}. {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    </Box>
);

export const TransactionalDB: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The AI-Augmented Replatform Strategy
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Paper sx={{ p: 2 }}>
                        <List>
                            <StrategyPoint text="Move databases to managed services (Cloud SQL / AlloyDB) using a Replatform strategy" />
                            <StrategyPoint text="Mandate Change Data Capture (CDC) replication for near-zero downtime" />
                            <StrategyPoint text="Leverage Gemini in DMS for automated schema conversion" />
                            <StrategyPoint text="Dedicated validation for absolute data fidelity" />
                        </List>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Core Services
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                            <Chip label="Database Migration Service (DMS)" color="primary" />
                            <Chip label="Cloud SQL" color="primary" />
                            <Chip label="AlloyDB" color="primary" />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Architecture Process
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LayerBox number={1} title="On-Prem RDBMS" content={['Source DB']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={2} title="Ingestion & Conversion" content={['DMS + Gemini AI', 'Automated Conversion']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={3} title="Managed Database" content={['Cloud SQL', 'AlloyDB']} />
                        </Box>

                        {/* Side Labels */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Paper sx={{ p: 1, bgcolor: '#e3f2fd', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Cloud Monitoring & Logging</Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#00695c', mb: 4, textAlign: 'center', fontWeight: 600 }}> {/* Teal Title */}
                    Four-Phase Process for Transactional Database Migration
                </Typography>
                <Grid container spacing={4}>
                    {/* Phase 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 1: Discovery & Planning
                            </Typography>
                            <PhaseStep
                                number={1}
                                title="Inventory & Assessment"
                                description="Run Migration Center discovery to map database dependencies and performance profiles."
                                icon={<SearchIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Landing Zone & Connectivity"
                                description="Establish a secure landing zone with Dedicated Interconnect and necessary IAM policies."
                                icon={<DomainIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Conversion & Schema Setup
                            </Typography>
                            <PhaseStep
                                number={3}
                                title="Schema Conversion (Gemini)"
                                description="Use DMS (Gemini-augmented) to convert schemas, stored procedures, and triggers to the target dialect."
                                icon={<CodeIcon />}
                            />
                            <PhaseStep
                                number={4}
                                title="Initial Load & CDC Setup"
                                description="Perform the initial snapshot load and configure continuous Change Data Capture (CDC) replication."
                                icon={<CloudUploadIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Verification
                            </Typography>
                            <PhaseStep
                                number={5}
                                title="Replication Monitoring"
                                description="Monitor replication lag to ensure the target DB is in sync with the source."
                                icon={<SyncIcon />}
                            />
                            <PhaseStep
                                number={6}
                                title="Data Validation"
                                description="Execute rigorous validation queries (row counts, checksums) to guarantee data fidelity."
                                icon={<FactCheckIcon />}
                            />
                            <PhaseStep
                                number={7}
                                title="Cutover"
                                description="Stop writes to source, wait for drain, and point apps to the new Cloud SQL/AlloyDB instance."
                                icon={<ToggleOnIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 4: Optimization & Run State
                            </Typography>
                            <PhaseStep
                                number={8}
                                title="Database Optimization"
                                description="Tune database flags, indexes, and vacuum settings for the new cloud environment."
                                icon={<SettingsSuggestIcon />}
                            />
                            <PhaseStep
                                number={9}
                                title="Cost Management (FinOps)"
                                description="Monitor resource utilization and right-size instances to optimize spending."
                                icon={<MonetizationOnIcon />}
                            />
                            <PhaseStep
                                number={10}
                                title="Backup & DR Policy"
                                description="Enable automated backups and High Availability (HA) configurations as per SLAs."
                                icon={<StorageIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
