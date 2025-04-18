// Importing necessary dependencies and utilities
import { useState } from "react"; // React hook for managing component state
import "./userButton.css"; // Importing the CSS file for styling the UserButton component
import Image from "../image/image"; // Custom Image component for rendering images/icons
import apiRequest from "../../utils/apiRequest"; // Utility for making API requests
import { Link, useNavigate } from "react-router"; // React Router components for navigation and linking
import useAuthStore from "../../utils/authStore"; // Custom hook for managing authentication state

// The UserButton component is responsible for rendering a user profile button.
// It provides options for navigating to the user's profile, accessing settings, and logging out.
// If the user is not logged in, it displays a "Login / Sign Up" link.
const UserButton = () => {
  // State to manage the visibility of the dropdown menu
  const [open, setOpen] = useState(false);

  // React Router's navigation function for redirecting users
  const navigate = useNavigate();

  // Accessing the current user and the function to remove the user from the authentication store
  const { currentUser, removeCurrentUser } = useAuthStore();

  // Debugging: Logs the current user to the console
  console.log(currentUser);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Sends a POST request to the server to log the user out
      await apiRequest.post("/users/auth/logout", {});

      // Removes the current user from the authentication store
      removeCurrentUser();

      // Redirects the user to the authentication page
      navigate("/auth");
    } catch (err) {
      // Logs any errors that occur during the logout process
      console.log(err);
    }
  };

  // JSX for rendering the UserButton component
  return currentUser ? ( // Conditional rendering based on whether the user is logged in
    <div className="userButton">
      {/* Displays the user's profile image or a default avatar if no image is available */}
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="" />

      {/* Toggles the dropdown menu when clicked */}
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="" className="arrow" />
      </div>

      {/* Dropdown menu with user options */}
      {open && (
        <div className="userOptions">
          {/* Link to the user's profile page */}
          <Link to={`/${currentUser.username}`} className="userOption">
            Profile
          </Link>

          {/* Placeholder for a settings option */}
          <div className="userOption">Setting</div>

          {/* Logout option that triggers the handleLogout function */}
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    // If the user is not logged in, display a "Login / Sign Up" link
    <Link to="/auth" className="loginLink">
      Login / Sign Up
    </Link>
  );
};

// Exports the UserButton component so it can be used in other parts of the application
export default UserButton;