import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import HubIcon from '@mui/icons-material/Hub';

const Logo = () => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1,
    cursor: 'pointer'
  }}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      borderRadius: '12px',
      p: 0.5
    }}>
      <WorkIcon sx={{ color: '#fff', fontSize: 28 }} />
    </Box>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.5px'
      }}
    >
      HireHub
    </Typography>
  </Box>
);

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1,
      background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: 'none'
    }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
          <Logo />
        </Box>
        
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
              }}>
                {user.name ? user.name[0].toUpperCase() : <PersonIcon />}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/saved-jobs'); }}>Saved Jobs</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ 
                color: '#fff',
                '&:hover': { color: '#eee' }
              }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/register')}
              sx={{ 
                ml: 1,
                background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
                  opacity: 0.9
                }
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 