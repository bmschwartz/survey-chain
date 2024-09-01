import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';

import SignInContainer from '@/components/sign-in/SignInContainer';

const SignInView: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box mt={3}>
          <SignInContainer />
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInView;
