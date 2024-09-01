import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import SignUpForm from './SignUpForm';

const SignUpContainer: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <SignUpForm />
      <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
          Already have an account?
        </Typography>
        <Button variant="outlined" color="primary" component={Link} href="/sign-in">
          Sign In Here
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpContainer;
