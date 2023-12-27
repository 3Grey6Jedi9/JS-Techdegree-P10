import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function UserSignOut({ signOut }) {
  useEffect(() => {
    // Call the signOut function to sign out the user
    signOut();
  }, [signOut]);

  // Redirect the user to the default route (list of courses)
  return <Redirect to="/courses" />;
}

export default UserSignOut;
