const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const jobsData = require('../data/jobs.json');

// Get all jobs with search and filter
router.get('/', async (req, res) => {
    try {
        const { title, location, jobType } = req.query;
        let filteredJobs = [...jobsData];

        if (title) {
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes(title.toLowerCase()) ||
                job.company.toLowerCase().includes(title.toLowerCase())
            );
        }
        if (location) {
            filteredJobs = filteredJobs.filter(job => 
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }
        if (jobType) {
            filteredJobs = filteredJobs.filter(job => job.jobType === jobType);
        }

        res.json(filteredJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single job
router.get('/:id', async (req, res) => {
    try {
        const job = jobsData.find(job => job.id === req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new job (protected route)
router.post('/', auth, async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            postedBy: req.user._id
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a job (protected route)
router.patch('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, postedBy: req.user._id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        Object.keys(req.body).forEach(key => {
            job[key] = req.body[key];
        });

        await job.save();
        res.json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a job (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 