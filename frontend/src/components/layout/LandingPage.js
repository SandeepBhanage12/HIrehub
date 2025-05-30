import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Icon,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  color: '#fff',
  padding: theme.spacing(12, 0),
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: theme.shape.borderRadius,
}));

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Search thousands of jobs from multiple platforms in one place. Advanced filtering and real-time updates to help you find the perfect match.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" size="large" component={RouterLink} to="/jobs" sx={{ bgcolor: '#fff', color: '#4158D0', '&:hover': { bgcolor: '#eee' } }}>
              <SearchIcon sx={{ mr: 1 }} /> Start Job Search
            </Button>
            {/* Assuming the second button might be for something else or future use - keeping it as a placeholder */}
            {/* <Button variant="outlined" size="large" sx={{ color: '#fff', borderColor: '#fff' }}>Learn More</Button> */}
          </Box>
        </Container>
      </HeroSection>

      {/* Why Choose Section */}
      <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
            Why Choose HireHub?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#4158D0', mb: 2 }}><SearchIcon /></Icon>
                <Typography variant="h6" gutterBottom>Smart Search</Typography>
                <Typography variant="body2" color="text.secondary">Advanced search across multiple job platforms with intelligent matching.</Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#C850C0', mb: 2 }}><FilterListIcon /></Icon>
                <Typography variant="h6" gutterBottom>Advanced Filters</Typography>
                <Typography variant="body2" color="text.secondary">Filter by location, salary, company, experience level, and more.</Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#FFCC70', mb: 2 }}><TrendingUpIcon /></Icon>
                <Typography variant="h6" gutterBottom>Real-Time Updates</Typography>
                <Typography variant="body2" color="text.secondary">Get the latest job postings as soon as they're published.</Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#FF5733', mb: 2 }}><BookmarkIcon /></Icon>
                <Typography variant="h6" gutterBottom>Save & Track</Typography>
                <Typography variant="body2" color="text.secondary">Save favorite jobs and track your application progress.</Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Ready to Find Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Find Your Next Opportunity?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of job seekers who trust HireHub to find their perfect match.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to="/jobs" sx={{ bgcolor: '#4158D0', color: '#fff', py: 1.5, px: 4, fontSize: '1.1rem' }}>
            Explore Jobs Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 