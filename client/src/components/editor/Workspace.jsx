// Importing React hooks and utilities
import { useEffect, useRef } from "react";

// Importing the custom editor store for managing state
import useEditorStore from "../../utils/editorStore";

// Importing the Image component for rendering icons
import Image from "../image/image";

// The Workspace component is responsible for rendering the editor's workspace.
// It allows users to interact with a canvas, manipulate text layers, and preview images.
// Props:
// - previewImg: An object containing details about the preview image (e.g., URL, dimensions).
const Workspace = ({ previewImg }) => {
  // Accessing state and state-modifying functions from the editor store
  const {
    setSelectedLayer, // Function to set the currently selected layer (e.g., "text").
    textOptions, // Object containing options for the text layer (e.g., position, font size, color).
    setTextOptions, // Function to update the text layer options.
    canvasOptions, // Object containing options for the canvas (e.g., height, background color).
    setCanvasOptions, // Function to update the canvas options.
  } = useEditorStore();

  // useEffect to initialize the canvas height and orientation based on the preview image dimensions
  useEffect(() => {
    if (canvasOptions.height === 0) {
      const canvasHeight = (375 * previewImg.height) / previewImg.width;

      setCanvasOptions({
        ...canvasOptions,
        height: canvasHeight,
        orientation: canvasHeight > 375 ? "portrait" : "landscape",
      });
    }
  }, [previewImg, canvasOptions, setCanvasOptions]);

  // Refs for managing drag-and-drop functionality
  const itemRef = useRef(null); // Ref for the text layer element
  const containerRef = useRef(null); // Ref for the canvas container
  const dragging = useRef(false); // Boolean ref to track whether the text layer is being dragged
  const offset = useRef({ x: 0, y: 0 }); // Ref to store the offset between the mouse and the text layer's position

  // Function to handle mouse movement during dragging
  const handleMouseMove = (e) => {
    if (!dragging.current) return; // If not dragging, do nothing
    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x, // Update the text layer's left position
      top: e.clientY - offset.current.y, // Update the text layer's top position
    });
  };

  // Function to handle mouse release (stops dragging)
  const handleMouseUp = () => {
    dragging.current = false;
  };

  // Function to handle mouse leaving the canvas (stops dragging)
  const handleMouseLeave = () => {
    dragging.current = false;
  };

  // Function to handle mouse press on the text layer (starts dragging)
  const handleMouseDown = (e) => {
    setSelectedLayer("text"); // Set the selected layer to "text"
    dragging.current = true; // Enable dragging
    offset.current = {
      x: e.clientX - textOptions.left, // Calculate the horizontal offset
      y: e.clientY - textOptions.top, // Calculate the vertical offset
    };
  };

  // JSX for rendering the Workspace component
  return (
    <div className="workspace">
      {/* Canvas container */}
      <div
        className="canvas"
        style={{
          height: canvasOptions.height, // Set the canvas height dynamically
          backgroundColor: canvasOptions.backgroundColor, // Set the canvas background color
        }}
        onMouseMove={handleMouseMove} // Handle mouse movement
        onMouseUp={handleMouseUp} // Handle mouse release
        onMouseLeave={handleMouseLeave} // Handle mouse leaving the canvas
        ref={containerRef} // Reference to the canvas container
      >
        {/* Render the preview image */}
        <img src={previewImg.url} alt="" />

        {/* Render the text layer if text is present */}
        {textOptions.text && (
          <div
            className="text"
            style={{
              left: textOptions.left, // Set the text layer's left position
              top: textOptions.top, // Set the text layer's top position
              fontSize: `${textOptions.fontSize}px`, // Set the text layer's font size
            }}
            ref={itemRef} // Reference to the text layer
            onMouseDown={handleMouseDown} // Handle mouse press on the text layer
          >
            {/* Input field for editing the text */}
            <input
              type="text"
              value={textOptions.text} // Bind the input value to the text layer's text
              onChange={(e) =>
                setTextOptions({ ...textOptions, text: e.target.value }) // Update the text layer's text
              }
              style={{
                color: textOptions.color, // Set the text color
              }}
            />

            {/* Delete button for removing the text layer */}
            <div
              className="deleteTextButton"
              onClick={() => setTextOptions({ ...textOptions, text: "" })} // Clear the text layer's text
            >
              <Image path="/general/delete.svg" alt="" /> {/* Delete icon */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exports the Workspace component so it can be used in other parts of the application
export default Workspace;
