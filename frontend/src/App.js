import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import JobList from './components/jobs/JobList';
import Profile from './components/auth/Profile';
import Header from './components/layout/Header';
import LandingPage from './components/layout/LandingPage';
import ForgotPasswordRequest from './components/auth/ForgotPasswordRequest';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      {user ? <Header /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/jobs" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/jobs" />} />
        <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobList />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
