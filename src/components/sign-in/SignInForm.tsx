import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signInSchema } from '@/validators/zod';

type SignInFormData = {
  email: string;
  password: string;
  displayName: string;
};

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      router.push('/home');
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
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
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
            Sign In
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default SignInForm;
