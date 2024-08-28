import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // Avoid all-caps for buttons for a modern look
    },
    body1: {
      color: '#000000', // Set default text color to black
    },
  },
  palette: {
    mode: 'light', // Default to light mode; can toggle to 'dark'
    primary: {
      main: '#0d47a1', // A nice deep blue for primary actions
    },
    secondary: {
      main: '#ff7043', // Accent color for secondary actions
    },
    background: {
      default: '#f4f6f8', // Light gray background for a modern look
      paper: '#ffffff', // White background for cards and paper elements
    },
    text: {
      primary: '#000000',
      secondary: '#555555', // Softer black for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          padding: '8px 16px', // Consistent padding
          '&:hover': {
            backgroundColor: '#1565c0', // Darker shade on hover for primary buttons
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Consistent rounded corners on paper elements
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem', // Consistent spacing between form elements
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: '20px 0', // Add some padding to the stepper
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: '#0d47a1', // Use primary color for h4 headers
        },
      },
    },
  },
});

export default theme;
