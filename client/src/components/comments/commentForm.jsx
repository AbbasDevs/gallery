// Importing the EmojiPicker component for selecting emojis
import EmojiPicker from "emoji-picker-react";

// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing the apiRequest utility for making API requests
import apiRequest from "../../utils/apiRequest";

// Importing React Query hooks for managing server state and API requests
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to add a new comment to the server
// Parameters:
// - comment: An object containing the comment data (e.g., description, pin ID).
// Returns:
// - The server's response data after successfully adding the comment.
const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

// The CommentForm component is responsible for rendering a form to add new comments.
// Props:
// - id: The ID of the post or item to which the comment is being added.
const CommentForm = ({ id }) => {
  // State to manage whether the emoji picker is open
  const [open, setOpen] = useState(false);

  // State to manage the content of the comment being added
  const [desc, setDesc] = useState("");

  // Function to handle emoji selection
  // Parameters:
  // - emoji: The selected emoji object.
  // Description:
  // - Appends the selected emoji to the comment description.
  // - Closes the emoji picker.
  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  // React Query's query client for managing cached queries
  const queryClient = useQueryClient();

  // Mutation for adding a new comment
  const mutation = useMutation({
    // Function to execute when the mutation is triggered
    mutationFn: addComment,

    // Callback function executed on successful mutation
    onSuccess: () => {
      // Invalidates the query for the comments, forcing it to refetch
      queryClient.invalidateQueries({ queryKey: ["comments", id] });

      // Resets the comment description and closes the emoji picker
      setDesc("");
      setOpen(false);
    },
  });

  // Function to handle form submission
  // Parameters:
  // - e: The form submission event.
  // Description:
  // - Prevents the default form submission behavior.
  // - Triggers the mutation to add a new comment with the current description and post ID.
  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      description: desc, // The content of the comment
      pin: id, // The ID of the post or item
    });
  };

  // JSX for rendering the CommentForm component
  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      {/* Input field for entering the comment */}
      <input
        type="text"
        placeholder="Add a comment"
        onChange={(e) => setDesc(e.target.value)} // Updates the comment description
        value={desc} // Binds the input value to the comment description state
      />

      {/* Emoji picker toggle and display */}
      <div className="emoji">
        {/* Button to toggle the emoji picker */}
        <div onClick={() => setOpen((prev) => !prev)}>😊</div>

        {/* Emoji picker component */}
        {open && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

// Exports the CommentForm component so it can be used in other parts of the application
export default CommentForm;
