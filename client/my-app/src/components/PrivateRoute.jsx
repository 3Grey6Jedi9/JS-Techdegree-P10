// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function PrivateRoute() {
  const { user } = useAuth();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;
