import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// Assuming you'll add a backend API call function for password reset
// import { resetPassword } from '../../api/auth'; 

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract token from URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      // Handle case where no token is provided (e.g., show error or redirect)
      setError('Password reset token is missing.');
    }
  }, [location]);

  const validateForm = () => {
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return false;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError(''); // Clear previous errors if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!token) {
        setError('Password reset token is missing.');
        return;
    }

    if (validateForm()) {
      setLoading(true);
      try {
        // TODO: Replace with your actual backend API call for password reset
        // const response = await resetPassword(token, newPassword);
        // if (response.success) {
        //   setSuccess('Your password has been reset successfully. You can now log in.');
        //   setNewPassword('');
        //   setConfirmPassword('');
        //   // Optionally redirect to login after a delay
        //   // setTimeout(() => navigate('/login'), 3000);
        // } else {
        //   setError(response.error || 'Failed to reset password.');
        // }

        // --- Mock success for now ---
        console.log(`Password reset for token ${token} with new password`);
        setSuccess('Your password has been reset successfully. You can now log in.');
        setNewPassword('');
        setConfirmPassword('');
        // --- End Mock ---

      } catch (err) {
        setError('An error occurred while resetting password.');
        console.error('Reset password error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
          Reset Password
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Enter your new password below.
        </Typography>

        {!token && error && (
             <Alert severity="error" sx={{ mb: 2 }}>
               {error}
             </Alert>
        )}

        {token && success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
            {/* Optionally add a link or redirect after success */}
             <Box mt={1}>
               <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ fontWeight: 600 }}>
                 Go to Login
               </Link>
             </Box>
          </Alert>
        )}

         {token && error && !success && (
             <Alert severity="error" sx={{ mb: 2 }}>
               {error}
             </Alert>
         )}

        {token && !success && ( // Only show form if token is present and not already successful
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
          {/* New Password */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>New Password</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            id="new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            size="small"
            sx={{ mb: 2 }}
            // Error handling for new password can be added here based on validateForm
             // error={!!error && error.includes('password') && !error.includes('confirm')}
             // helperText={error && error.includes('password') && !error.includes('confirm') ? error : ''}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowNewPassword} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />

          {/* Confirm Password */}
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Confirm Password</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            size="small"
            sx={{ mb: 3 }}
            // Error handling for confirm password
             // error={!!error && error.includes('match')}
             // helperText={error && error.includes('match') ? error : ''}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </Box>
        )}

        <Box sx={{ textAlign: 'center', mt: token ? 0 : 2 }}>
             {!token && (
               <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
                 Back to Sign In
               </Link>
             )}
             {token && success && (
               <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
                 Back to Sign In
               </Link>
             )}
             {token && error && !success && (
                <Link component="button" variant="body2" onClick={() => navigate('/forgot-password')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
                  Try Requesting Again
                </Link>
             )}

           </Box>

      </Paper>
    </Box>
  );
};

export default ResetPassword; 