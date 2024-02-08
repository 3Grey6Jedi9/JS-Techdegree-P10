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
  const { signOut, user } = useAuth();

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



const handleVerification = () => {
    // Check if title and description are not null
    if (title !== '' && description !== '') {
      // If both fields are not null, trigger handleSubmit
      handleSubmit();
    } else {
      // If either field is null, display validation error
      setValidationErrors(['Please provide values for both "title" and "description"']);
    }
  };




  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    // Use window.prompt() to ask for the password
  const userPassword = window.prompt('Enter your password to create the course:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
  const authString = `${user.emailAddress}:${userPassword}`;
  const base64AuthString = btoa(authString);
  const authHeaderValue = `Basic ${base64AuthString}`;

    try {
      const response = await axios.post('http://localhost:5001/api/courses', {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId: user.id, // Add userId to the request payload
      },{
    headers: {
      Authorization: authHeaderValue,
      'Content-Type': 'application/json', // Set the content type
    },
  });

      if (response.status === 201) {
        // Successful course creation, navigate to the course detail page
        const newCourseId = response.data.id;
        console.log('Response Data:', response);
        console.log(`${newCourseId}`)
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
      <button onClick={handleSignOut} className="create-signout">Sign Out</button>
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
      <form onSubmit={handleSubmit} className="create-form">
        <div className="smaller-input">
          <label htmlFor="title" className="create-label">Course Title</label>
          <input className="smaller-input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
          <h2 className="author">By {user.firstName} {user.lastName}</h2>
        </div>
        <div>
          <label htmlFor="estimatedTime" className="create-label">Estimated Time</label>
          <input className="smaller-input"
            type="text"
            id="estimatedTime"
            name="estimatedTime"
            value={estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="create-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="materialsNeeded" className="create-label">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={materialsNeeded}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleVerification}>Create Course</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


export default CreateCourse;
