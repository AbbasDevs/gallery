// Importing the CSS file for styling the AuthPage component
import "./authPage.css";

// Importing the Image component for rendering images/icons
import Image from "../../components/image/image";

// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing the useNavigate hook from React Router for navigation
import { useNavigate } from "react-router";

// Importing the apiRequest utility for making API requests
import apiRequest from "../../utils/apiRequest";

// Importing the useAuthStore custom hook for managing authentication state
import useAuthStore from "../../utils/authStore";

// The AuthPage component is responsible for rendering the authentication page.
// It allows users to log in or register for an account.
const AuthPage = () => {
  // State to toggle between login and registration forms
  const [isRegister, setIsRegister] = useState(false);

  // State to store error messages from the server
  const [error, setError] = useState("");

  // React Router's navigation function for redirecting users
  const navigate = useNavigate();

  // Accessing the setCurrentUser function from the authentication store
  const { setCurrentUser } = useAuthStore();

  // Function to handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Extracts form data into a FormData object
    const formData = new FormData(e.target);

    // Converts the FormData object into a plain JavaScript object
    const data = Object.fromEntries(formData);

    try {
      // Sends a POST request to the appropriate endpoint (login or register)
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        data
      );

      // Updates the authentication state with the logged-in user's data
      setCurrentUser(res.data);

      // Redirects the user to the home page after successful login/registration
      navigate("/");
    } catch (err) {
      // Sets the error message if the server returns an error
      setError(err.response.data.message);
    }
  };

  // JSX for rendering the AuthPage component
  return (
    <div className="authPage">
      {/* Container for the authentication form */}
      <div className="authContainer">
        {/* Logo displayed at the top of the form */}
        <Image path="/general/logo.png" w={36} h={36} alt="" />

        {/* Dynamic heading based on whether the user is registering or logging in */}
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>

        {/* Conditional rendering of the registration form */}
        {isRegister ? (
          <form key="register" onSubmit={handleSubmit}>
            {/* Input field for the username */}
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                placeholder="Username"
                required
                name="username"
                id="username"
              />
            </div>

            {/* Input field for the display name */}
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="displayName"
                placeholder="Name"
                required
                name="displayName"
                id="displayName"
              />
            </div>

            {/* Input field for the email */}
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>

            {/* Input field for the password */}
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>

            {/* Submit button for the registration form */}
            <button type="submit">Register</button>

            {/* Link to switch to the login form */}
            <p onClick={() => setIsRegister(false)}>
              Do you have an account? <b>Login</b>
            </p>

            {/* Displays an error message if there is an error */}
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          // Conditional rendering of the login form
          <form key="loginForm" onSubmit={handleSubmit}>
            {/* Input field for the email */}
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>

            {/* Input field for the password */}
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>

            {/* Submit button for the login form */}
            <button type="submit">Login</button>

            {/* Link to switch to the registration form */}
            <p onClick={() => setIsRegister(true)}>
              Don&apos;t have an account? <b>Register</b>
            </p>

            {/* Displays an error message if there is an error */}
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

// Exports the AuthPage component so it can be used in other parts of the application
export default AuthPage;
