const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
//const scrapeJobs = require('./data/scraper'); // scraper function
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
   // await scrapeJobs();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer(); 

const API_URL = 'http://localhost:5000/api'; 
