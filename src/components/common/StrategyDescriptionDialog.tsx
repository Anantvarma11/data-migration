import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, List, ListItem, ListItemIcon, ListItemText,
    Chip, Divider, Grid
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export interface StrategyContent {
    purpose: string;
    whenToUse: string[];
    flow: string[];
    capabilities: string[];
}

interface StrategyDescriptionDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content: StrategyContent;
    onNavigate?: () => void;
}

export const StrategyDescriptionDialog: React.FC<StrategyDescriptionDialogProps> = ({
    open, onClose, title, content, onNavigate
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 2 }}>
                {title}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
                {/* Purpose */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary.main">Purpose</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {content.purpose}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* When To Use */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            When to Use
                        </Typography>
                        <List dense>
                            {content.whenToUse.map((item, index) => (
                                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <ArrowRightIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Key Capabilities */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Key Capabilities
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {content.capabilities.map((cap, index) => (
                                <Chip key={index} label={cap} size="small" variant="outlined" color="primary" />
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* High Level Flow */}
                <Box>
                    <Typography variant="h6" gutterBottom color="primary.main">High-Level Flow</Typography>
                    <Box sx={{ mt: 2 }}>
                        {content.flow.map((step, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                <Box
                                    sx={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        bgcolor: 'primary.main', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.875rem', fontWeight: 'bold', mr: 2, flexShrink: 0
                                    }}
                                >
                                    {index + 1}
                                </Box>
                                <Typography variant="body1">{step}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} color="inherit">Close</Button>
                {onNavigate && (
                    <Button onClick={onNavigate} variant="outlined" color="primary">
                        Open Strategy Console
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
