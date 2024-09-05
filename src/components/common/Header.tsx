import { ArrowDropDown as ArrowDropDownIcon, Login as LoginIcon } from '@mui/icons-material';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import HeaderButton from './HeaderButton';

const Header: React.FC = () => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleUserMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    handleUserMenuClose();
    router.push(path);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        background: '#ffffff',
        color: '#000000',
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
              color: '#000000',
              fontFamily: 'Poppins, sans-serif',
            }}
            onClick={() => handleNavigation('/home')}
          >
            SurveyChain
          </Typography>
          <HeaderButton isActive={isActive('/home')} onClick={() => handleNavigation('/home')}>
            Home
          </HeaderButton>
          <HeaderButton isActive={isActive('/surveys/list')} onClick={() => handleNavigation('/surveys/list')}>
            Explore
          </HeaderButton>
          <HeaderButton
            isActive={isActive('/surveys/my-surveys')}
            onClick={() => handleNavigation('/surveys/my-surveys')}
          >
            My Surveys
          </HeaderButton>
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
                    backgroundColor: '#f5f5f5',
                    color: '#000000',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    minWidth: '150px',
                    mt: 1,
                  },
                },
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    color: '#000000',
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
