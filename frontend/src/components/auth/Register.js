// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Alert,
//   Link,
//   Grid,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import { useAuth } from '../../context/AuthContext';

// const Register = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.firstName) {
//       errors.firstName = 'First name is required';
//     }
//     if (!formData.lastName) {
//       errors.lastName = 'Last name is required';
//     }
//     if (!formData.email) {
//       errors.email = 'Email address is required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
//       errors.email = 'Invalid email address';
//     }
//     if (!formData.password) {
//       errors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
//     if (!formData.confirmPassword) {
//       errors.confirmPassword = 'Please confirm your new password';
//     } else if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setError('');
//       setLoading(true);

//       try {
//         const { success, error } = await register({
//           name: `${formData.firstName} ${formData.lastName}`,
//           email: formData.email,
//           password: formData.password,
//         });

//         if (success) {
//           navigate('/login', { 
//             state: { 
//               message: 'Registration successful! Please login to continue.' 
//             }
//           });
//         } else {
//           setError(error || 'Registration failed');
//         }
//       } catch (err) {
//         setError('An error occurred during registration');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       width: '100vw',
//       bgcolor: '#f9f9f9',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       py: 6
//     }}>
//       <Paper elevation={3} sx={{
//         maxWidth: 400,
//         width: '100%',
//         borderRadius: 2,
//         p: { xs: 3, sm: 4 },
//         textAlign: 'center',
//       }}>
//         <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
//           Create your account
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//           Join HireHub and start your job search
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>First name</Typography>
//               <TextField
//                 required
//                 fullWidth
//                 id="firstName"
//                 name="firstName"
//                 autoComplete="given-name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First name"
//                 size="small"
//                 error={!!validationErrors.firstName}
//                 helperText={validationErrors.firstName}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Last name</Typography>
//               <TextField
//                 required
//                 fullWidth
//                 id="lastName"
//                 name="lastName"
//                 autoComplete="family-name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last name"
//                 size="small"
//                 error={!!validationErrors.lastName}
//                 helperText={validationErrors.lastName}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Email address</Typography>
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 name="email"
//                 autoComplete="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 size="small"
//                 error={!!validationErrors.email}
//                 helperText={validationErrors.email}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Password</Typography>
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="new-password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 size="small"
//                 error={!!validationErrors.password}
//                 helperText={validationErrors.password}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Confirm password</Typography>
//               <TextField
//                 required
//                 fullWidth
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type="password"
//                 id="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm your password"
//                 size="small"
//                 error={!!validationErrors.confirmPassword}
//                 helperText={validationErrors.confirmPassword}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox required size="small" />}
//                 label={
//                   <Typography variant="body2" sx={{ '& a': { textDecoration: 'none', fontWeight: 600 } }}>
//                     I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
//                   </Typography>
//                 }
//               />
//             </Grid>
//           </Grid>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               mb: 2,
//               py: 1,
//               bgcolor: '#222',
//               '&:hover': { bgcolor: '#444' },
//               textTransform: 'none',
//               fontSize: '1.1rem',
//               fontWeight: 600,
//             }}
//             disabled={loading}
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </Button>

//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Typography variant="body2">
//               Already have an account? <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Register; 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      errors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      setLoading(true);

      try {
        const { success, error } = await register({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        });

        if (success) {
          navigate('/login', {
            state: {
              message: 'Registration successful! Please login to continue.'
            }
          });
        } else {
          setError(error || 'Registration failed');
        }
      } catch (err) {
        setError('An error occurred during registration');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'url(/login.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgcolor: '#f9f9f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '0px',
      py: 6
    }}>
      <Paper elevation={3} sx={{
        maxWidth: 450,
        width: '100%',
        borderRadius: 2,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        color: '#000',
        p: { xs: 3, sm: 4 },
        textAlign: 'center',
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          Create your account
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join HireHub and start your job search
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                sx={{ width: '180%' }}
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                size="small"
                error={!!validationErrors.firstName}
                helperText={validationErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                sx={{ width: '180%' }}
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                size="small"
                error={!!validationErrors.lastName}
                helperText={validationErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                sx={{ width: '180%' }}
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
                error={!!validationErrors.email}
                helperText={validationErrors.email}
              />
            </Grid>
            <Grid item xs={12}> 
              <TextField
                required
                fullWidth
                sx={{ width: '180%' }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                size="small"
                error={!!validationErrors.password}
                helperText={validationErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                sx={{ width: '180%' }}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                size="small"
                error={!!validationErrors.confirmPassword}
                helperText={validationErrors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required size="small" />}
                label={
                  <Typography variant="body2" sx={{ '& a': { textDecoration: 'none', fontWeight: 600 } }}>
                    I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ textDecoration: 'none', fontWeight: 600 }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
