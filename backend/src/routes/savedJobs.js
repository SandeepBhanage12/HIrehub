const express = require('express');
const router = express.Router();
const SavedJob = require('../models/SavedJob');
const auth = require('../middleware/auth');

// Get all saved jobs for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({ userId: req.user._id });
        res.json(savedJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save a job
router.post('/save-job', auth, async (req, res) => {
    try {
        // Log the incoming request data
        console.log('Received job data:', req.body);
        console.log('User ID:', req.user._id);

        const jobData = {
            userId: req.user._id,
            jobId: req.body.jobId,
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            jobType: req.body.jobType,
            experienceLevel: req.body.experienceLevel,
            workMode: req.body.workMode,
            postedDate: req.body.postedDate,
            applicationLink: req.body.applicationLink,
            source: req.body.source
        };

        // Validate required fields
        const requiredFields = ['jobId', 'title', 'company', 'location', 'jobType', 
                              'experienceLevel', 'workMode', 'postedDate', 'applicationLink', 'source'];
        const missingFields = requiredFields.filter(field => !jobData[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                fields: missingFields 
            });
        }

        const savedJob = new SavedJob(jobData);
        await savedJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error('Error saving job:', error);
        if (error.code === 11000) {
            // Duplicate key error (user already saved this job)
            res.status(400).json({ error: 'Job already saved' });
        } else {
            res.status(400).json({ 
                error: error.message,
                details: error.errors // Include validation errors if any
            });
        }
    }
});

// Remove a saved job
router.delete('/:jobId', auth, async (req, res) => {
    try {
        const savedJob = await SavedJob.findOneAndDelete({
            userId: req.user._id,
            jobId: req.params.jobId
        });

        if (!savedJob) {
            return res.status(404).json({ message: 'Saved job not found' });
        }

        res.json({ message: 'Job removed from saved jobs' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 