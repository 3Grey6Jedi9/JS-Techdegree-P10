import React, {useEffect, useState} from 'react';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        // Function to fetch the list of courses from your API
        async function fetchCourses(){
            try {
                const response = await fetch('http://localhost:5001/api/courses');
                if (!response.ok){
                    throw new Error('Network response was not ok');

                }
                const data = await response.json();
                setCourses(data);

            } catch (error) {

                console.error('Error fetching courses:', error);

            }

        }

        fetchCourses();

    }, []); // Empty depence


}