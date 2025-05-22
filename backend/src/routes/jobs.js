const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');
const jobsData = require('../data/jobs.json');

// Utility to load the latest jobs.json every time
function loadJobsData() {
    const filePath = path.join(__dirname, '../data/jobs.json');
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading jobs.json:', error.message);
        return [];
    }
}

router.get('/', async (req, res) => {
    try {
        const { title, location, jobType, experienceLevel, workMode } = req.query;
        const jobsData = loadJobsData();

        const titleQuery = title?.toLowerCase().trim() || '';
        const locationQuery = location
            ? location.toLowerCase().split(',').map(loc => loc.trim())
            : [];
        const jobTypeQuery = jobType
            ? jobType.toLowerCase().split(',').map(type => type.trim())
            : [];
        const experienceLevelQuery = experienceLevel
            ? experienceLevel.toLowerCase().split(',').map(level => level.trim())
            : [];
        const workModeQuery = workMode
            ? workMode.toLowerCase().split(',').map(mode => mode.trim())
            : [];

        const filteredJobs = jobsData.filter(job => {
            const jobTitle = job.title?.toLowerCase() || '';
            const company = job.company?.toLowerCase() || '';
            const jobLocation = job.location?.toLowerCase() || '';
            const jobTypeField = job.jobType?.toLowerCase() || '';
            const jobExperienceLevel = job.experienceLevel?.toLowerCase() || '';
            const jobWorkMode = job.workMode?.toLowerCase() || '';

            const matchesTitle = titleQuery
                ? jobTitle.includes(titleQuery) || company.includes(titleQuery)
                : true;

            const matchesLocation = locationQuery.length
                ? locationQuery.some(loc => jobLocation.includes(loc))
                : true;

            const matchesJobType = jobTypeQuery.length
                ? jobTypeQuery.includes(jobTypeField)
                : true;

            const matchesExperienceLevel = experienceLevelQuery.length
                ? experienceLevelQuery.includes(jobExperienceLevel)
                : true;

            const matchesWorkMode = workModeQuery.length
                ? workModeQuery.includes(jobWorkMode)
                : true;

            return matchesTitle && matchesLocation && matchesJobType && matchesExperienceLevel && matchesWorkMode;
        });

        res.json(filteredJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
    try {
        const jobsData = loadJobsData();
        const job = jobsData.find(job => job.id === req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new job (protected route, saved to DB)
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
