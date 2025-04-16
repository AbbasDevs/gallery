// Import the CSS file for styling the ProfilePage component
import "./profilePage.css";

// Import the Image component for rendering images
import Image from "../../components/image/image";

// Import the useState hook for managing local state
import { useState } from "react";

// Import the Gallery component for displaying a collection of items
import Gallery from "../../components/gallery/gallery";

// Import the useQuery hook from React Query for data fetching and caching
import { useQuery } from "@tanstack/react-query";

// Import the useParams hook from react-router to access URL parameters
import { useParams } from "react-router";

// Import the pre-configured Axios instance for making API requests
import apiRequest from "../../utils/apiRequest";

// Import the Boards component for displaying user boards
import Boards from "../../components/boards/boards";

// Import the FollowButton component for handling follow/unfollow actions
import FollowButton from "./FollowButton";

// Define the ProfilePage component
const ProfilePage = () => {
  // Local state to manage the type of content being displayed ("saved" or "created")
  const [type, setType] = useState("saved");

  // Extract the "username" parameter from the URL
  const { username } = useParams();

  // Use the useQuery hook to fetch user profile data based on the username
  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username], // Unique key for caching and identifying this query
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data), // Function to fetch data from the API
  });

  // Display a loading message while the data is being fetched
  if (isPending) return "Loading...";

  // Display an error message if the API request fails
  if (error) return "An error has occurred: " + error.message;

  // Display a message if no user data is found
  if (!data) return "User not found!";

  // Render the ProfilePage component
  return (
    <div className="profilePage">
      {/* Render the user's profile image */}
      <Image
        className="profileImg"
        w={100}
        h={100}
        path={data.img || "/general/noAvatar.png"}
        alt=""
      />

      {/* Render the user's display name */}
      <h1 className="profileName">{data.displayName}</h1>

      {/* Render the user's username */}
      <span className="profileUsername">@{data.username}</span>

      {/* Render the follower and following counts */}
      <div className="followCounts">
        {data.followerCount} followers · {data.followingCount} followings
      </div>

      {/* Render the profile interaction buttons */}
      <div className="profileInteractions">
        <Image src="/general/share.svg" alt="" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image src="/general/more.svg" alt="" />
      </div>

      {/* Render the content type options ("Created" or "Saved") */}
      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>

      {/* Conditionally render the Gallery or Boards component based on the selected type */}
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

// Export the ProfilePage component as the default export of the file
export default ProfilePage;
