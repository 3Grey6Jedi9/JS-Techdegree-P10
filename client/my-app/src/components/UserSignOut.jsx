import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignOut({ signOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the signOut function to sign out the user
    signOut();

    // Redirect the user to the default route (list of courses)
    navigate('/courses', { replace: true }); // Use 'replace' to replace the current URL
  }, [signOut, navigate]);

  return null; // You can return null since you are performing a redirection
}

export default UserSignOut;
