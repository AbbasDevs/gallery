// Import the CSS file for styling the Homepage component
import './homepage.css';

// Import the Gallery component for displaying a collection of items
import Gallery from "../../components/gallery/gallery";

// Define the Homepage component
// This component serves as the main landing page of the application
const Homepage = () => {
  return (
    // Render the Gallery component as the main content of the homepage
    <Gallery />
  );
};

// Export the Homepage component as the default export of the file
export default Homepage;