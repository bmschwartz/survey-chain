import { Button } from '@mui/material';

interface HeaderButtonProps {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ onClick, startIcon, children, endIcon }) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        color: '#000000', // Black text color
        fontSize: '1.2rem',
        marginLeft: '20px',
        borderRadius: '8px',
        padding: '8px 16px',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#ffffff', // White background
        '&:hover': {
          color: '#000000', // Keep black text color on hover
          backgroundColor: '#e0e0e0', // Light gray hover background
          textDecoration: 'none',
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default HeaderButton;
