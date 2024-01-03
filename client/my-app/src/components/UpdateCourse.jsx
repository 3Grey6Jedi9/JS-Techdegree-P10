import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Courses from './Courses'; // Import the Courses component

function UpdateCourse({ courses }) {
  const navigate = useNavigate();
  const { id } = useParams();

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

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={updatedCourse.description}
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
            value={updatedCourse.estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
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
