// Importing necessary dependencies and components
import { useNavigate } from "react-router"; // React Router hook for navigation
import Image from "../image/image"; // Custom Image component for rendering images/icons
import UserButton from "../userButton/userButton"; // UserButton component for user-related actions
import "./topBar.css"; // Importing the CSS file for styling the TopBar component

// The TopBar component is responsible for rendering the top navigation bar of the application.
// It includes a search bar for querying content and a user button for user-related actions.
const TopBar = () => {
  // React Router's navigation function for redirecting users
  const navigate = useNavigate();

  // Function to handle the search form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Redirects the user to the search results page with the query parameter
    navigate(`/search?search=${e.target[0].value}`);
  };

  // JSX for rendering the TopBar component
  return (
    <div className="topBar">
      {/* SEARCH */}
      {/* Search form for querying content */}
      <form onSubmit={handleSubmit} className="search">
        {/* Search icon */}
        <Image path="/general/search.svg" alt="" />

        {/* Input field for entering the search query */}
        <input type="text" placeholder="Search" />
      </form>

      {/* UserButton component for user-related actions */}
      <UserButton />
    </div>
  );
};

// Exports the TopBar component so it can be used in other parts of the application
export default TopBar;