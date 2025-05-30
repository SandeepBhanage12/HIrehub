# Job Portal Application

A MERN stack job portal application that allows users to search and apply for jobs.

## Features

- User authentication (login/signup)
- Job search functionality
- Filter jobs by location and job type
- Responsive design with Material-UI
- Secure API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-portal
   JWT_SECRET=your-secret-key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Create a new account or login with existing credentials
3. Browse and search for jobs
4. Apply for jobs by clicking the "Apply Now" button

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Jobs
- GET /api/jobs - Get all jobs with optional filters
- GET /api/jobs/:id - Get a specific job
- POST /api/jobs - Create a new job (requires authentication)
- PATCH /api/jobs/:id - Update a job (requires authentication)
- DELETE /api/jobs/:id - Delete a job (requires authentication)

## Technologies Used

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend library
- Node.js - Runtime environment
- Material-UI - UI component library
- JWT - Authentication
- Axios - HTTP client #   H i r e h u b  
 #   H I r e h u b  
 #   J o b - p o r t a l  
 #   J o b _ P r o t a l  
 