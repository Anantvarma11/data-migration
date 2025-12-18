import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, Box
} from '@mui/material';

interface CreateMigrationDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    strategyTitle: string;
}

export const CreateMigrationDialog: React.FC<CreateMigrationDialogProps> = ({
    open, onClose, onSubmit, strategyTitle
}) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name.trim());
            setName('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Start New Migration</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Strategy
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        {strategyTitle}
                    </Typography>
                </Box>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Migration Name (e.g. 'Production CRM DB')"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={!name.trim()}>
                    Create & Start
                </Button>
            </DialogActions>
        </Dialog>
    );
};
