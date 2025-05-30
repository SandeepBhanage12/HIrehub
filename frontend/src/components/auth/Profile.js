import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Container
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: 'primary.main',
            fontSize: '2.5rem',
            margin: '0 auto 2rem'
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {user?.name || 'User'}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {user?.email || 'user@example.com'}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
