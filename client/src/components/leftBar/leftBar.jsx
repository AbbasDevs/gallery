// Importing the Image component for rendering icons and images
import Image from "../image/image";

// Importing the Link component from React Router for navigation
import { Link } from "react-router";

// Importing the CSS file for styling the LeftBar component
import "./leftBar.css";

// The LeftBar component is responsible for rendering the left-side navigation bar of the application.
// It provides quick access to various sections of the app, such as Home, Create, Updates, Messages, and Settings.
const LeftBar = () => {
  return (
    <div className="leftBar">
      {/* Container for the main menu icons */}
      <div className="menuIcons">
        {/* Logo link: Redirects to the home page */}
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="" className="logo" />
        </Link>

        {/* Home link: Redirects to the home page */}
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" alt="" />
        </Link>

        {/* Create link: Redirects to the create page */}
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="" />
        </Link>

        {/* Updates link: Redirects to the updates page */}
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="" />
        </Link>

        {/* Messages link: Redirects to the messages page */}
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="" />
        </Link>
      </div>

      {/* Settings link: Redirects to the settings page */}
      <Link to="/" className="menuIcon">
        <Image path="/general/settings.svg" alt="" />
      </Link>
    </div>
  );
};

// Exports the LeftBar component so it can be used in other parts of the application
export default LeftBar;