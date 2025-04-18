// Importing the CSS file for styling the Skeleton component
import "./skeleton.css";

// The Skeleton component is responsible for rendering a placeholder UI.
// It is typically used to indicate that content is loading, providing a visual cue to the user.
// This component creates a masonry-style grid of skeleton items with varying sizes.
const Skeleton = () => {
  return (
    <div className="skeleton-masonry">
      {/* Generates an array of 21 items and maps over it to create skeleton placeholders */}
      {Array.from({ length: 21 }).map((_, index) => (
        // Each skeleton item is assigned a unique key and a dynamic class name
        // The class name determines the size of the skeleton item (e.g., size-1, size-2, etc.)
        <div key={index} className={`skeleton-item size-${(index % 5) + 1}`} />
      ))}
    </div>
  );
};

// Exports the Skeleton component so it can be used in other parts of the application
export default Skeleton;