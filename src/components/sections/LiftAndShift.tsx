import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Paper } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import VerifiedIcon from '@mui/icons-material/Verified';
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const ProcessStep = ({ title, icon, description }: { title: string, icon: React.ReactNode, description?: string }) => (
    <Paper elevation={3} sx={{ p: 2, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
    </Paper>
);

const Connector = ({ label }: { label?: string }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
        {label && <Typography variant="caption" sx={{ mb: 0.5 }}>{label}</Typography>}
        <ArrowRightIcon fontSize="large" color="action" />
    </Box>
);

const PhaseStep = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ mr: 1, mt: 0.5, color: '#01579b' }}> {/* Dark Blue for Lift & Shift */}
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

export const LiftAndShift: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The Rapid Infrastructure Exit Strategy
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Objective</Typography>
                            <Typography variant="body1">Speed-first rehost using Migrate for Virtual Machines (M4VM).</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="secondary">Replication</Typography>
                            <Typography variant="body1">Continuous background replication with minimal performance impact.</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" color="warning.main">Validation</Typography>
                            <Typography variant="body1">Mandatory test-clone validation before cutover.</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Migration Lifecycle
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fff', overflowX: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 600 }}>
                            <ProcessStep title="On-Prem VM" icon={<ComputerIcon fontSize="large" />} />

                            <Connector label="Replication" />

                            <ProcessStep title="Replicated Data" icon={<CloudSyncIcon fontSize="large" />} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                                <Box sx={{ height: 40, borderLeft: '2px dashed #999' }} />
                                <Paper sx={{ p: 1, mt: 1, bgcolor: '#fff3e0', border: '1px solid #ffb74d' }}>
                                    <Typography variant="caption" fontWeight="bold">Test Clone</Typography>
                                </Paper>
                            </Box>

                            <Connector label="Cutover" />

                            <ProcessStep title="Live CE VM" icon={<FlightTakeoffIcon fontSize="large" color="success" />} />
                        </Box>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Core Tools
                        </Typography>
                        <Grid container spacing={2}>
                            {['Migrate to Virtual Machines (M4VM)', 'Migration Center', 'Cloud Operations Suite', 'Terraform (IaC)'].map((tool) => (
                                <Grid key={tool} size={{ xs: 12, sm: 6 }}>
                                    <Button variant="outlined" fullWidth color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                                        {tool}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            {/* NEW: Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#01579b', mb: 4, textAlign: 'center', fontWeight: 600 }}>
                    The Four-Phase Process for Lift-and-Shift VM Migration
                </Typography>
                <Grid container spacing={4}>
                    {/* Phase 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e1f5fe', borderTop: '4px solid #0277bd' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#01579b', fontWeight: 'bold', mb: 3 }}>
                                Phase 1: Discovery & Planning
                            </Typography>
                            <PhaseStep
                                number={1}
                                title="Application Discovery & TCO"
                                description="Use Migration Center to inventory VMs, map dependencies, and identify low-dependency candidates for initial waves."
                                icon={<AssessmentIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Risk Assessment & Rollback Plan (CRITICAL)"
                                description="Develop and test a detailed rollback strategy for each VM to guarantee traffic can be reverted to the on-premises source."
                                icon={<SecurityIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e1f5fe', borderTop: '4px solid #0277bd' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#01579b', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Replication & Testing
                            </Typography>
                            <PhaseStep
                                number={3}
                                title="M4VM Onboarding & Replication"
                                description="Onboard source VMs into the M4VM service to begin continuous background data replication."
                                icon={<CopyAllIcon />}
                            />
                            <PhaseStep
                                number={4}
                                title="Pre-Cutover Test-Clone"
                                description="Create an optional Test-clone from the replicated data. QA teams perform functional and performance testing to validate functionality."
                                icon={<VerifiedIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e1f5fe', borderTop: '4px solid #0277bd' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#01579b', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Cutover
                            </Typography>
                            <PhaseStep
                                number={5}
                                title="Final Cutover Execution"
                                description="Shut down the source VM. M4VM performs a final data replication and launches the live Compute Engine instance."
                                icon={<SwitchCameraIcon />}
                            />
                            <PhaseStep
                                number={6}
                                title="Post-Cutover Validation"
                                description="Immediately validate the new production VM's accessibility and application functionality."
                                icon={<CheckCircleIcon />}
                            />
                            <PhaseStep
                                number={7}
                                title="Rollback Readiness"
                                description="If validation fails, immediately execute the tested rollback strategy."
                                icon={<ReplayIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#e1f5fe', borderTop: '4px solid #0277bd' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#01579b', fontWeight: 'bold', mb: 3 }}>
                                Phase 4: Optimization & Run State
                            </Typography>
                            <PhaseStep
                                number={8}
                                title="Visibility & Operational Handover"
                                description="Integrate the new VM into Cloud Monitoring and Logging."
                                icon={<VisibilityIcon />}
                            />
                            <PhaseStep
                                number={9}
                                title="FinOps and Rightsizing"
                                description="The FinOps team uses monitoring data to perform continuous cost optimization, including right-sizing the VM instance type."
                                icon={<TrendingUpIcon />}
                            />
                            <PhaseStep
                                number={10}
                                title="Decommissioning"
                                description="Define and meet criteria to safely retire the legacy source hardware and VMs to realize TCO reduction."
                                icon={<PowerSettingsNewIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
