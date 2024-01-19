import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../AuthContext.jsx";
import '../styles/createcourse.css'


function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const { signOut } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'estimatedTime') {
      setEstimatedTime(value);
    } else if (name === 'materialsNeeded') {
      setMaterialsNeeded(value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/courses', {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      });

      if (response.status === 201) {
        // Successful course creation, navigate to the course detail page
        const newCourseId = response.data.id;
        navigate(`/courses/${newCourseId}`);
      } else if (response.status === 400) {
        // Validation errors returned from the API
        setValidationErrors(response.data.errors);
      } else {
        console.error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleCancel = () => {
    // Redirect the user to the default route (list of courses)
    navigate('/courses');
  };

  const handleSignOut = () => {

   signOut();

  };

  return (
    <div className="create-course-container">
      <div className="create-header">
      <h2>Create Course</h2>
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time:</label>
          <input
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="materialsNeeded">Materials Needed:</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={materialsNeeded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Create Course</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
