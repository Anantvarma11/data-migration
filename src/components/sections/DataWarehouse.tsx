import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
        </Box>
    );
};
