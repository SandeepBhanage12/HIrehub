import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';

// Define style objects
const titleStyles = {
  fontWeight: 800,
  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  mb: 3,
  textAlign: 'center',
  letterSpacing: '0.5px',
};

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    transition: 'all 0.2s ease-in-out',
    '&:hover fieldset': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'text.secondary',
  },
  mb: 3,
};

const sectionTitleStyles = {
  fontWeight: 700,
  fontSize: '1.25rem',
  mb: 2,
  color: 'text.primary',
  borderBottom: '3px solid',
  borderColor: 'primary.main',
  pb: 1,
  width: 'fit-content',
  position: 'relative',
  letterSpacing: '0.5px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -3,
    left: 0,
    width: '50%',
    height: '3px',
    background: 'linear-gradient(90deg, #1976d2, transparent)',
  },
};

const infoCardStyles = {
  p: 3,
  borderRadius: 3,
  bgcolor: 'background.default',
  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
  minWidth: 200,
  textAlign: 'center',
  mb: { xs: 2, md: 0 },
};

function ProfilePage() {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prev) => !prev);
    setFeedback({ type: '', message: '' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordUpdate = async () => {
    setFeedback({ type: '', message: '' });
    if (!currentPassword || !newPassword || !confirmPassword) {
      setFeedback({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFeedback({ type: 'success', message: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordFields(false);
    }, 1200);
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 8 } }}>
      <Box
        component={Paper}
        sx={{
          p: { xs: 2, sm: 4, md: 6 },
          borderRadius: 5,
          boxShadow: '0 10px 30px rgba(0,0,0,0.10)',
          bgcolor: 'background.paper',
          maxWidth: 650,
          mx: 'auto',
        }}
      >
        {/* Profile Avatar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 1, bgcolor: 'primary.main', fontSize: 36 }}>S</Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>sandeep</Typography>
          <Typography variant="body2" color="text.secondary">s@gmail.com</Typography>
        </Box>
        <Divider sx={{ mb: 4, opacity: 0.7 }} />

        {/* Personal Information */}
        <Typography sx={sectionTitleStyles}>
          Personal Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Box sx={infoCardStyles}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Name
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                sandeep
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={infoCardStyles}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                s@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={infoCardStyles}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Role
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Not specified
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Update Password Button */}
        <Typography sx={sectionTitleStyles}>
          Update Password
        </Typography>
        <Box textAlign="center" sx={{ mb: 5 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleTogglePasswordFields}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              },
              transition: 'all 0.3s ease-in-out',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 320,
            }}
          >
            {showPasswordFields ? 'Cancel' : 'Update Password'}
          </Button>
        </Box>

        {showPasswordFields && (
          <Box>
            {feedback.message && (
              <Alert severity={feedback.type} sx={{ mb: 2 }}>{feedback.message}</Alert>
            )}
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password *"
                  type="password"
                  fullWidth
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password *"
                  type="password"
                  fullWidth
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password *"
                  type="password"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    },
                    transition: 'all 0.3s ease-in-out',
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: 320,
                  }}
                >
                  {loading ? 'Saving...' : 'Save Password'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ProfilePage;
