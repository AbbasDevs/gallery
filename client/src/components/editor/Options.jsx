// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing the custom editor store for managing state
import useEditorStore from "../../utils/editorStore";

// Importing the HexColorPicker component for color selection
import { HexColorPicker } from "react-colorful";

// Predefined portrait aspect ratios for canvas resizing
const portraitSizes = [
  {
    name: "1:2",
    width: 1,
    height: 2,
  },
  {
    name: "9:16",
    width: 9,
    height: 16,
  },
  {
    name: "2:3",
    width: 2,
    height: 3,
  },
  {
    name: "3:4",
    width: 3,
    height: 4,
  },
  {
    name: "4:5",
    width: 4,
    height: 5,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

// Predefined landscape aspect ratios for canvas resizing
const landscapeSizes = [
  {
    name: "2:1",
    width: 2,
    height: 1,
  },
  {
    name: "16:9",
    width: 16,
    height: 9,
  },
  {
    name: "3:2",
    width: 3,
    height: 2,
  },
  {
    name: "4:3",
    width: 4,
    height: 3,
  },
  {
    name: "5:4",
    width: 5,
    height: 4,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

// The Options component provides a user interface for customizing the canvas and text layer.
// Props:
// - previewImg: An object containing details about the preview image (e.g., URL, dimensions).
const Options = ({ previewImg }) => {
  // Accessing state and state-modifying functions from the editor store
  const {
    selectedLayer, // The currently selected layer (e.g., "text" or "canvas").
    textOptions, // Object containing options for the text layer (e.g., font size, color).
    setTextOptions, // Function to update the text layer options.
    canvasOptions, // Object containing options for the canvas (e.g., size, orientation, background color).
    setCanvasOptions, // Function to update the canvas options.
  } = useEditorStore();

  // State to manage the visibility of the color picker
  const [isColorPickerOpen, setSetIsColorPickerOpen] = useState(false);

  // Determines the original orientation of the preview image (portrait or landscape)
  const originalOrientation =
    previewImg.width < previewImg.height ? "portrait" : "landscape";

  // Function to handle orientation changes (portrait or landscape)
  const handleOrientationClick = (orientation) => {
    let newHeight;

    // If the orientation matches the original, calculate height based on the original dimensions
    if (originalOrientation === orientation) {
      newHeight = (375 * previewImg.height) / previewImg.width;
    } else {
      // Otherwise, swap width and height for the new orientation
      newHeight = (375 * previewImg.width) / previewImg.height;
    }

    // Update the canvas options with the new orientation and height
    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

  // Function to handle size changes (e.g., aspect ratio selection)
  const handleSizeClick = (size) => {
    let newHeight;

    // If the size is "original", calculate height based on the original dimensions
    if (size === "original") {
      if (originalOrientation === canvasOptions.orientation) {
        newHeight = (375 * previewImg.height) / previewImg.width;
      } else {
        newHeight = (375 * previewImg.width) / previewImg.height;
      }
    } else {
      // Otherwise, calculate height based on the selected aspect ratio
      newHeight = (375 * size.height) / size.width;
    }

    // Update the canvas options with the new size and height
    setCanvasOptions({
      ...canvasOptions,
      size: size === "original" ? "original" : size.name,
      height: newHeight,
    });
  };

  // JSX for rendering the Options component
  return (
    <div className="options">
      {/* Conditional rendering based on the selected layer */}
      {selectedLayer === "text" ? (
        // Text layer editing options
        <div className="">
          {/* Font size input */}
          <div className="editingOption">
            <span>Font Size</span>
            <input
              type="number"
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions({ ...textOptions, fontSize: e.target.value })
              }
            />
          </div>

          {/* Text color picker */}
          <div className="editingOption">
            <span>Color</span>
            <div className="textColor">
              <div
                className="colorPreview"
                style={{ backgroundColor: textOptions.color }}
                onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
              />
              {isColorPickerOpen && (
                <div className="colorPicker">
                  <HexColorPicker
                    color={textOptions.color}
                    onChange={(color) =>
                      setTextOptions({ ...textOptions, color })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Canvas editing options
        <div className="">
          {/* Orientation selection */}
          <div className="editingOption">
            <span>Orientation</span>
            <div className="orientations">
              <div
                className={`orientation ${
                  canvasOptions.orientation === "portrait" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("portrait")}
              >
                P
              </div>
              <div
                className={`orientation ${
                  canvasOptions.orientation === "landscape" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("landscape")}
              >
                L
              </div>
            </div>
          </div>

          {/* Size selection */}
          <div className="editingOption">
            <span>Size</span>
            <div className="sizes">
              <div
                className={`size ${
                  canvasOptions.size === "original" ? "selected" : ""
                }`}
                onClick={() => handleSizeClick("original")}
              >
                Original
              </div>
              {canvasOptions.orientation === "portrait" ? (
                <>
                  {portraitSizes.map((size) => (
                    <div
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {landscapeSizes.map((size) => (
                    <div
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Background color picker */}
          <div className="editingOption">
            <span>Background Color</span>
            <div className="bgColor">
              <div className="textColor">
                <div
                  className="colorPreview"
                  style={{ backgroundColor: canvasOptions.backgroundColor }}
                  onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
                />
                {isColorPickerOpen && (
                  <div className="colorPicker">
                    <HexColorPicker
                      color={canvasOptions.backgroundColor}
                      onChange={(color) =>
                        setCanvasOptions({
                          ...canvasOptions,
                          backgroundColor: color,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Exports the Options component so it can be used in other parts of the application
export default Options;
