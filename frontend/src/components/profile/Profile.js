// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import { useAuth } from '../../context/AuthContext';

// const Profile = () => {
//   const { user, updatePassword } = useAuth();
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (newPassword !== confirmPassword) {
//       setError('New passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     try {
//       await updatePassword(currentPassword, newPassword);
//       setSuccess('Password updated successfully');
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//       setOpenSnackbar(true);
//     } catch (err) {
//       setError(err.message || 'Failed to update password');
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
//           Profile
//         </Typography>
//         <Divider sx={{ mb: 3 }} />

//         {/* User Details */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom sx={{ color: '#666' }}>
//               Personal Information
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">Name</Typography>
//             <Typography variant="body1">{user?.name || 'Not specified'}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">Email</Typography>
//             <Typography variant="body1">{user?.email || 'Not specified'}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">Role</Typography>
//             <Typography variant="body1">{user?.role || 'Not specified'}</Typography>
//           </Grid>
//         </Grid>

//         {/* Password Update Form */}
//         <Box component="form" onSubmit={handlePasswordUpdate}>
//           <Typography variant="h6" gutterBottom sx={{ color: '#666', mt: 4 }}>
//             Update Password
//           </Typography>
//           <Divider sx={{ mb: 3 }} />

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Current Password"
//                 type="password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="New Password"
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Confirm New Password"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 sx={{ mt: 2 }}
//               >
//                 Update Password
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           {success}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Profile; 