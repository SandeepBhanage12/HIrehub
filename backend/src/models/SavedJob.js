const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    workMode: {
        type: String,
        required: true
    },
    postedDate: {
        type: String,
        required: true
    },
    applicationLink: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create a compound index to ensure a user can't save the same job twice
savedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob; 