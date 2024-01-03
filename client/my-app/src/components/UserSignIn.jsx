import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function UserSignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to authenticate the user
      const response = await axios.post('http://your-api-url/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful authentication, you can redirect to a protected route
        props.history.push('/protected-route');
      } else {
        console.error(`Authentication failed. Status: ${response.status}`);
        // Display an error message or handle the error as needed
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle the error, display an error message, etc.
    }
  };

  const handleCancel = () => {
    // Redirect the user to the default route (Header)
    props.history.push('/');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSignIn;
