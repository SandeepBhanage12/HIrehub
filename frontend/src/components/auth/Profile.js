import React from 'react';
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

function ProfilePage() {
  return (
    <Container maxWidth="md">
      <Box
        component={Paper}
        sx={{
          mt: 8,
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
        >
          Profile
        </Typography>
        <Divider sx={{ mb: 5, opacity: 0.7 }} />

        {/* Personal Information */}
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: 'text.primary',
            fontWeight: 700,
            borderBottom: '3px solid',
            borderColor: 'primary.main',
            pb: 1,
            width: 'fit-content',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -3,
              left: 0,
              width: '50%',
              height: '3px',
              background: 'linear-gradient(90deg, #1976d2, transparent)',
            },
          }}
        >
          Personal Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid xs={12}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.default',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                },
                mb: 3,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Name
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                sandeep
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.default',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                },
                mb: 3,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                s@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.default',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Role
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Not specified
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Update Password */}
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: 'text.primary',
            fontWeight: 700,
            borderBottom: '3px solid',
            borderColor: 'primary.main',
            pb: 1,
            width: 'fit-content',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -3,
              left: 0,
              width: '50%',
              height: '3px',
              background: 'linear-gradient(90deg, #1976d2, transparent)',
            },
          }}
        >
          Update Password
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid xs={12}>
            <TextField
              label="Current Password *"
              type="password"
              fullWidth
              required
              sx={{
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
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="New Password *"
              type="password"
              fullWidth
              required
              sx={{
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
              }}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="Confirm New Password *"
              type="password"
              fullWidth
              required
              sx={{
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
              }}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
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
            }}
          >
            Update Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfilePage;
