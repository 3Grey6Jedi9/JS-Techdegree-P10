import React from 'react';


// Forbidden component
function Forbidden() {
  return (
    <div className="error">
      <h1>403 - Forbidden</h1>
      <p>You don't have permission to access the requested page.</p>
    </div>
  );
}


export default Forbidden

