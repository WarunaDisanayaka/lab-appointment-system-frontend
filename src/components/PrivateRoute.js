import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = /* Check if user is authenticated */ true;

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
