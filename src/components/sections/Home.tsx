import React from 'react';
import { Box } from '@mui/material';

export const Home: React.FC = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* First Image: Summary */}
            <Box
                component="img"
                src="/epath-summary-v2.png"
                alt="ePathUSA Summary"
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 2
                }}
            />

            {/* Second Image: Clients/Sectors */}
            <Box
                component="img"
                src="/epath-clients.png"
                alt="ePathUSA Clients and Sectors"
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 2
                }}
            />
        </Box>
    );
};
