// Importing the Image component for rendering user profile images
import Image from "../image/image";

// Importing the format function from the "timeago.js" library for formatting timestamps
import { format } from "timeago.js";

// The Comment component is responsible for rendering a single comment.
// Props:
// - comment: An object containing details about the comment, such as the user, description, and timestamp.
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      {/* User's profile image */}
      <Image
        path={comment.user.img || "/general/noAvatar.png"} // Fallback to a default avatar if no image is available
        alt="" // Alternative text for the image
      />

      {/* Container for the comment content */}
      <div className="commentContent">
        {/* Display the username of the user who posted the comment */}
        <span className="commentUsername">{comment.user.displayName}</span>

        {/* Display the comment text */}
        <p className="commentText">{comment.description}</p>

        {/* Display the time the comment was posted, formatted using the "timeago.js" library */}
        <span className="commentTime">{format(comment.createdAt)}</span>
      </div>
    </div>
  );
};

// Exports the Comment component so it can be used in other parts of the application
export default Comment;
