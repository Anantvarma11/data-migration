import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Container, Chip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloudIcon from '@mui/icons-material/Cloud';
import SourceIcon from '@mui/icons-material/Source';
import TimerIcon from '@mui/icons-material/Timer';
import CompressIcon from '@mui/icons-material/Compress';
import RouterIcon from '@mui/icons-material/Router';
import SecurityIcon from '@mui/icons-material/Security';
import DnsIcon from '@mui/icons-material/Dns';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AltRouteIcon from '@mui/icons-material/AltRoute';
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

const Node = ({ label, icon, color = 'default' }: { label: string, icon: React.ReactNode, color?: 'default' | 'primary' | 'secondary' }) => (
    <Paper elevation={3} sx={{ p: 2, minWidth: 140, textAlign: 'center', bgcolor: color === 'primary' ? 'primary.main' : 'white', color: color === 'primary' ? 'white' : 'text.primary' }}>
        <Box sx={{ mb: 1, color: color === 'primary' ? 'white' : 'inherit' }}>{icon}</Box>
        <Typography variant="subtitle2" fontWeight="bold">{label}</Typography>
    </Paper>
);

const PhaseStep = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ mr: 1, mt: 0.5, color: '#bf360c' }}> {/* Deep Brown/Orange for Bulk Data */}
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

export const BulkFileData: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The Network-First, Integrity-Second Strategy
            </Typography>

            <Grid container spacing={4} sx={{ mb: 2 }}>
                {/* Left Column: Strategy Overview */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        The Network-First, Integrity-Second Strategy
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <StrategyCard
                            title="Primary Goal"
                            content="Move massive volumes of unstructured data to Cloud Storage using a Rehost/Retain strategy that prioritizes network performance and data integrity."
                        />
                        <StrategyCard
                            title="Strategic Imperative (Bandwidth Management)"
                            content="Data volume dictates the path. Choose Storage Transfer Service (STS) [Online] for high-speed networks or Transfer Appliance (TA) [Offline] for multi-petabyte datasets that exceed WAN limits."
                        />
                        <StrategyCard
                            title="Critical Performance Benchmark"
                            content="The source I/O subsystem must support the transfer. Mandate that source read throughput is at least 1.5x the desired upload bandwidth, validated with tools like Fio to prevent bottlenecks."
                        />
                        <StrategyCard
                            title="Resilience"
                            content="For online transfers, the STS agent architecture must be resilient, starting with at least three agents to ensure fault tolerance."
                        />
                    </Box>
                </Grid>

                {/* Right Column: Architecture Diagram */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Architecture & Data Flow
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                        <Container maxWidth="md" disableGutters>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

                                {/* Top */}
                                <Node label="On-Prem FS" icon={<FolderIcon fontSize="large" />} />

                                {/* Branching Lines - Simplified visuals */}
                                <Box sx={{ width: '60%', height: 40, borderLeft: '2px dashed #ccc', borderRight: '2px dashed #ccc', borderTop: '2px dashed #ccc', mt: 1 }} />

                                {/* Middle Row */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', mt: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="caption" sx={{ mb: 1 }}>Online</Typography>
                                        <Node label="Storage Transfer Service" icon={<CloudUploadIcon />} color="primary" />
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="caption" sx={{ mb: 1 }}>Offline</Typography>
                                        <Node label="Transfer Appliance" icon={<LocalShippingIcon />} color="secondary" />
                                    </Box>
                                </Box>

                                {/* Converging Lines */}
                                <Box sx={{ width: '60%', height: 40, borderLeft: '2px dashed #ccc', borderRight: '2px dashed #ccc', borderBottom: '2px dashed #ccc', mb: 1 }} />

                                {/* Bottom */}
                                <Node label="Cloud Storage" icon={<CloudIcon fontSize="large" />} />
                            </Box>

                            {/* Footer Stats */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4, flexWrap: 'wrap' }}>
                                <Chip label="Dedicated Interconnect" variant="outlined" />
                                <Chip label="VPC Service Controls" variant="outlined" />
                                <Chip label="Cloud Monitoring" variant="outlined" />
                            </Box>
                        </Container>

                        <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
                            Tools Implemented
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip label="Storage Transfer Service (STS)" color="primary" variant="outlined" />
                            <Chip label="Transfer Appliance (TA)" color="secondary" variant="outlined" />
                            <Chip label="NetApp Volumes / Cloud Native Qumulo" variant="outlined" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#b71c1c', mb: 4, textAlign: 'center', fontWeight: 600 }}> {/* Deep Brown/Red Title */}
                    The Four-Phase Process for Petabyte-Scale Data Transfer
                </Typography>
                <Grid container spacing={4}>
                    {/* Phase 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#fbe9e7', borderTop: '4px solid #d84315' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#bf360c', fontWeight: 'bold', mb: 3 }}>
                                Phase 1: Discovery & Planning
                            </Typography>
                            <PhaseStep
                                number={1}
                                title="Source Assessment & Path Selection"
                                description="Use Migration Center to assess file system size and count. Choose the path: STS (Online) or TA (Offline)."
                                icon={<SourceIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Source I/O Benchmark (CRITICAL)"
                                description="Use Fio to benchmark source read throughput. Ensure it is >= 1.5x the target upload speed."
                                icon={<TimerIcon />}
                            />
                            <PhaseStep
                                number={3}
                                title="File Optimization"
                                description="For archival scenarios with many small files (<16 MB), plan to both batch them using 'tar' to reduce metadata overhead."
                                icon={<CompressIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#fbe9e7', borderTop: '4px solid #d84315' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#bf360c', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Foundation & Agent Configuration
                            </Typography>
                            <PhaseStep
                                number={4}
                                title="Hybrid Network Provisioning (IaC)"
                                description="Provision Dedicated Interconnect via Terraform."
                                icon={<RouterIcon />}
                            />
                            <PhaseStep
                                number={5}
                                title="Storage Target & Security"
                                description="Provision Cloud Storage buckets with VPC Service Controls and Bucket Lock."
                                icon={<SecurityIcon />}
                            />
                            <PhaseStep
                                number={6}
                                title="STS Agent Deployment"
                                description="Deploy at least three STS agents in on-premises VMs with low-latency access to the source filesystem."
                                icon={<DnsIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#fbe9e7', borderTop: '4px solid #d84315' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#bf360c', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Visibility
                            </Typography>
                            <PhaseStep
                                number={7}
                                title="Transfer Job Execution"
                                description="Start the STS transfer job."
                                icon={<PlayArrowIcon />}
                            />
                            <PhaseStep
                                number={8}
                                title="Continuous Operational Monitoring"
                                description="Use Cloud Monitoring dashboards to track throughput, bytes copied, and error rates in real-time."
                                icon={<MonitorHeartIcon />}
                            />
                            <PhaseStep
                                number={9}
                                title="Data Integrity Validation"
                                description="STS automatically performs data integrity checks via checksums."
                                icon={<AssignmentTurnedInIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#fbe9e7', borderTop: '4px solid #d84315' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#bf360c', fontWeight: 'bold', mb: 3 }}>
                                Phase 4: Optimization & Run State
                            </Typography>
                            <PhaseStep
                                number={10}
                                title="Application Cutover"
                                description="Re-point applications to Cloud Storage. Use NetApp/Qumulo for apps requiring file semantics."
                                icon={<AltRouteIcon />}
                            />
                            <PhaseStep
                                number={11}
                                title="FinOps & Decommissioning"
                                description="Track consumption-based STS pricing and safely retire the on-premises source environment to realize TCO reduction."
                                icon={<MonetizationOnIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
