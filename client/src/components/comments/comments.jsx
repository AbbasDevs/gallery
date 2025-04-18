// Importing the CSS file for styling the Comments component
import "./comments.css";

// Importing the useQuery hook from React Query for data fetching and caching
import { useQuery } from "@tanstack/react-query";

// Importing the apiRequest utility for making API requests
import apiRequest from "../../utils/apiRequest";

// Importing the Comment component for rendering individual comments
import Comment from "./comment";

// Importing the CommentForm component for submitting new comments
import CommentForm from "./commentForm";

// The Comments component is responsible for rendering a list of comments and a form for adding new comments.
// Props:
// - id: The ID of the post or item for which comments are being displayed.
const Comments = ({ id }) => {
  // Using the useQuery hook to fetch comments for the given post or item ID
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", id], // Unique key for caching the query
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data), // Fetches comments from the server
  });

  // If the query is still loading, display a loading message
  if (isPending) return "Loading...";

  // If an error occurs during the query, display an error message
  if (error) return "An error has occurred: " + error.message;

  // Logs the fetched data to the console for debugging purposes
  console.log(data);

  // JSX for rendering the Comments component
  return (
    <div className="comments">
      {/* Container for the list of comments */}
      <div className="commentList">
        {/* Displays the number of comments or a "No comments" message if there are none */}
        <span className="commentCount">
          {data.length === 0 ? "No comments" : data.length + " Comments"}
        </span>

        {/* Maps over the fetched comments and renders each one using the Comment component */}
        {data.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>

      {/* Renders the CommentForm component for submitting new comments */}
      <CommentForm id={id} />
    </div>
  );
};

// Exports the Comments component so it can be used in other parts of the application
export default Comments;
