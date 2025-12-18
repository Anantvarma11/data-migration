import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    subtle: string;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8', // Google Blue
      light: '#4285f4',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#34a853', // Google Green
    },
    error: {
      main: '#d93025',
    },
    warning: {
      main: '#f9ab00',
    },
    info: {
      main: '#1155cc',
    },
    success: {
      main: '#1e8e3e',
    },
    background: {
      default: '#f8f9fa', // Cool gray background
      paper: '#ffffff',
      subtle: '#f1f3f4',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
    divider: '#dadce0',
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 400, letterSpacing: -0.5 },
    h2: { fontWeight: 400, letterSpacing: -0.5 },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 400, letterSpacing: 0.25 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500, letterSpacing: 0.15 },
    subtitle1: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
    body2: { letterSpacing: 0.2 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f9fa',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#dadce0',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #dadce0',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#1a73e8',
            boxShadow: '0 4px 12px rgba(26,115,232,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #dadce0',
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: 'none',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          padding: '8px 20px',
          '&:hover': {
            boxShadow: '0 1px 2px rgba(60,64,67,0.3)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 1px 3px 1px rgba(60,64,67,0.15)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        filled: {
          border: '1px solid transparent',
        },
        outlined: {
          border: '1px solid #dadce0',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '0 24px 24px 0', // Google style sidebar tabs
          margin: '4px 0',
          paddingLeft: 24,
          '&.Mui-selected': {
            backgroundColor: alpha('#1a73e8', 0.1),
            color: '#1a73e8',
            '&:hover': {
              backgroundColor: alpha('#1a73e8', 0.15),
            },
            '& .MuiListItemIcon-root': {
              color: '#1a73e8',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // White app bar
          color: '#5f6368',
          borderBottom: '1px solid #dadce0',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          backgroundColor: '#ffffff',
        }
      }
    }
  },
});
