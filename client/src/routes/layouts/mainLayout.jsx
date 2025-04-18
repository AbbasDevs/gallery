// Import the Outlet component from react-router for rendering child routes
import { Outlet } from "react-router";

// Import the LeftBar component for the left sidebar
import LeftBar from "../../components/leftBar/leftBar";

// Import the TopBar component for the top navigation bar
import TopBar from "../../components/topBar/topBar";

// Import the CSS file for styling the MainLayout component
import "./mainLayout.css";

// Define the MainLayout component
// This component provides a consistent layout with a left sidebar, top bar, and dynamic content area
const MainLayout = () => {
  return (
    // Main container for the application with the class name 'app'
    <div className="app">
      {/* Render the LeftBar component */}
      <LeftBar />
      {/* Container for the main content of the application */}
      <div className="content">
        {/* Render the TopBar component */}
        <TopBar />
        {/* Render the child route content dynamically */}
        <Outlet />
      </div>
    </div>
  );
};

// Export the MainLayout component as the default export of the file
export default MainLayout;
