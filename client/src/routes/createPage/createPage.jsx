// Importing necessary styles, components, hooks, and utilities
import "./createPage.css"; // Importing the CSS file for styling the CreatePage component
import IKImage from "../../components/image/image"; // Custom image component for rendering images
import useAuthStore from "../../utils/authStore"; // Custom hook for accessing authentication state
import { useNavigate } from "react-router"; // React Router hook for navigation
import { useEffect, useRef, useState } from "react"; // React hooks for managing state, refs, and side effects
import Editor from "../../components/editor/editor"; // Editor component for editing images or content
import useEditorStore from "../../utils/editorStore"; // Custom hook for managing editor state
import apiRequest from "../../utils/apiRequest"; // Utility for making API requests
import { useMutation, useQuery } from "@tanstack/react-query"; // React Query hooks for data fetching and mutations
import BoardForm from "./BoardForm"; // Component for creating a new board

// Function to handle adding a new post
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post); // Sends a POST request to the server to create a new pin
  return res.data; // Returns the response data
};

// Main component for the Create Page
const CreatePage = () => {
  // Accessing the current user from the authentication store
  const { currentUser } = useAuthStore();

  // React Router's navigation function
  const navigate = useNavigate();

  // Reference to the form element
  const formRef = useRef();

  // Accessing editor-related state and functions from the editor store
  const { textOptions, canvasOptions, resetStore } = useEditorStore();

  // State variables for managing file uploads, preview images, editing mode, and board creation
  const [file, setFile] = useState(null); // Stores the uploaded file
  const [previewImg, setPreviewImg] = useState({
    url: "", // URL of the preview image
    width: 0, // Width of the preview image
    height: 0, // Height of the preview image
  });
  const [isEditing, setIsEditing] = useState(false); // Tracks whether the user is in editing mode
  const [newBoard, setNewBoard] = useState(""); // Stores the name of a new board
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false); // Tracks whether the "Create New Board" form is open

  // Redirects the user to the authentication page if they are not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  // Updates the preview image when a file is uploaded
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file); // Creates a temporary URL for the uploaded file
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  // Mutation for submitting a new post
  const mutation = useMutation({
    mutationFn: addPost, // Function to execute when the mutation is triggered
    onSuccess: (data) => {
      resetStore(); // Resets the editor store
      navigate(`/pin/${data._id}`); // Redirects to the newly created pin's page
    },
  });

  // Handles the form submission for creating or editing a post
  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false); // Exits editing mode
    } else {
      const formData = new FormData(formRef.current); // Creates a FormData object from the form
      formData.append("media", file); // Appends the uploaded file
      formData.append("textOptions", JSON.stringify(textOptions)); // Appends text options as a JSON string
      formData.append("canvasOptions", JSON.stringify(canvasOptions)); // Appends canvas options as a JSON string
      formData.append("newBoard", newBoard); // Appends the new board name

      mutation.mutate(formData); // Triggers the mutation to submit the form data
    }
  };

  // Fetches the list of boards from the server
  const { data, isPending, error } = useQuery({
    queryKey: ["formBoards"], // Unique key for caching the query
    queryFn: () => apiRequest.get(`/boards`).then((res) => res.data), // Fetches the boards from the server
  });

  // Toggles the "Create New Board" form
  const handleNewBoard = () => {
    setIsNewBoardOpen((prev) => !prev);
  };

  // JSX for rendering the Create Page
  return (
    <div className="createPage">
      {/* Top section with the title and submit button */}
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>

      {/* Conditional rendering based on whether the user is editing */}
      {isEditing ? (
        <Editor previewImg={previewImg} /> // Renders the Editor component if in editing mode
      ) : (
        <div className="createBottom">
          {/* Preview section for the uploaded image */}
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} alt="" />
              <div className="editIcon" onClick={() => setIsEditing(true)}>
                <IKImage path="/general/edit.svg" alt="" />
              </div>
            </div>
          ) : (
            // File upload section
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <IKImage path="/general/upload.svg" alt="" />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high quality .jpg files less than 20 MB or
                  .mp4 files less than 200 MB.
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}

          {/* Form for creating a new pin */}
          <form className="createForm" ref={formRef}>
            {/* Title input */}
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
              />
            </div>

            {/* Description input */}
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                type="text"
                placeholder="Add a detailed description"
                name="description"
                id="description"
              />
            </div>

            {/* Link input */}
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>

            {/* Board selection */}
            {(!isPending || !error) && (
              <div className="createFormItem">
                <label htmlFor="board">Board</label>
                <select name="board" id="board">
                  <option value="">Choose a board</option>
                  {data?.map((board) => (
                    <option value={board._id} key={board._id}>
                      {board.title}
                    </option>
                  ))}
                </select>
                <div className="newBoard">
                  {newBoard && (
                    <div className="newBoardContainer">
                      <div className="newBoardItem">{newBoard}</div>
                    </div>
                  )}
                  <div className="createBoardButton" onClick={handleNewBoard}>
                    Create new board
                  </div>
                </div>
              </div>
            )}

            {/* Tags input */}
            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don&apos;t worry, people won&apos;t see your tags</small>
            </div>
          </form>

          {/* Board creation form */}
          {isNewBoardOpen && (
            <BoardForm
              setIsNewBoardOpen={setIsNewBoardOpen}
              setNewBoard={setNewBoard}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePage; // Exports the CreatePage component
