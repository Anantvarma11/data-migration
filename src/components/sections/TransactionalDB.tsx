import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncIcon from '@mui/icons-material/Sync';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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

const PhaseStep = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ mr: 1, mt: 0.5, color: 'primary.main' }}>
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

            {/* NEW: Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#004d40', mb: 4, textAlign: 'center', fontWeight: 600 }}>
                    The Four-Phase Process for Transactional Database Migration
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
                                title="Discovery & Assessment"
                                description="Use Migration Center to collect metadata, assess technical fit for Cloud SQL/AlloyDB, and map dependencies."
                                icon={<SearchIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Foundation Readiness"
                                description="Provision GCP Landing Zone, Hybrid Connectivity (Dedicated Interconnect), and IAM roles for DMS."
                                icon={<DomainIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Conversion & Replication Setup
                            </Typography>
                            <PhaseStep
                                number={3}
                                title="Schema & Code Conversion"
                                description="For heterogeneous migrations, use the DMS conversion workspace with Gemini-assisted conversion to translate database code."
                                icon={<CodeIcon />}
                            />
                            <PhaseStep
                                number={4}
                                title="Target Provisioning (IaC)"
                                description="Deploy the target Cloud SQL/AlloyDB instance using Terraform."
                                icon={<CloudUploadIcon />}
                            />
                            <PhaseStep
                                number={5}
                                title="DMS Setup"
                                description="Configure the DMS job for serverless replication via a secure private IP path."
                                icon={<SyncIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e0f2f1', borderTop: '4px solid #00897b' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#00695c', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Cutover
                            </Typography>
                            <PhaseStep
                                number={6}
                                title="Initial Load & CDC"
                                description="DMS performs initial backfill and transitions to continuous replication."
                                icon={<StorageIcon />}
                            />
                            <PhaseStep
                                number={7}
                                title="Pre-Cutover Validation (MANDATORY)"
                                description="Run DMS built-in validation and application-level read-only tests against the replica."
                                icon={<FactCheckIcon />}
                            />
                            <PhaseStep
                                number={8}
                                title="Cutover & Rollback"
                                description="Stop writes, perform final sync, re-point application connection strings. Have a tested rollback plan ready."
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
                                number={9}
                                title="Operational Handover & AIOps"
                                description="Integrate the new database into Cloud Monitoring/Logging. Configure AIOps for anomaly detection."
                                icon={<SettingsSuggestIcon />}
                            />
                            <PhaseStep
                                number={10}
                                title="FinOps & Decommissioning"
                                description="Implement continuous right-sizing. Define and meet strict criteria to retire the legacy on-premises database to realize TCO reduction."
                                icon={<MonetizationOnIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

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
