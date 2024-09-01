import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import SignInForm from './SignInForm';

const SignInContainer: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <SignInForm />
      <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
          Don&apos;t have an account?
        </Typography>
        <Button variant="outlined" color="primary" component={Link} href="/sign-up">
          Sign Up Here
        </Button>
      </Box>
    </Container>
  );
};

export default SignInContainer;
