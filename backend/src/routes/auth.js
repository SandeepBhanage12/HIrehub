const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        details: {
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists',
        details: 'A user with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();
    console.log('User created successfully:', user);

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-super-secret-key-here',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        message: 'Validation failed',
        details: errors
      });
    }

    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        details: {
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid credentials',
        details: 'No user found with this email'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid credentials',
        details: 'Incorrect password'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-super-secret-key-here',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in',
      error: error.message 
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
});

// Logout route
router.post('/logout', auth, async (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      message: 'Error logging out',
      error: error.message 
    });
  }
});

module.exports = router; 