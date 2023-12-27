import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Routes from './Routes';
import axios from 'axios'; // Import Axios

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch the list of courses from your API
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        setCourses(response.data); // Use response.data to set courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>List of Courses:</p>
        <Routes courses={courses} /> {/* Pass the courses data as a prop */}
      </header>
    </div>
  );
}

export default App;
