import React, { createContext, useContext, useState } from 'react';

// Create an AuthContext
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Create an AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    // Implement sign-in logic and set the user state
    setUser(userData);
  };

  const signUp = (userData) => {
    // Implement sign-up logic and set the user state
    setUser(userData);
  };

  const signOut = () => {
    // Implement sign-out logic and clear the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

