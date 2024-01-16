import React from 'react';
import { Link } from 'react-router-dom';
import Courses_Library from '../assets/Courses_Library.jpeg'

function Header({ authenticatedUser, signOut }) {
  return (
    <div className="header header--flex">
      <div className="bounds wrap">
          <img src={Courses_Library} className="" alt="logo" />
        <h1 className="header--logo">Courses Library</h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authenticatedUser.firstName}!</li>
              <li>
                <Link className="signout button" to="/signout" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link className="signup button" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="signin button" to="/signin">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
