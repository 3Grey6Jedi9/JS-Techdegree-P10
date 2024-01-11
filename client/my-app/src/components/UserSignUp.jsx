import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

function UserSignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]); // State to store validation errors

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'emailAddress') {
      setEmailAddress(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and confirm password do not match.');
      return;
    }

    try {
      // Make a POST request to create a new user
      const response = await axios.post('http://localhost:5001/api/users', {
        firstName,
        lastName,
        emailAddress,
        password,
      }, {
        headers: {
          Authorization: 'Basic joe@smith.com:joepassword',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Successful user registration, you can redirect to a protected route or sign in the user
        signIn(response.data);
        navigate('/courses');
      } else {
        console.error(`User registration failed. Status: ${response.status}`);
        // Handle validation errors if the response status is not 201
        if (response.data.errors) {
          setValidationErrors(response.data.errors); // Set the validation errors in state
        }
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      // Handle the error, display an error message, etc.
    }
  };

  const handleCancel = () => {
    // Redirect the user to the default route (Header)
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {validationErrors.length > 0 && ( // Display validation errors if there are any
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
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={emailAddress}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button className="button" type="submit">Sign Up</button>
        <button className="button button-secondary" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>Already have a user account? Click here to <a href="signin">sign in</a>!</p>
    </div>
  );
}

export default UserSignUp;
