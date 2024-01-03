import React from 'react';
import logo from './assets/logo.svg';
import './styles/App.css';
import AppRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AppRoutes /> {/* Remove the courses prop */}
      </header>
    </div>
  );
}

export default App;
