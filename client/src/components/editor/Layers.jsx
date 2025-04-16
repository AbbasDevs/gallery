// The `Layers` component provides a user interface for selecting and managing layers in an editor.
// It allows users to interact with different layers, such as adding text or modifying the canvas.

import useEditorStore from "../../utils/editorStore"; // Custom hook for managing editor state and actions.
import Image from "../image/image"; // Reusable component for rendering images.

const Layers = () => {
  // Destructure state and actions from the editor store.
  const { selectedLayer, setSelectedLayer, addText, canvasOptions } =
    useEditorStore();

  // Function to handle layer selection.
  // Parameters:
  // - layer (string): The layer to be selected (e.g., "text" or "canvas").
  // Description:
  // - Updates the selected layer using `setSelectedLayer`.
  // - If the selected layer is "text", it also calls `addText()` to add a text layer.
  const handleSelectedLayer = (layer) => {
    setSelectedLayer(layer);

    if (layer === "text") {
      addText();
    }
  };

  return (
    <div className="layers">
      {/* Title section */}
      <div className="layersTitle">
        <h3>Layers</h3>
        <p>Select a layer to edit</p>
      </div>

      {/* Text layer */}
      <div
        onClick={() => handleSelectedLayer("text")}
        className={`layer ${selectedLayer === "text" ? "selected" : ""}`}
      >
        <div className="layerImage">
          {/* Image for the text layer */}
          <Image path="/general/text.png" alt="" w={48} h={48} />
        </div>
        <span>Add Text</span>
      </div>

      {/* Canvas layer */}
      <div
        onClick={() => handleSelectedLayer("canvas")}
        className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}
      >
        <div
          className="layerImage"
          // Dynamically set the background color of the canvas layer.
          style={{ backgroundColor: canvasOptions.backgroundColor }}
        ></div>
        <span>Canvas</span>
      </div>
    </div>
  );
};

export default Layers; // Export the component for use in other parts of the application.
