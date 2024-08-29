import { ArrowDropDown as ArrowDropDownIcon, Login as LoginIcon } from '@mui/icons-material';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import HeaderButton from './HeaderButton';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: '#ffffff', // White background for the header
        color: '#000000', // Black text color for the header
        padding: '0 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left-aligned title and buttons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#000000', // Black text color for the title
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            }}
            onClick={() => handleNavigation('/home')}
          >
            SurveyChain
          </Typography>

          <HeaderButton onClick={() => handleNavigation('/home')}>Home</HeaderButton>
          <HeaderButton endIcon={<ArrowDropDownIcon />} onClick={handleMenuClick}>
            Surveys
          </HeaderButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: '#f5f5f5', // Light gray background for dropdown
                  color: '#000000', // Black text color for dropdown items
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                  borderRadius: '8px', // Rounded corners for dropdown
                  minWidth: '150px',
                  mt: 1,
                },
              },
            }}
          >
            <MenuItem
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd', // Light blue hover effect
                  color: '#000000', // Black text on hover
                },
              }}
              onClick={() => handleNavigation('/surveys')}
            >
              Explore Surveys
            </MenuItem>
            <MenuItem
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd', // Light blue hover effect
                  color: '#000000', // Black text on hover
                },
              }}
              onClick={() => handleNavigation('/surveys/create')}
            >
              New Survey
            </MenuItem>
            <MenuItem
              sx={{
                '&:hover': {
                  backgroundColor: '#e3f2fd', // Light blue hover effect
                  color: '#000000', // Black text on hover
                },
              }}
              onClick={() => handleNavigation('/surveys/mine')}
            >
              My Surveys
            </MenuItem>
          </Menu>
        </div>

        {/* Right-aligned Sign In button */}
        <HeaderButton startIcon={<LoginIcon />} onClick={() => handleNavigation('/login')}>
          Sign In
        </HeaderButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
