import React, { useEffect, useState } from 'react';

function Courses({ courses }) { // Receive courses as a prop
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <a href={`/courses/${course.id}`}>{course.title}</a>
          </li>
        ))}
      </ul>
      <a href="/create-course">Create Course</a>
    </div>
  );
}

export default Courses;
