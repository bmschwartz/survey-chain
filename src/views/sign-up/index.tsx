import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';

import SignUpContainer from '@/components/sign-up/SignUpContainer';

const SignUpView: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box mt={3}>
          <SignUpContainer />
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpView;
