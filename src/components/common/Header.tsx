// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ArrowDropDown as ArrowDropDownIcon, Login as LoginIcon } from '@mui/icons-material';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import HeaderButton from './HeaderButton';

const Header: React.FC = () => {
  const [surveyMenuAnchorEl, setSurveyMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSurveyMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSurveyMenuAnchorEl(event.currentTarget);
  };

  const handleSurveyMenuClose = () => {
    setSurveyMenuAnchorEl(null);
  };

  const handleUserMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    handleSurveyMenuClose();
    handleUserMenuClose();
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
          <HeaderButton endIcon={<ArrowDropDownIcon />} onClick={handleSurveyMenuClick}>
            Surveys
          </HeaderButton>
          <Menu
            anchorEl={surveyMenuAnchorEl}
            open={Boolean(surveyMenuAnchorEl)}
            onClose={handleSurveyMenuClose}
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
              onClick={() => handleNavigation('/surveys/list?tab=explore')}
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
              onClick={() => handleNavigation('/surveys/list?tab=my-surveys')}
            >
              My Surveys
            </MenuItem>
          </Menu>
        </div>

        {session?.user ? (
          <>
            <HeaderButton endIcon={<ArrowDropDownIcon />} onClick={handleUserMenuClick}>
              {session.user.displayName || session.user.email}
            </HeaderButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
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
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <HeaderButton startIcon={<LoginIcon />} onClick={() => signIn()}>
            Sign In / Register
          </HeaderButton>
        )}
        {/* </SignedOut> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
