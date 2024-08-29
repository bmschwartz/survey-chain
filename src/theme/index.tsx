import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#000000', // Dark color for headers
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // Avoid all-caps for buttons for a modern look
      color: '#ffffff', // Default button text color (for contained buttons)
    },
    body1: {
      color: '#000000', // Set default text color to black
    },
  },
  palette: {
    mode: 'light', // Light mode for a light background
    primary: {
      main: '#000000', // Primary color as black (for buttons and other elements)
    },
    secondary: {
      main: '#555555', // Dark gray for secondary actions
    },
    background: {
      default: '#f7fafc', // Very light gray/blue background for the overall page
      paper: '#ffffff', // White background for cards and paper elements
    },
    text: {
      primary: '#000000', // Black text color
      secondary: '#333333', // Dark gray for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          padding: '8px 16px', // Consistent padding
          '&.MuiButton-contained': {
            backgroundColor: '#000000', // Black background for contained buttons
            color: '#ffffff', // White text color
            '&:hover': {
              backgroundColor: '#333333', // Slightly lighter shade of black on hover
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Consistent rounded corners on paper elements
          backgroundColor: '#ffffff', // White background for paper elements (cards)
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem', // Consistent spacing between form elements
          '& .MuiInputBase-input': {
            color: '#000000', // Black text color for text fields
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000', // Black border for text fields
            },
            '&:hover fieldset': {
              borderColor: '#333333', // Darker border on hover
            },
          },
          '& .MuiInputLabel-root': {
            color: '#000000', // Black label text color
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: '20px 0', // Add some padding to the stepper
          backgroundColor: 'transparent', // Transparent background to blend with the light theme
          '& .MuiStepIcon-root': {
            color: '#000000', // Black step icons
          },
          '& .MuiStepLabel-label': {
            color: '#000000', // Black label text
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: '#000000', // Black color for h4 headers
        },
        body1: {
          color: '#000000', // Black body text
        },
      },
    },
  },
});

export default theme;
