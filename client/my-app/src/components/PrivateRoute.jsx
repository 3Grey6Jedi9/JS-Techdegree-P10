import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function PrivateRoute() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Wait for the user state to load before rendering the route
  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    // If user state is still loading, return null or a loading indicator
    return null; // You can return a loading indicator here if needed
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default PrivateRoute;
