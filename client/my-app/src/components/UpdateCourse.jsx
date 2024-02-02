import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Courses from './Courses'; // Import the Courses component
import {useAuth} from "../AuthContext.jsx";
import '../styles/update.css'
import '../styles/courses.css'


function UpdateCourse({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {signOut, user} = useAuth();
  const [validationErrors, setValidationErrors] = useState([]);

  // Initialize the state with values from the selected course
  const [updatedCourse, setUpdatedCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });

  useEffect(() => {
    fetchCourseDetail();
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
      if (response.status === 200) {
        const data = response.data;
        setUpdatedCourse(data);
      } else {
        console.error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({
      ...updatedCourse,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/api/courses/${id}`, updatedCourse);
      if (response.status === 204) {
        // Successful update, navigate to the course detail page
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        // Validation errors returned from the API
        setValidationErrors(response.data.errors);
      } else {
        console.error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancel = () => {
    // Redirect the user to the course detail page
    navigate(`/courses/${id}`);
  };

  const handleSignOut = () => {
    signOut(); // Calling the signOut function.

  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2 className="courses-title">Update Course</h2>
        <h4>Something wrong {user.firstName} {user.lastName}?</h4>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      {validationErrors.length > 0 && (
    <div className="validation--errors">
      <h3>Validation Errors</h3>
      <ul>
        {validationErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-column">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedCourse.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="left-column">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={updatedCourse.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="right-column">
          <label htmlFor="estimatedTime">Estimated Time:</label>
          <input
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={updatedCourse.estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="right-column">
          <label htmlFor="materialsNeeded">Materials Needed:</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={updatedCourse.materialsNeeded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Update Course</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCourse;
