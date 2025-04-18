// Importing the Image component for rendering icons
import Image from "../image/image";

// Importing the CSS file for styling the PostInteractions component
import "./postInteractions.css";

// Importing React Query hooks for managing server state and API requests
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Importing the apiRequest utility for making API requests
import apiRequest from "../../utils/apiRequest";

// Function to handle interactions with a post (e.g., like, save)
// Parameters:
// - id: The ID of the post being interacted with
// - type: The type of interaction (e.g., "like", "save")
const interact = async (id, type) => {
  // Sends a POST request to the server with the interaction type
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });

  // Returns the server's response data
  return res.data;
};

// The PostInteractions component is responsible for rendering interaction options for a post.
// It allows users to like, save, or share a post and displays the current like count.
// Props:
// - postId: The ID of the post for which interactions are being managed
const PostInteractions = ({ postId }) => {
  // React Query's query client for managing cached queries
  const queryClient = useQueryClient();

  // Mutation for handling interactions (like, save)
  const mutation = useMutation({
    // Function to execute when the mutation is triggered
    mutationFn: ({ id, type }) => interact(id, type),

    // Callback function executed on successful mutation
    onSuccess: () => {
      // Invalidates the query for the interaction check, forcing it to refetch
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", postId] });
    },
  });

  // Query for fetching the current interaction state of the post
  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId], // Unique key for caching the query
    queryFn: () =>
      apiRequest
        .get(`/pins/interaction-check/${postId}`) // Sends a GET request to fetch interaction data
        .then((res) => res.data), // Returns the server's response data
  });

  // If the query is still loading or an error occurred, do not render the component
  if (isPending || error) return;

  // JSX for rendering the PostInteractions component
  return (
    <div className="postInteractions">
      {/* Container for interaction icons */}
      <div className="interactionIcons">
        {/* Like button */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => mutation.mutate({ id: postId, type: "like" })} // Triggers the like mutation
        >
          <path
            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
            stroke={data.isLiked ? "#e50829" : "#000000"} // Changes color if the post is liked
            strokeWidth="2"
            fill={data.isLiked ? "#e50829" : "none"} // Fills the heart if the post is liked
          />
        </svg>
        {/* Displays the current like count */}
        {data.likeCount}

        {/* Share button */}
        <Image path="/general/share.svg" alt="Share" />

        {/* More options button */}
        <Image path="/general/more.svg" alt="More options" />
      </div>

      {/* Save button */}
      <button
        disabled={mutation.isPending} // Disables the button while the mutation is pending
        onClick={() => mutation.mutate({ id: postId, type: "save" })} // Triggers the save mutation
      >
        {data.isSaved ? "Saved" : "Save"} {/* Displays "Saved" if the post is already saved */}
      </button>
    </div>
  );
};

// Exports the PostInteractions component so it can be used in other parts of the application
export default PostInteractions;