import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signUpSchema } from '@/lib/zod';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

const SignUpForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setError(null); // Clear previous errors

    try {
      // Call your signup API here
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (result.ok) {
        // Automatically sign in the user after successful signup
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false, // Prevent auto redirect, handle manually
        });
      } else {
        setError('Failed to sign up. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Display Name"
            type="text"
            fullWidth
            {...register('displayName')}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid2>
        {error && (
          <Grid2 size={{ xs: 12 }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Grid2>
        )}
        <Grid2 size={{ xs: 12 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default SignUpForm;
