const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        min: Number,
        max: Number,
        currency: String
    },
    applicationLink: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 