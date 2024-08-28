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
        color: '#000000',
        fontSize: '1.2rem',
        marginLeft: '20px',
        borderRadius: '8px',
        padding: '8px 16px',
        fontFamily: 'Poppins, sans-serif',
        '&:hover': {
          color: '#0d47a1',
          backgroundColor: '#e3f2fd',
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
