import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
} from '@mui/material';
// Removed imports for password visibility icons
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Assuming you'll add a backend API call function for email-based forgot password
// import { requestPasswordReset } from '../../api/auth'; 

const ForgotPasswordRequest = () => {
  const navigate = useNavigate();
  // Reverted state to just email, message, error, loading
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Removed state for steps, security question/answer, new password, password visibility

  // Reverted handleSubmit to the email-based logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Basic email format validation
    if (!email) {
        setError('Email address is required');
        setLoading(false);
        return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setError('Invalid email address format');
        setLoading(false);
        return;
    }

    try {
      // TODO: Replace with your actual backend API call for email-based forgot password request
      const response = await fetch('/api/auth/forgot-password', { // <-- Replace with your backend endpoint URL
        method: 'POST', // <-- Replace with your backend's expected HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // <-- Adjust request body format if needed
      });

      const data = await response.json();

      // TODO: Adjust based on your backend's success/error response structure
      if (response.ok) { // Check if the response status is in the 2xx range
        // Assuming backend sends a success message or flag
        setMessage(data.message || 'If an account with that email exists, a password reset link has been sent to your email address.');
        setError(''); // Clear any previous errors
      } else {
        // Assuming backend sends an error message
        setError(data.error || data.message || 'Failed to send password reset email.');
        setMessage(''); // Clear any previous success messages
      }

    } catch (err) {
      setError('An error occurred while requesting password reset.');
      console.error('Forgot password request error:', err);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Removed handlers for security answer, reset password submit, password visibility
  // Removed renderForm function

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: '#f9f9f9',
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
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          Forgot Password
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Enter your email address below and we'll send you a link to reset your password.
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Reverted back to the simple email form */}      
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Email address</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email-forgot"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            size="small"
            sx={{ mb: 3 }}
            // Basic error highlighting based on error state content
            error={!!error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('required') || error.toLowerCase().includes('format'))}
            helperText={error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('required') || error.toLowerCase().includes('format')) ? error : ''}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
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
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
              Back to Sign In
            </Link>
          </Box>
        </Box>

      </Paper>
    </Box>
  );
};

export default ForgotPasswordRequest; 