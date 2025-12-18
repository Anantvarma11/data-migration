import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Google Cloud Blue
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    // Custom accent colors if needed in SxProps
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 600,
      color: '#1565c0', // Darker blue for headers
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Enterprise style often prefers no all-caps
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.08), 0px 1px 10px 0px rgba(0,0,0,0.06)', // Elevation 1 equivalent
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)', // Elevation 3 equivalent
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.12)',
            },
          },
        },
      },
    },
  },
});
