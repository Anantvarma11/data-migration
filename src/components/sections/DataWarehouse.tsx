import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WavesIcon from '@mui/icons-material/Waves';
import DomainIcon from '@mui/icons-material/Domain';
import TransformIcon from '@mui/icons-material/Transform';
import PolicyIcon from '@mui/icons-material/Policy';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SavingsIcon from '@mui/icons-material/Savings';
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
            <Box sx={{ mr: 1, mt: 0.5, color: '#6a1b9a' }}> {/* Deep Purple for DW */}
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

export const DataWarehouse: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#1565c0', mb: 4 }}>
                The Autonomous Modernization Strategy
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Strategy Overview
                    </Typography>
                    <Paper sx={{ p: 2 }}>
                        <List>
                            <StrategyPoint text="Replatform/Rebuild legacy DW to BigQuery" />
                            <StrategyPoint text="Shift from ETL → ELT" />
                            <StrategyPoint text="Gemini-based SQL translation" />
                            <StrategyPoint text="End-to-End Verifiable Integrity mandate" />
                        </List>
                    </Paper>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Google-Native Tools
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                            <Chip label="BigQuery Migration Services" color="primary" />
                            <Chip label="BigQuery DTS" color="primary" />
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Open Source
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label="Data Validation Tool" color="secondary" />
                            <Chip label="BigQuery Permission Mapper" color="secondary" />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Layered Architecture
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <LayerBox number={1} title="On-Prem DW" content={['Teradata / Legacy']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={2} title="Ingestion Layer" content={['BigQuery DTS', 'BigQuery Migration Services']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={3} title="Storage & Analysis" content={['Cloud Storage', 'BigQuery']} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}><ArrowDownwardIcon color="action" /></Box>

                            <LayerBox number={4} title="Consumption" content={['Looker', 'BI Tools']} />
                        </Box>

                        {/* Side Labels */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Paper sx={{ p: 1, bgcolor: '#e3f2fd', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Governance & Visibility</Typography>
                            </Paper>
                            <Paper sx={{ p: 1, bgcolor: '#e3f2fd', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Cloud Monitoring</Typography>
                            </Paper>
                            <Paper sx={{ p: 1, bgcolor: '#e3f2fd', width: 140, textAlign: 'center' }}>
                                <Typography variant="caption" fontWeight="bold">Data Validation Tool</Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* NEW: Four-Phase Process Section */}
            <Box sx={{ mt: 8, mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#4a148c', mb: 4, textAlign: 'center', fontWeight: 600 }}> {/* Purple Title */}
                    The Four-Phase Process for Data Warehouse Modernization
                </Typography>
                <Grid container spacing={4}>
                    {/* Phase 1 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#f3e5f5', borderTop: '4px solid #7b1fa2' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold', mb: 3 }}>
                                Phase 1: Discovery & Planning
                            </Typography>
                            <PhaseStep
                                number={1}
                                title="Portfolio Discovery & TCO"
                                description="Use Migration Center to discover the DW ecosystem, map dependencies, and generate a TCO report."
                                icon={<AssessmentIcon />}
                            />
                            <PhaseStep
                                number={2}
                                title="Migration Wave Definition"
                                description="Group workloads, prioritizing low-dependency endpoints first. Mandate a rollback strategy for each step."
                                icon={<WavesIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 2 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#f3e5f5', borderTop: '4px solid #7b1fa2' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold', mb: 3 }}>
                                Phase 2: Conversion & Foundation Setup
                            </Typography>
                            <PhaseStep
                                number={3}
                                title="Foundation Build (IaC)"
                                description="Deploy the GCP Landing Zone and BigQuery Security Blueprint using Terraform."
                                icon={<DomainIcon />}
                            />
                            <PhaseStep
                                number={4}
                                title="SQL & Script Conversion"
                                description="Feed legacy SQL scripts into the BigQuery Batch SQL Translator with Gemini-enhanced customization."
                                icon={<TransformIcon />}
                            />
                            <PhaseStep
                                number={5}
                                title="Access Governance Translation"
                                description="Use the BigQuery Permission Mapper to generate Terraform/JSON scripts for replicating permissions."
                                icon={<PolicyIcon />}
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 3 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#f3e5f5', borderTop: '4px solid #7b1fa2' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold', mb: 3 }}>
                                Phase 3: Execution & Validation
                            </Typography>
                            <PhaseStep
                                number={6}
                                title="Data Load (Bulk)"
                                description="Use BigQuery DTS with the appropriate connector for high-speed table and schema transfer."
                                icon={<CloudDownloadIcon />}
                            />
                            <PhaseStep
                                number={7}
                                title="Post-Migration Validation (CRITICAL)"
                                description="MANDATORY STEP: Run the open-source Data Validation Tool to confirm 1-to-1 data parity before cutover."
                                icon={<FactCheckIcon />}
                            />
                            <PhaseStep
                                number={8}
                                title="Application Cutover"
                                description="Re-point BI dashboards and downstream apps to BigQuery using a gradual rollout."
                                icon={<AltRouteIcon />} // Split/Diverge icon
                            />
                        </Paper>
                    </Grid>

                    {/* Phase 4 */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: '#f3e5f5', borderTop: '4px solid #7b1fa2' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold', mb: 3 }}>
                                Phase 4: Optimization & Run State
                            </Typography>
                            <PhaseStep
                                number={9}
                                title="Unified Observability Handover"
                                description="Integrate BigQuery into Cloud Monitoring and Logging for performance and audit tracking."
                                icon={<MonitorHeartIcon />}
                            />
                            <PhaseStep
                                number={10}
                                title="FinOps Governance"
                                description="Use the FinOps Hub to monitor cost trends and apply optimization recommendations."
                                icon={<SavingsIcon />}
                            />
                            <PhaseStep
                                number={11}
                                title="Final Decommissioning"
                                description="Retire the legacy DW infrastructure after a predetermined stabilization period."
                                icon={<DeleteForeverIcon />}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
