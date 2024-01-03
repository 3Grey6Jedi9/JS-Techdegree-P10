import React from 'react';
import { Link } from 'react-router-dom';

function Header({ authenticatedUser, signOut }) {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses App</h1>
        <nav>
          {authenticatedUser ? (
            <React.Fragment>
              <span>Welcome, {authenticatedUser.firstName}!</span>
              <Link className="signout" to="/signout" onClick={signOut}>
                Sign Out
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
