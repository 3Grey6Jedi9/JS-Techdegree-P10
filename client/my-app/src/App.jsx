import React from 'react';
import logo from './assets/logo.svg';
import './styles/App.css';
import AppRoutes from './Routes';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import '../../../styles/global.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider> {/* Wrap your app with AuthProvider */}
          <AppRoutes />
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;






