// Import the Axios library for making HTTP requests
import axios from "axios";

// Create a pre-configured Axios instance
const apiRequest = axios.create({
  // Set the base URL for all API requests
  // The value is dynamically loaded from the environment variable VITE_API_ENDPOINT
  baseURL: import.meta.env.VITE_API_ENDPOINT,

  // Include credentials (e.g., cookies, authorization headers) in cross-site requests
  withCredentials: true,
});

// Export the pre-configured Axios instance
// This allows other files to import and use it for making API requests
export default apiRequest;