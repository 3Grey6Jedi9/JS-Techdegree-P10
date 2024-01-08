import React from 'react';
import logo from './assets/logo.svg';
import './styles/App.css';
import AppRoutes from './Routes';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AuthProvider> {/* Wrap your app with AuthProvider */}
          <AppRoutes />
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;




