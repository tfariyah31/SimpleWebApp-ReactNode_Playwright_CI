import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for auth token
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  
  // If no token, redirect to login
  if (!token) {
    console.log('No token found - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Token exists, render the protected component
  return children;
};

export default ProtectedRoute;