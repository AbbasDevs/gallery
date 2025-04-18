// Importing the CSS file for styling the GalleryItem component
import "./galleryItem.css";

// Importing the Link component from React Router for navigation
import { Link } from "react-router";

// Importing the Image component for rendering optimized images
import Image from "../image/image";

// The GalleryItem component is responsible for rendering a single item in the gallery.
// It displays an image, provides a link to the item's details page, and includes interaction options like saving and sharing.
// Props:
// - item: An object containing details about the gallery item (e.g., media URL, dimensions, ID).
const GalleryItem = ({ item }) => {
  // Calculates the optimized height for the image based on a fixed width of 372px
  // This ensures that the image maintains its aspect ratio
  const optimizedHeight = (372 * item.height) / item.width;

  return (
    <div
      className="galleryItem"
      // Dynamically sets the grid row span based on the item's height
      // This allows the gallery to have a masonry-style layout
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* Renders the item's image with optimized dimensions */}
      <Image src={item.media} alt="" w={372} h={optimizedHeight} />

      {/* Overlay link that redirects to the item's details page */}
      <Link to={`/pin/${item._id}`} className="overlay" />

      {/* Save button for saving the item */}
      <button className="saveButton">Save</button>

      {/* Container for additional overlay icons */}
      <div className="overlayIcons">
        {/* Share button */}
        <button>
          <Image path="/general/share.svg" alt="Share" />
        </button>

        {/* More options button */}
        <button>
          <Image path="/general/more.svg" alt="More options" />
        </button>
      </div>
    </div>
  );
};

// Exports the GalleryItem component so it can be used in other parts of the application
export default GalleryItem;