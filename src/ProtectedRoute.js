import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
  const [cookies] = useCookies(['patientId']); // Check for the presence of the cookie

  return cookies.patientId ? ( // If the cookie exists
    <Route {...rest} element={element} />
  ) : ( // If the cookie doesn't exist, redirect to the login page
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
