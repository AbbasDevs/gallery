// Importing the GalleryItem component for rendering individual gallery items
import GalleryItem from "../galleryItem/galleryItem";

// Importing the CSS file for styling the Gallery component
import "./gallery.css";

// Importing the useInfiniteQuery hook from React Query for infinite scrolling and data fetching
import { useInfiniteQuery } from "@tanstack/react-query";

// Importing the InfiniteScroll component for implementing infinite scrolling
import InfiniteScroll from "react-infinite-scroll-component";

// Importing Axios for making HTTP requests
import axios from "axios";

// Importing the Skeleton component for displaying a loading placeholder
import Skeleton from "../skeleton/skeleton";

// Function to fetch pins from the server
// Parameters:
// - pageParam: The cursor for pagination (used to fetch the next set of pins).
// - search: The search query for filtering pins (optional).
// - userId: The ID of the user whose pins are being fetched (optional).
// - boardId: The ID of the board whose pins are being fetched (optional).
const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  // Sends a GET request to the server with the provided parameters
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}`
  );

  // Returns the server's response data
  return res.data;
};

// The Gallery component is responsible for rendering a grid of gallery items with infinite scrolling.
// Props:
// - search: A search query for filtering the gallery items (optional).
// - userId: The ID of the user whose gallery items are being displayed (optional).
// - boardId: The ID of the board whose gallery items are being displayed (optional).
const Gallery = ({ search, userId, boardId }) => {
  // Using the useInfiniteQuery hook to fetch and manage paginated data
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    // Unique key for caching the query
    queryKey: ["pins", search, userId, boardId],

    // Function to fetch the data for the current page
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId }),

    // Initial page parameter for the query
    initialPageParam: 0,

    // Function to determine the next page parameter based on the last page's data
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  // If the query is still loading, display the Skeleton component as a placeholder
  if (status === "pending") return <Skeleton />;

  // If an error occurs during the query, display an error message
  if (status === "error") return "Something went wrong...";

  // Flattening the paginated data into a single array of pins
  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  // JSX for rendering the Gallery component
  return (
    <InfiniteScroll
      // The current length of the data (used to track the scroll position)
      dataLength={allPins.length}

      // Function to fetch the next page of data when the user scrolls to the bottom
      next={fetchNextPage}

      // Boolean indicating whether there are more pages to load
      hasMore={!!hasNextPage}

      // Loader component displayed while fetching the next page
      loader={<h4>Loading more pins</h4>}

      // Message displayed when all pages have been loaded
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      {/* Container for the gallery grid */}
      <div className="gallery">
        {/* Mapping over the flattened array of pins to render each GalleryItem */}
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

// Exports the Gallery component so it can be used in other parts of the application
export default Gallery;
