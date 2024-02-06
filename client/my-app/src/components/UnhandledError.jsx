import React from 'react';
import BrokenClock from '../assets/500error.jpeg'



// UnhandledError component
function UnhandledError() {
  return (
      <div>
      <img src={BrokenClock} className="" alt="500error" />
    <div className="error">
      <h1>500 - Unexpected Error</h1>
      <p>An unexpected error has occurred. Please try again later.</p>
    </div>
      </div>
  );
}


export default UnhandledError


