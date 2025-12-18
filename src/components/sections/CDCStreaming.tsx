import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Chip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import RouterIcon from '@mui/icons-material/Router';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import WavesIcon from '@mui/icons-material/Waves';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const StrategyCard = ({ title, content }: { title: string, content: string }) => (
    <Card sx={{ mb: 2, height: '100%' }}>
        <CardContent>
            <Typography variant="h6" color="success.main" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {content}
            </Typography>
        </CardContent>
    </Card>
);

const ArchitectureNode = ({ icon, label, subLabel, color = "default" }: { icon: React.ReactNode, label: string, subLabel?: string, color?: "default" | "primary" | "secondary" | "success" | "warning" }) => (
    <Paper elevation={3} sx={{ p: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100, bgcolor: 'white', border: color === 'success' ? '2px solid #2e7d32' : 'none' }}>
        <Box sx={{ color: color === 'success' ? 'success.main' : 'primary.main', mb: 1 }}>{icon}</Box>
        <Typography variant="caption" fontWeight="bold" textAlign="center">{label}</Typography>
        {subLabel && <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{subLabel}</Typography>}
    </Paper>
);

const PhaseStep = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ mr: 1, mt: 0.5, color: '#2e7d32' }}> {/* Green for CDC */}
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

export const CDCStreaming: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                Ongoing Integration (CDC & Streaming) Playbook
            </Typography>

            <Grid container spacing={4}>
                {/* Left Column: Strategy Overview */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        The Serverless Real-Time Data Strategy
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <StrategyCard
                            title="Primary Goal"
                            content="Transform rigid, self-managed streaming and CDC systems into a scalable, serverless platform using a Refactor/Rebuild strategy."
                        />
                        <StrategyCard
                            title="Strategic Imperative (CDC)"
                            content="Replace traditional, agent-based CDC with Datastream, a fully managed, serverless service for low-latency replication from operational databases to BigQuery or Cloud Storage."
                        />
                        <StrategyCard
                            title="Strategic Imperative (Messaging)"
                            content="Standardize all application and IoT event streams on Pub/Sub to achieve a globally scalable, auto-scaling messaging backbone."
                        />
                        <StrategyCard
                            title="Data Integrity Mandate"
                            content="Use Dataflow for all in-stream processing (ETL/ELT) to ensure data quality and provide exactly-once processing semantics where critical."
                        />
                    </Box>
                </Grid>

                {/* Right Column: Architecture Diagram */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Technical Process & Key Tools
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fafafa', borderRadius: 2, position: 'relative' }}>

                        <Typography variant="caption" sx={{ position: 'absolute', top: 10, right: 10, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <MonitorHeartIcon fontSize="small" /> Cloud Monitoring Context
                        </Typography>

                        <Grid container spacing={4} alignItems="center" justifyContent="center">
                            {/* Inputs */}
                            <Grid size={{ xs: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <ArchitectureNode icon={<StorageIcon />} label="Operational DB" />
                                    <ArchitectureNode icon={<SettingsInputAntennaIcon />} label="Apps / IoT" />
                                </Box>
                            </Grid>

                            {/* Ingestion */}
                            <Grid size={{ xs: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ArrowForwardIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        <ArchitectureNode icon={<SyncAltIcon />} label="Datastream" color="success" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ArrowForwardIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        <ArchitectureNode icon={<RouterIcon />} label="Pub/Sub" color="success" />
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Transformation */}
                            <Grid size={{ xs: 3 }}>
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ArrowForwardIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Paper elevation={3} sx={{ p: 2, border: '2px solid #2e7d32', bgcolor: '#e8f5e9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <WavesIcon color="success" fontSize="large" />
                                        <Typography variant="subtitle2" fontWeight="bold">Dataflow</Typography>
                                        <Typography variant="caption">Transformation</Typography>
                                    </Paper>
                                    <ArrowForwardIcon sx={{ ml: 1, color: 'text.secondary' }} />
                                </Box>
                            </Grid>

                            {/* Outputs */}
                            <Grid size={{ xs: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <ArchitectureNode icon={<AssessmentIcon />} label="BigQuery" />
                                    <ArchitectureNode icon={<CloudIcon />} label="Cloud Storage" />
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle2" gutterBottom fontWeight="bold">Core Services/Tools</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label="Datastream: Serverless CDC" color="success" variant="outlined" />
                                <Chip label="Pub/Sub: Global Messaging" color="success" variant="outlined" />
                                <Chip label="Dataflow: Stream Processing" color="success" variant="outlined" />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* NEW: Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#1b5e20', mb: 4, textAlign: 'center', fontWeight: 600 }}>
                    The Four-Phase Process for Real-Time Pipeline Migration
                </Typography>
                <Grid container spacing={4}>
                    {/* Phase 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e8f5e9', borderTop: '4px solid #2e7d32' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 3 }}>
                                Phase 1: Discovery & Planning
                            </Typography>
                            <PhaseStep
                                number={1}
                                title="Source Assessment"
                                description="Inventory event sources (DBs, Kafka queues). Assess change volume and establish latency/throughput baselines (SLOs)."
                                icon={<AssessmentIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Foundation & Connectivity"
                                description="Establish a secure network foundation with Dedicated Interconnect and a VPC Service Controls perimeter around Pub/Sub and Datastream."
                                icon={<DomainIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e8f5e9', borderTop: '4px solid #2e7d32' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Pipeline Setup & Automation
                            </Typography>
                            <PhaseStep
                                number={3}
                                title="Infrastructure as Code (IaC) Deployment"
                                description="Use Terraform modules to deploy all components: Pub/Sub topics, Datastream Connection Profiles, and Dataflow job templates."
                                icon={<CodeIcon />}
                            />
                            <PhaseStep
                                number={4}
                                title="CDC/Replication Setup"
                                description="Configure Datastream job, defining source, destination, and write mode (e.g., Merge for BigQuery)."
                                icon={<SettingsSuggestIcon />}
                            />
                            <PhaseStep
                                number={5}
                                title="Dataflow Template Deployment"
                                description="Deploy Dataflow pipelines, using pre-built or custom templates, and configure for exactly-once processing."
                                icon={<AccountTreeIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e8f5e9', borderTop: '4px solid #2e7d32' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Validation
                            </Typography>
                            <PhaseStep
                                number={6}
                                title="Stream Start and Backfill"
                                description="Start the Datastream job, which performs an initial backfill then transitions to continuous CDC."
                                icon={<PlayCircleFilledIcon />}
                            />
                            <PhaseStep
                                number={7}
                                title="Real-Time Performance Validation (CRITICAL VISIBILITY STEP)"
                                description="Continuously monitor key metrics in Cloud Monitoring: Pub/Sub message backlog, delivery latency, and Dataflow worker utilization."
                                icon={<SpeedIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e8f5e9', borderTop: '4px solid #2e7d32' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 3 }}>
                                Phase 4: Optimization & Run State
                            </Typography>
                            <PhaseStep
                                number={8}
                                title="Operational Handover & AIOps"
                                description="Integrate the monitoring dashboard into operations. Implement AIOps for root-cause diagnostics."
                                icon={<MonitorHeartIcon />}
                            />
                            <PhaseStep
                                number={9}
                                title="Continuous Optimization"
                                description="The FinOps team uses Dataflow job costs and Pub/Sub metrics to tune autoscaling and optimize query patterns."
                                icon={<TrendingUpIcon />}
                            />
                            <PhaseStep
                                number={10}
                                title="Legacy System Retirement"
                                description="Define clear criteria to safely decommission the legacy streaming infrastructure (e.g., Kafka cluster) to realize cost savings."
                                icon={<DeleteForeverIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
