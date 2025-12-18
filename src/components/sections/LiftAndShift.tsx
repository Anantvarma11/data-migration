import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
            <Box sx={{ mr: 1, mt: 0.5, color: '#01579b' }}> {/* Light Blue for Lift & Shift */}
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
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Paper sx={{ p: 2 }}>
                        <List>
                            <StrategyPoint text="Speed-first rehost using Migrate for Virtual Machines (M4VM)" />
                            <StrategyPoint text="Continuous background replication with minimal performance impact" />
                            <StrategyPoint text="Mandatory test-clone validation before cutover" />
                        </List>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Core Tools
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                            <Chip label="Migrate to Virtual Machines (M4VM)" color="primary" />
                            <Chip label="Migration Center" color="primary" />
                            <Chip label="Terraform (IaC)" color="primary" />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Migration Lifecycle
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LayerBox number={1} title="On-Prem VM" content={['Source VM']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={2} title="Replicated Data" content={['Test Clone', 'Replication']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={3} title="Live CE VM" content={['Compute Engine']} />
                        </Box>

                        {/* Side Labels */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Paper sx={{ p: 1, bgcolor: '#e1f5fe', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Cloud Operations Suite</Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Four-Phase Process Section */}
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
