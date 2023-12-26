import React, { useState, useEffect } from 'react';

function UpdateCourse(props) {
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
      const response = await fetch(`http://localhost:5001/api/courses/${props.match.params.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourse(data);
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
    // You can implement the course update logic here using your REST API
    // Example: Make a PUT request to update the course
    // If successful, you can redirect to the course detail page
    // If unsuccessful, you can display an error message
  };

  const handleCancel = () => {
    // Redirect the user to the course detail page
    props.history.push(`/courses/${props.match.params.id}`);
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
