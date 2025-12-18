import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
            <Box sx={{ mr: 1, mt: 0.5, color: '#1b5e20' }}> {/* Deep Green for CDC */}
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
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Paper sx={{ p: 2 }}>
                        <List>
                            <StrategyPoint text="Transform into a scalable, serverless platform using Refactor/Rebuild strategy" />
                            <StrategyPoint text="Replace traditional CDC with Datastream (fully managed, serverless)" />
                            <StrategyPoint text="Standardize application and IoT streams on Pub/Sub global messaging" />
                            <StrategyPoint text="Use Dataflow for robust (exactly-once) in-stream ETL/ELT" />
                        </List>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Core Services
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                            <Chip label="Datastream" color="success" />
                            <Chip label="Pub/Sub" color="success" />
                            <Chip label="Dataflow" color="success" />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Technical Process & Key Tools
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LayerBox number={1} title="Sources" content={['Operational DB', 'Apps / IoT']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={2} title="Ingestion" content={['Datastream', 'Pub/Sub']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={3} title="Transformation" content={['Dataflow']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={4} title="Storage & Analysis" content={['BigQuery', 'Cloud Storage']} />
                        </Box>

                        {/* Side Labels */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Paper sx={{ p: 1, bgcolor: '#e8f5e9', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Cloud Monitoring Context</Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Four-Phase Process Section */}
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
