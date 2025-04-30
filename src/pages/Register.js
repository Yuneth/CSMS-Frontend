import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  CssBaseline,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values);
        alert('Registration successful! Please login.');
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert('Registration failed. Try again.');
      }
    }
  });

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?mechanic,garage")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Create an Account
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Login here
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
