import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Routes from './Routes'; // Import the Routes component

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch the list of courses from your API
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:5001/api/courses'); // Update the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>List of Courses:</p>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* Include the Routes component to enable routing */}
      <Routes />
    </div>
  );
}

export default App;
