import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, CardContent, IconButton, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
// Assuming JobCard component is available for reuse
// import JobCard from './JobCard'; 

const SavedJobsList = () => {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) {
        setLoading(false);
        setError('Please log in to view saved jobs.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/saved-jobs');
        setSavedJobs(response.data);
        console.log('Fetched saved jobs:', response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
        setError('Failed to fetch saved jobs.');
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [user]);

  const handleRemoveJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/saved-jobs/${jobId}`);
      setSavedJobs(savedJobs.filter(job => job.jobId !== jobId));
    } catch (err) {
      console.error('Error removing saved job:', err);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;
  }

  if (savedJobs.length === 0) {
    return <Typography align="center" sx={{ mt: 4 }}>No saved jobs yet.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Saved Jobs</Typography>
      <Grid container spacing={3}>
        {savedJobs.map((job) => (
          <Grid item key={job.jobId} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    {job.title}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleRemoveJob(job.jobId)}
                    sx={{ color: '#1976d2' }}
                  >
                    <BookmarkIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BusinessIcon sx={{ mr: 1, color: '#666', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.company}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: '#666', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon sx={{ mr: 1, color: '#666', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.jobType}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                  Posted: {job.postedDate}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  startIcon={<OpenInNewIcon />}
                  onClick={() => window.open(job.applicationLink, '_blank')}
                  sx={{ 
                    mt: 'auto',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 2
                    }
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SavedJobsList; 