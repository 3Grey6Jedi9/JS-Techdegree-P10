import React from 'react';
import AngryQueen from '../assets/forbidden.jpeg'



// Forbidden component
function Forbidden() {
  return (
        <div>
      <img src={AngryQueen} className="" alt="forbidden" />
    <div className="error">
      <h1>403 - Forbidden</h1>
      <p>You don't have permission to access the requested page.</p>
    </div>
            </div>
  );
}


export default Forbidden

