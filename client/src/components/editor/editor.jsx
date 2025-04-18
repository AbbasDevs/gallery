// Importing the CSS file for styling the Editor component
import "./editor.css";

// Importing the Layers component for managing and selecting layers
import Layers from "./Layers";

// Importing the Options component for customizing the canvas and text layer
import Options from "./Options";

// Importing the Workspace component for rendering the canvas and allowing user interactions
import Workspace from "./Workspace";

// The Editor component is the main container for the editor interface.
// It combines three subcomponents: Layers, Workspace, and Options, to provide a complete editing experience.
// Props:
// - previewImg: An object containing details about the preview image (e.g., URL, dimensions).
const Editor = ({ previewImg }) => {
  return (
    <div className="editor">
      {/* Layers component: Provides a UI for selecting and managing layers */}
      <Layers previewImg={previewImg} />

      {/* Workspace component: Renders the canvas and allows user interactions */}
      <Workspace previewImg={previewImg} />

      {/* Options component: Provides customization options for the canvas and text layer */}
      <Options previewImg={previewImg} />
    </div>
  );
};

// Exports the Editor component so it can be used in other parts of the application
export default Editor;
