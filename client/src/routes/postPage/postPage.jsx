// Import the CSS file for styling the PostPage component
import "./postPage.css";

// Import the Image component for rendering images
import Image from "../../components/image/image";

// Import the PostInteractions component for handling user interactions
import PostInteractions from "../../components/postInteractions/postInteractions";

// Import the Link and useParams hooks from react-router
// Link is used for navigation, and useParams extracts URL parameters
import { Link, useParams } from "react-router";

// Import the Comments component for displaying and managing comments
import Comments from "../../components/comments/comments";

// Import the useQuery hook from React Query for data fetching and caching
import { useQuery } from "@tanstack/react-query";

// Import the pre-configured Axios instance for making API requests
import apiRequest from "../../utils/apiRequest";

// Define the PostPage component
const PostPage = () => {
  // Extract the "id" parameter from the URL
  const { id } = useParams();

  // Use the useQuery hook to fetch post data based on the "id"
  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id], // Unique key for caching and identifying this query
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data), // Function to fetch data from the API
  });

  // Display a loading message while the data is being fetched
  if (isPending) return "Loading...";

  // Display an error message if the API request fails
  if (error) return "An error has occurred: " + error;

  // Display a message if no post data is found
  if (!data) return "Pin not found!";

  // Render the PostPage component
  return (
    <div className="postPage">
      {/* Back arrow icon */}
      <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>

      {/* Container for the post content */}
      <div className="postContainer">
        {/* Post image */}
        <div className="postImg">
          <Image src={data.media} alt="" w={736} />
        </div>

        {/* Post details */}
        <div className="postDetails">
          {/* Render the PostInteractions component */}
          <PostInteractions postId={id} />

          {/* Render the user information */}
          <Link to={`/${data.user.username}`} className="postUser">
            <Image src={data.user.img || "/general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>

          {/* Render the Comments component */}
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

// Export the PostPage component as the default export of the file
export default PostPage;
