import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Paper,
  Divider,
  Chip,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAuth } from '../../context/AuthContext';
import { Global } from '@emotion/react';
import axios from 'axios';

const CARD_HEIGHT = 300; // Increased for uniformity
const CARD_WIDTH = 360;  // Increased for uniformity
const CARD_COLORS = [
  '#1976d2', // blue
  '#388e3c', // green
  '#fbc02d', // yellow
  '#d32f2f', // red
  '#7b1fa2', // purple
  '#0288d1', // light blue
  '#c2185b', // pink
  '#f57c00', // orange
];

const filterOptions = {
  jobTypes: ['full-time', 'part-time', 'Not specified'],
  experienceLevels: ['senior', 'junior', 'Not specified'],
  workModes: ['remote', 'on-site', 'hybrid', 'Not specified']
};

const getJobTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'full-time': return 'primary';
    case 'part-time': return 'secondary';
    case 'internship': return 'success';
    case 'freelance': return 'warning';
    case 'contract': return 'info';
    default: return 'default';
  }
};

const getExperienceColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'senior': return 'error';
    case 'junior': return 'success';
    case 'not specified': return 'default';
    default: return 'default';
  }
};

const jobsPerPage = 6;

const HEADER_HEIGHT = 64; // Adjust if your header is a different height

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobTypes: [],
    experienceLevels: [],
    workModes: []
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [savedJobIds, setSavedJobIds] = useState([]);

  const { user } = useAuth();

  const jobListRef = React.useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) {
          queryParams.append('title', searchTerm);
          queryParams.append('company', searchTerm);
          queryParams.append('location', searchTerm);
        }
        if (filters.jobTypes.length > 0) queryParams.append('jobType', filters.jobTypes.join(','));
        if (filters.experienceLevels.length > 0) queryParams.append('experienceLevel', filters.experienceLevels.join(','));
        if (filters.workModes.length > 0) queryParams.append('workMode', filters.workModes.join(','));

        const response = await axios.get(`http://localhost:5000/api/jobs?${queryParams.toString()}`);
        const data = response.data;
        console.log('Fetched Jobs:', data);
        
        // Sort the data immediately after fetching
        const sortedData = [...data].sort((a, b) => {
          const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            // Handle 'X days ago' format
            if (dateStr.toLowerCase().includes('days ago')) {
              const daysAgoMatch = dateStr.match(/(\d+)\s*days ago/i);
              if (daysAgoMatch && daysAgoMatch[1]) {
                const days = parseInt(daysAgoMatch[1], 10);
                const date = new Date();
                date.setDate(date.getDate() - days);
                return date;
              }
            }
            // Handle date format (e.g., '2 June 2025')
            const months = {
              'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
              'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
            };
            try {
              const parts = dateStr.split(' ');
              if (parts.length === 3) {
                const [day, month, year] = parts;
                const monthIndex = months[month];
                if (monthIndex !== undefined) {
                  return new Date(parseInt(year), monthIndex, parseInt(day));
                }
              }
            } catch (error) {
              console.error('Error parsing date:', dateStr, error);
            }
            // Return a default invalid date if parsing fails
            return new Date(0);
          };

          const dateA = parseDate(a.postedDate);
          const dateB = parseDate(b.postedDate);
          return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setJobs(sortedData);
        setFilteredJobs(sortedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchTerm, filters, sortBy]);

  useEffect(() => {
    const fetchSavedJobIds = async () => {
      if (!user) {
        setSavedJobIds([]); // Clear saved jobs if user logs out
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/saved-jobs');
        const savedJobsData = response.data;
        const savedIds = savedJobsData.map(job => job.jobId);
        setSavedJobIds(savedIds);
        console.log('Fetched saved job IDs:', savedIds);
      } catch (err) {
        console.error('Error fetching saved job IDs:', err);
      }
    };
 
    fetchSavedJobIds();
  }, [user]);

  useEffect(() => {
    console.log('Jobs:', jobs);
    jobs.forEach(job => console.log('Experience Level:', job.experienceLevel));
    console.log('Filters:', filters);
   
    let filtered = jobs;
   
    if (searchTerm) {
      filtered = filtered.filter(job =>
        (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
   
    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter(job => {
        const jobType = job.jobType ? job.jobType.toLowerCase().replace(/[\s_]/g, '-') : 'not specified';
        return filters.jobTypes.map(filter => filter.toLowerCase().replace(/\s/g, '-')).includes(jobType);
      });
    }
   
    if (filters.experienceLevels.length > 0) {
      filtered = filtered.filter(job => {
        const experienceLevel = job.experienceLevel?.toLowerCase() || 'not specified';
        return filters.experienceLevels.includes(experienceLevel);
      });
    }
   
    if (filters.workModes.length > 0) {
      filtered = filtered.filter(job => {
        const workMode = job.workMode?.toLowerCase() || 'not specified';
        return filters.workModes.includes(workMode);
      });
    }

    console.log('Filtered Jobs:', filtered.map(job => ({
      title: job.title,
      date: job.postedDate
    })));
    setFilteredJobs(filtered);
    setPage(1);
  }, [jobs, searchTerm, filters]); // Removed sortBy from here since sorting is done in fetchJobs

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const arr = prev[category];
      return {
        ...prev,
        [category]: arr.includes(value)
          ? arr.filter(v => v !== value)
          : [...arr, value]
      };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      jobTypes: [],
      experienceLevels: [],
      workModes: []
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    if (jobListRef.current) {
      jobListRef.current.scrollTop = 0;
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSaveJob = async (job) => {
    if (!user) {
      console.log('Please log in to save jobs.');
      return;
    }

    try {
      // Format the job data to match the SavedJob model
      const jobData = {
        jobId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType || 'Not specified',
        experienceLevel: job.experienceLevel || 'Not specified',
        workMode: job.workMode || 'Not specified',
        postedDate: job.postedDate || 'Not specified',
        applicationLink: job.applicationLink || 'Not specified',
        source: job.source || 'Not specified'
      };

      const response = await axios.post('http://localhost:5000/api/saved-jobs/save-job', jobData);
      setSavedJobIds([...savedJobIds, job.id]);
      console.log('Job saved:', job.id);
    } catch (err) {
      console.error('Error saving job:', err);
      if (err.response?.data?.error) {
        console.error('Server error:', err.response.data.error);
      }
    }
  };

  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Global styles={{
        body: { overflow: 'hidden' },
        html: { overflow: 'hidden' }
      }} />
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#fafbfc', width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
        {/* Sidebar Filters */}
        <Box sx={{
          width: 280,
          minWidth: 280,
          maxWidth: 280,
          p: 2,
          background: '#fff',
          borderRight: '1px solid #eee',
          position: 'fixed',
          left: 0,
          top: `${HEADER_HEIGHT}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          zIndex: 1201,
          overflowY: 'auto'
        }}>
          <Paper elevation={0} sx={{ p: 2, background: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <Button size="small" color="inherit" endIcon={<CloseIcon />} onClick={handleClearFilters} sx={{ fontWeight: 600 }}>
                CLEAR
              </Button>
            </Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Sort by Date</InputLabel>
              <Select
                value={sortBy}
                label="Sort by Date"
                onChange={handleSortChange}
                size="small"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Job Type</Typography>
            <FormGroup sx={{ mb: 2 }}>
              {filterOptions.jobTypes.map(type => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox checked={filters.jobTypes.map(filter => filter.toLowerCase().replace(/\s/g, '-')).includes(type.toLowerCase().replace(/\s/g, '-'))} onChange={() => handleFilterChange('jobTypes', type)} />}
                  label={type}
                />
              ))}
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Experience Level</Typography>
            <FormGroup sx={{ mb: 2 }}>
              {filterOptions.experienceLevels.map(level => (
                <FormControlLabel
                  key={level}
                  control={<Checkbox checked={filters.experienceLevels.includes(level)} onChange={() => handleFilterChange('experienceLevels', level)} />}
                  label={level}
                />
              ))}
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Work Mode</Typography>
            <FormGroup>
              {filterOptions.workModes.map(mode => (
                <FormControlLabel
                  key={mode}
                  control={<Checkbox checked={filters.workModes.includes(mode)} onChange={() => handleFilterChange('workModes', mode)} />}
                  label={mode}
                />
              ))}
            </FormGroup>
          </Paper>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flexGrow: 1, 
          pl: '280px', // Match sidebar width
          pr: 3, 
          py: 3, 
          width: 'calc(100vw - 280px)', 
          ml: 0, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}>
          {/* Fixed Search Bar */}
          <Box sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1200,
            background: 'transparent',
            pb: 1,
            width: '100%',
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'none',
            border: 'none',
            px: 0,
            pt: 0,
            borderRadius: 0,
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ 
                background: '#fff', 
                borderRadius: 2, 
                boxShadow: 1,
                maxWidth: 800,
                '& .MuiOutlinedInput-root': {
                  height: 48,
                  fontSize: '1rem'
                },
              }}
            />
          </Box>

          {/* Scrollable Job List */}
          <Box ref={jobListRef} sx={{ flex: 1, overflowY: 'auto', pr: 1, paddingTop: '64px' }}>
            <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
              {paginatedJobs.map((job) => (
                <Grid key={job.id || job._id} sx={{ 
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
                  mb: 3
                }}>
                  <Card
                    sx={{
                      height: CARD_HEIGHT,
                      width: CARD_WIDTH,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#fff',
                      color: '#222',
                      boxShadow: 2,
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      p: 2,
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      {/* Title and Job Type Chip */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ 
                          fontWeight: 700, 
                          color: '#1976d2',
                          pr: 2,
                          flex: 1
                        }}>
                          {job.title}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: 0.5,
                          alignItems: 'flex-end'
                        }}>
                          {user && (
                            <IconButton 
                              size="small" 
                              onClick={() => handleSaveJob(job)}
                              sx={{ p: 0 }}
                            >
                              {savedJobIds.includes(job.id) ? (
                                <BookmarkIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                              ) : (
                                <BookmarkBorderIcon sx={{ fontSize: 20, color: '#888' }} />
                              )}
                            </IconButton>
                          )}
                          {job.source && (
                            <Chip 
                              label={job.source} 
                              color="info" 
                              size="small" 
                              sx={{ 
                                fontWeight: 600,
                                backgroundColor: job.source === 'Indeed' ? '#2557a7' : 
                                              job.source === 'LinkedIn' ? '#0a66c2' : 
                                              job.source === 'RemoteOK' ? '#2d3436' : '#1976d2',
                                height: 20,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontSize: '0.75rem'
                                }
                              }} 
                            />
                          )}
                          {job.jobType && (
                            <Chip 
                              label={job.jobType} 
                              color={getJobTypeColor(job.jobType)} 
                              size="small" 
                              sx={{ 
                                fontWeight: 600,
                                height: 20,
                                '& .MuiChip-label': {
                                  px: 1,
                                  fontSize: '0.75rem'
                                }
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                      {/* Company */}
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <BusinessIcon sx={{ fontSize: 18, color: '#888' }} />
                        <Typography variant="body2" color="textSecondary">{job.company}</Typography>
                      </Stack>
                      {/* Location */}
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 18, color: '#888' }} />
                        <Typography variant="body2" color="textSecondary">{job.location}</Typography>
                      </Stack>
                      {/* Work Mode */}
                      {job.workMode && (
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                          <WorkIcon sx={{ fontSize: 18, color: '#888' }} />
                          <Typography variant="body2" color="textSecondary">{job.workMode}</Typography>
                        </Stack>
                      )}
                      {/* Posted Date and Experience Level */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, color: '#888', mr: 0.5 }} />
                        <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                          {job.postedDate ? `Posted on ${job.postedDate}` : ''}
                        </Typography>
                        {job.experienceLevel && (
                          <Chip
                            label={job.experienceLevel}
                            color="secondary"
                            size="small"
                            sx={{
                              fontWeight: 600,
                              background: '#e91e63',
                              color: '#fff',
                              ml: 1,
                              height: 22
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <Box sx={{ px: 0, pb: 0, pt: 0, mt: 'auto', display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 600, px: 1.5, py: 0.5, fontSize: '1rem', flex: 1, boxShadow: 0 }}
                        onClick={() => window.open(job.applicationLink, '_blank')}
                        startIcon={<WorkIcon />}
                      >
                        APPLY NOW
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {pageCount > 1 && (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default JobList;