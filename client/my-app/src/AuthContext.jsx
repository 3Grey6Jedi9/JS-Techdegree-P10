import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

// Create an AuthContext
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Create an AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data is stored in cookies
    const userData = Cookies.get('userData');

    if (userData) {
      // If user data exists in cookies, parse and set the user state
      setUser(JSON.parse(userData));
    }
  }, []);

  const signIn = (userData) => {
    // Implement sign-in logic and set the user state
    setUser(userData);

    // Store user data in cookies when signed in
    Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); // Set an expiration date if needed
  };

  const signOut = () => {
    // Implement sign-out logic and clear the user state
    setUser(null);

    // Remove user data from cookies when signed out
    Cookies.remove('userData');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
