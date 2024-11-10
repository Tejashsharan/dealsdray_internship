# Employee Management System

A full-stack web application for managing employee records with image upload functionality.

## Features

- User Authentication (Login/Register)
- Employee Management:
  - Add new employees with image upload
  - View all employees
  - Update employee details
  - Form validation
  - Real-time alerts
- Responsive Design
- Secure API endpoints
- Image upload and storage

## Tech Stack

### Frontend
- React.js
- CSS3
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer for file uploads

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

### 1. Clone the repository
bash
git clone <repository-url>
cd employee-management-system

### 2. Backend Setup
bash
cd backend
npm install

Create a `.env` file in the backend directory with the following variables:
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-management
JWT_SECRET=your_jwt_secret_key

The server will run on http://localhost:5000

### 3. Start Frontend Development Server
bash
cd frontend
npm start

The application will open in your default browser at http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Employee Management
- GET `/api/employee` - Get all employees
- POST `/api/employee` - Add new employee
- PUT `/api/employee/:id` - Update employee
- DELETE `/api/employee/:id` - Delete employee

## Project Structure

├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── server.js
└── frontend/
├── public/
└── src/
├── components/
├── styles/
└── App.js
