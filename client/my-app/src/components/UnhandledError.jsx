import React from 'react';
import BrokenClock from '../assets/500error.jpeg'
import '../styles/error.css'




// UnhandledError component
function UnhandledError() {
  return (
      <div className="container500">
    <div className="error">
      <h1 className="h1500">500 - Unexpected Error</h1>
      <img src={BrokenClock} className="" alt="500error" />
      <p className="message500">An unexpected error has occurred. Please try again later.</p>
      <p className="message500">Our most skilled developers are working hard to solve the issue</p>
    </div>
      </div>
  );
}


export default UnhandledError


