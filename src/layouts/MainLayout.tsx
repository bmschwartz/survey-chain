import { Box } from '@mui/material';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', py: 2 }}>
        <Box sx={{ width: '100%', maxWidth: '1200px', px: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
