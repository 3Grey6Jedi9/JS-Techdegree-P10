import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import ReactMarkdown from 'react-markdown';
import '../styles/courses.css'
import '../styles/coursedetail.css'



function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { user, signOut } = useAuth(); // Access the authenticated user and signOut function
  const [isCourseOwner, setIsCourseOwner] = useState(false); // State to track if the user is the course owner

    const navigate = useNavigate();


  useEffect(() => {
    // Function to fetch the course details from your API
    async function fetchCourseDetail() {
      try {
        const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setCourse(data);
          // Check if the authenticated user's ID matches the course owner's ID
          setIsCourseOwner(user && user.id === data.userId);
        } else {
          console.error(`Network response was not ok. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchCourseDetail();
  }, [id, user]); // Fetch details when the 'id' parameter changes or when the user changes

  const handleDeleteCourse = async () => {

      // Use window.prompt() to ask for the password
  const userPassword = window.prompt('Enter your password to delete the course:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
   const authString = `${user.emailAddress}:${userPassword}`;
   const base64AuthString = btoa(authString);
   const authHeaderValue = `Basic ${base64AuthString}`;


   try {
  const response = await axios.delete(`http://localhost:5001/api/courses/${id}`, {
    headers: {
      Authorization: authHeaderValue,
    },
  });

  if (response.status >= 200 && response.status < 400) {
    // Course deleted successfully, navigate to the courses list
    navigate('/courses');
  } else {
    console.error(`Network response was not ok. Status: ${response.status}`);
  }
} catch (error) {
  console.error('Error deleting course:', error);
}
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
      <div className="detail-container">
      <div className="courses-header">
         <h2 className="courses-title">Course Detail</h2>
         <h4>I hope you like this course, {user.firstName} {user.lastName}!</h4>
        <button onClick={handleSignOut} className="signout-button">Sign Out</button>
    </div>
        {user && isCourseOwner && (
            <div className="detail-header-buttons">
              <Link to="/courses" className="signout-button">Go back to Courses</Link>
              <button onClick={handleDeleteCourse} className="delete">Delete Course</button>
              <Link to="update" className="signout-button">Update Course</Link>
            </div>
          )}
    <div>
      {course ? (
        <div className="content-container">
  <div className="left-column">
    <h3>Title</h3>
    <h3 className="section">{course.title}</h3>
    <h4>Description</h4>
    <ReactMarkdown className="section">{course.description}</ReactMarkdown>
  </div>
  <div className="right-column">
    <h3>Materials</h3>
    <ReactMarkdown className="section">{course.materialsNeeded}</ReactMarkdown>
    <h3>Duration</h3>
    <ReactMarkdown className="section">{course.estimatedTime}</ReactMarkdown>
  </div>
</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      </div>
  );
}

export default CourseDetail;
