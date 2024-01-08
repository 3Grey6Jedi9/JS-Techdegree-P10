import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the authentication context

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth(); // Access the user object from the authentication context

  // Render the protected component if the user is authenticated; otherwise, redirect to the signin route
  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/signin" />}
    />
  );
}

export default PrivateRoute;


