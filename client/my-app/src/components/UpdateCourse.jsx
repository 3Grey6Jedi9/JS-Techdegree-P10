import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCourse(props) {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });

  useEffect(() => {
    // Fetch the course details when the component mounts
    fetchCourseDetail();
  }, [props.match.params.id]);

  const fetchCourseDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/courses/${props.match.params.id}`);
      if (response.status === 200) {
        const data = response.data;
        setCourse(data);
      } else {
        console.error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/api/courses/${props.match.params.id}`, course);
      if (response.status === 204) {
        // Successful update, navigate to the course detail page
        navigate(`/courses/${props.match.params.id}`);
      } else {
        console.error(`Network response was not ok. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleCancel = () => {
    // Redirect the user to the course detail page
    navigate(`/courses/${props.match.params.id}`);
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
            value={course.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
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
            value={course.estimatedTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="materialsNeeded">Materials Needed:</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            value={course.materialsNeeded}
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
