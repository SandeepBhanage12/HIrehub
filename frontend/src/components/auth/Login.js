import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, error } = await login(formData.email, formData.password);
      if (success) {
        navigate('/jobs');
      } else {
        setError(error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'url(/login.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6
    }}>
      <Paper elevation={3} sx={{
        maxWidth: 400,
        width: '100%',
        borderRadius: 2,
        p: { xs: 3, sm: 4 },
        textAlign: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        color: '#000',
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to your HireHub account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Email address</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            size="small"
            sx={{ mb: 2 }}
          />
          
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Password</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            size="small"
            sx={{ mb: 1 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Remember me"
              sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
            />
            <Link component="button" variant="body2" onClick={() => navigate('/forgot-password')} sx={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              py: 1,
              bgcolor: '#222',
              '&:hover': { bgcolor: '#444' },
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Don't have an account? <Link component="button" variant="body2" onClick={() => navigate('/register')} sx={{ textDecoration: 'none', fontWeight: 600 }}>Sign up here</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 