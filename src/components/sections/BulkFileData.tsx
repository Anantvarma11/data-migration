import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Container, Chip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloudIcon from '@mui/icons-material/Cloud';
import SpeedIcon from '@mui/icons-material/Speed';
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

const FeatureCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ color: 'primary.main', mb: 2 }}>{icon}</Box>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{value}</Typography>
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

            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Strategy"
                        value="Rehost / Retain Strategy"
                        icon={<FolderIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Decision"
                        value="Online vs Offline Transfer"
                        icon={<CloudUploadIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Throughput"
                        value="1.5× Benchmark (Fio)"
                        icon={<SpeedIcon fontSize="large" />}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FeatureCard
                        title="Resilience"
                        value="STS Minimum 3 Agents"
                        icon={<CloudIcon fontSize="large" />}
                    />
                </Grid>
            </Grid>

            {/* Diagram Section */}
            <Typography variant="h5" gutterBottom>
                Architecture & Data Flow
            </Typography>
            <Paper variant="outlined" sx={{ p: 4, bgcolor: '#f8f9fa', mb: 6 }}>
                <Container maxWidth="md">
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                        <Chip label="Dedicated Interconnect" variant="outlined" />
                        <Chip label="VPC Service Controls" variant="outlined" />
                        <Chip label="Cloud Monitoring" variant="outlined" />
                    </Box>
                </Container>
            </Paper>

            <Typography variant="h5" gutterBottom>
                Tools Implemented
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Card sx={{ p: 2 }}>Storage Transfer Service (STS)</Card>
                <Card sx={{ p: 2 }}>Transfer Appliance (TA)</Card>
                <Card sx={{ p: 2 }}>NetApp Volumes / Cloud Native Qumulo</Card>
            </Box>

            {/* NEW: Four-Phase Process Section */}
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
