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
import HubIcon from '@mui/icons-material/Hub';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  color: '#fff',
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  textAlign: 'center',
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
  borderRadius: theme.shape.borderRadius,
  width: 250,
  height: 250,
}));

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom 
          >
            Find Your Dream Job
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
          >
            Search thousands of jobs from multiple platforms in one place. Advanced filtering and real-time updates to help you find the perfect match.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '20px' }}>
            <Button variant="contained" size="large" component={RouterLink} to="/jobs" sx={{ bgcolor: '#4158D0', color: '#fff', '&:hover': { bgcolor: '#354ABD' } }}>
              <SearchIcon sx={{ mr: 1 }} /> Start Job Search
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Why Choose Section */}
      <Box sx={{ py: 4, bgcolor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            align="center" 
          >
            Why Choose JobScraper?
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', pb: 2 }}>
            <Grid item 
              sx={{ flexShrink: 0 }}
            >
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#4158D0', mb: 2 }}><SearchIcon /></Icon>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Smart Search</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Advanced search across multiple job platforms with intelligent matching.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item 
              sx={{ flexShrink: 0 }}
            >
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#C850C0', mb: 2 }}><FilterListIcon /></Icon>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Advanced Filters</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Filter by location, salary, company, experience level, and more.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item 
              sx={{ flexShrink: 0 }}
            >
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#FFCC70', mb: 2 }}><TrendingUpIcon /></Icon>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Real-Time Updates</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Get the latest job postings as soon as they're published.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item 
              sx={{ flexShrink: 0 }}
            >
              <FeatureCard>
                <Icon sx={{ fontSize: 48, color: '#4158D0', mb: 2 }}><HubIcon /></Icon>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Multiple Source Aggregation</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Find jobs from various platforms all in one place.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Ready to Find Section */}
      <Box sx={{ 
        py: 8,
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
          >
            Ready to Find Your Next Opportunity?
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
          >
            Join thousands of job seekers who trust HireHub to find their perfect match.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/jobs"
            sx={{
              bgcolor: '#4158D0',
              color: '#fff',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#354ABD'
              }
            }}
          >
            Explore Jobs Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 