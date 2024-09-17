import { Button } from '@mui/material';

interface HeaderButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ onClick, isActive = false, startIcon, children, endIcon }) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        color: '#0D3B66',
        fontSize: '1.1rem',
        fontWeight: 500,
        marginLeft: '20px',
        padding: '8px 16px',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        borderBottomLeftRadius: isActive ? '0' : '8px',
        borderBottomRightRadius: isActive ? '0' : '8px',
        borderBottom: isActive ? '2px solid #0D3B66' : 'none',
        '&:hover': {
          color: '#1B8ED1',
          backgroundColor: '#f0f4f8',
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
