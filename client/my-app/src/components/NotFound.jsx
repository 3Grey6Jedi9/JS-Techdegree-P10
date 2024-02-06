import React from 'react';
import Dog from "../assets/notfound.jpeg";


// NotFound component
function NotFound() {
  return (
      <div>
      <img src={Dog} className="" alt="notfound" />
    <div className="error">
      <h1>404 - Not Found</h1>
      <p>The requested page can't be found.</p>
    </div>
          </div>
  );
}

export default NotFound




