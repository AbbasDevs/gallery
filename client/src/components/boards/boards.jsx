// Importing the CSS file for styling the Boards component
import "./boards.css";

// Importing the Image component for rendering optimized images
import Image from "../image/image";

// Importing the useQuery hook from React Query for data fetching and caching
import { useQuery } from "@tanstack/react-query";

// Importing the apiRequest utility for making API requests
import apiRequest from "../../utils/apiRequest";

// Importing the format function from the "timeago.js" library for formatting timestamps
import { format } from "timeago.js";

// Importing the Link component from React Router for navigation
import { Link } from "react-router";

// The Boards component is responsible for rendering a list of boards (collections) for a specific user.
// Props:
// - userId: The ID of the user whose boards are being displayed.
const Boards = ({ userId }) => {
  // Using the useQuery hook to fetch boards for the given user ID
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId], // Unique key for caching the query
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data), // Fetches boards from the server
  });

  // If the query is still loading, display a loading message
  if (isPending) return "Loading...";

  // If an error occurs during the query, display an error message
  if (error) return "An error has occurred: " + error.message;

  // Logs the fetched data to the console for debugging purposes
  console.log(data);

  // JSX for rendering the Boards component
  return (
    <div className="collections">
      {/* Mapping over the fetched boards and rendering each one */}
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`} // Link to the search page filtered by the board ID
          className="collection" // CSS class for styling the board
          key={board._id} // Unique key for each board
        >
          {/* Render the first pin's image as the board's thumbnail */}
          <Image path={board.firstPin.media} alt="" />

          {/* Container for the board's title and additional information */}
          <div className="collectionInfo">
            {/* Board title */}
            <h1>{board.title}</h1>

            {/* Board metadata: number of pins and creation time */}
            <span>
              {board.pinCount} Pins · {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Exports the Boards component so it can be used in other parts of the application
export default Boards;
