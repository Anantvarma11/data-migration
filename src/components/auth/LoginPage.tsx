import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Link,
    useTheme
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!identifier || !password) {
            setError('Please enter both email/username and password');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await login(identifier, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`, // Matches implementation plan
                p: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    p: 5,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Branding */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    {/* Optional Logo Placeholder */}
                    {/* <img src="/logo.png" alt="Logo" style={{ height: 40, marginBottom: 16 }} /> */}
                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
                        Enterprise Migration Services
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Specialized Cloud Migration Platform
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email or Username"
                        variant="outlined"
                        margin="normal"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        disabled={isSubmitting}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    color="primary"
                                    disabled={isSubmitting}
                                />
                            }
                            label="Remember me"
                        />
                        <Link href="#" variant="body2" underline="hover" onClick={(e) => e.preventDefault()}>
                            Forgot Password?
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ mt: 2, mb: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>

                    {/* Demo Credentials Hint */}
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                        <Typography variant="caption" fontWeight="bold">Demo Credentials:</Typography>
                        <div style={{ marginTop: 4 }}>User: praveen / demo123</div>
                        <div>User: admin / admin123</div>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
