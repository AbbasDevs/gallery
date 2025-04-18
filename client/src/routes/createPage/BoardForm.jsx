// Importing the Image component for rendering images/icons
import Image from "../../components/image/image";

// The BoardForm component is responsible for rendering a form that allows users to create a new board.
// Props:
// - setIsNewBoardOpen: A function to toggle the visibility of the BoardForm component.
// - setNewBoard: A function to set the title of the newly created board.
const BoardForm = ({ setIsNewBoardOpen, setNewBoard }) => {
  // Function to handle the form submission
  // This function is triggered when the user submits the form to create a new board.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload).
    const title = e.target[0].value; // Retrieves the value of the first input field (board title).
    setNewBoard(title); // Updates the state with the new board title.
    setIsNewBoardOpen(false); // Closes the BoardForm modal.
  };

  // JSX for rendering the BoardForm component
  return (
    <div className="boardForm">
      {/* Container for the form and its elements */}
      <div className="boardFormContainer">
        {/* Close button for the form */}
        <div
          className="boardFormClose"
          onClick={() => setIsNewBoardOpen(false)} // Closes the form when clicked
        >
          {/* Renders a cancel icon using the Image component */}
          <Image path="/general/cancel.svg" alt="" w={20} h={20} />
        </div>

        {/* Form for creating a new board */}
        <form onSubmit={handleSubmit}>
          {/* Title of the form */}
          <h1>Create a new board</h1>

          {/* Input field for entering the board title */}
          <input type="text" placeholder="Board Title" />

          {/* Submit button to create the board */}
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

// Exports the BoardForm component so it can be used in other parts of the application
export default BoardForm;
