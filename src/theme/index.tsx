import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#0D1B2A',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      color: '#ffffff',
    },
    body1: {
      color: '#1B263B',
    },
    body2: {
      color: '#3E4C59',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#0D3B66',
    },
    secondary: {
      main: '#555555',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0D1B2A',
      secondary: '#333333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&.MuiButton-contained': {
            backgroundColor: '#0D3B66',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1B8ED1',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: '#0D3B66',
            color: '#0D3B66',
            '&:hover': {
              backgroundColor: 'rgba(13, 59, 102, 0.1)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: '#0D1B2A',
        },
        body1: {
          color: '#1B263B',
        },
      },
    },
  },
});

export default theme;
