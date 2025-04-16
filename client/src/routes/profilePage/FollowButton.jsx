// Import the useMutation and useQueryClient hooks from React Query
// These hooks are used for managing server-side mutations and caching
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import the pre-configured Axios instance for making API requests
import apiRequest from "../../utils/apiRequest";

// Define an asynchronous function to follow or unfollow a user
// This function sends a POST request to the API endpoint for following/unfollowing a user
const followUser = async (username) => {
  const res = await apiRequest.post(`/users/follow/${username}`); // Send a POST request to the follow endpoint
  return res.data; // Return the response data
};

// Define the FollowButton component
// This component renders a button that allows users to follow or unfollow another user
const FollowButton = ({ isFollowing, username }) => {
  // Get the queryClient instance from React Query
  // The queryClient is used to manage and invalidate cached queries
  const queryClient = useQueryClient();

  // Define a mutation using the useMutation hook
  // The mutation is used to handle the follow/unfollow action
  const mutation = useMutation({
    mutationFn: followUser, // Specify the function to execute when the mutation is triggered
    onSuccess: () => {
      // Invalidate the "profile" query for the given username to refresh the data
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });

  // Render the follow/unfollow button
  return (
    <button
      onClick={() => mutation.mutate(username)} // Trigger the mutation when the button is clicked
      disabled={mutation.isPending} // Disable the button while the mutation is in progress
    >
      {isFollowing ? "Unfollow" : "Follow"} {/* Display "Follow" or "Unfollow" based on the isFollowing prop */}
    </button>
  );
};

// Export the FollowButton component as the default export of the file
export default FollowButton;
