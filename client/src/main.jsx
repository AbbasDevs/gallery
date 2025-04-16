import React, { StrictMode } from "react"; // Import React and StrictMode for development checks
import { createRoot } from "react-dom/client"; // Import createRoot to render the app in the DOM
import "./index.css"; // Import global styles
import { BrowserRouter, Route, Routes } from "react-router"; // Import components for routing
import MainLayout from "./routes/layouts/mainLayout"; // Import the main layout component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query for data fetching and caching

// Lazy-load components to improve initial load time.  This means components are only loaded when they are needed.
const Homepage = React.lazy(() => import("./routes/homepage/homepage")); // Lazy-loaded homepage
const CreatePage = React.lazy(() => import("./routes/createPage/createPage")); // Lazy-loaded create page
const PostPage = React.lazy(() => import("./routes/postPage/postPage")); // Lazy-loaded post page
const ProfilePage = React.lazy(() =>
  import("./routes/profilePage/profilePage")
); // Lazy-loaded profile page
const SearchPage = React.lazy(() => import("./routes/searchPage/searchPage")); // Lazy-loaded search page
const AuthPage = React.lazy(() => import("./routes/authPage/authPage")); // Lazy-loaded authentication page

const queryClient = new QueryClient(); // Create a new QueryClient instance for React Query.  This manages caching, fetching, and updating server state.

createRoot(document.getElementById("root")).render(
  // Render the app into the DOM element with id 'root'
  <StrictMode>
    {/* Enable StrictMode for development.  It helps you find potential problems in your code during development. */}
    <QueryClientProvider client={queryClient}>
      {/* Provide the QueryClient to the app.  Now, any component can use React Query to fetch and manage data. */}
      <BrowserRouter>
        {/* Enable routing. It uses the browser's history API to keep your UI in sync with the URL. */}
        <Routes>
          {/* Define the routes */}
          <Route element={<MainLayout />}>
            {/* Use the MainLayout for these routes.  This provides a consistent layout for your main pages. */}
            <Route path="/" element={<Homepage />} />
            {/* Route for the homepage.  When the user visits the root path (`/`), the `Homepage` component will be rendered. */}
            <Route path="/create" element={<CreatePage />} />
            {/* Route for the create page.  When the user visits `/create`, the `CreatePage` component will be rendered. */}
            <Route path="/pin/:id" element={<PostPage />} />
            {/* Route for a specific post.  This is a dynamic route.  The `:id` is a parameter that can change. */}
            <Route path="/:username" element={<ProfilePage />} />
            {/* Route for a user's profile.  This is a dynamic route.  The `:username` is a parameter that can change. */}
            <Route path="/search" element={<SearchPage />} />
            {/* Route for the search page.  When the user visits `/search`, the `SearchPage` component will be rendered. */}
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          {/* Route for the authentication page.  This route is outside the `MainLayout`, meaning it won't be wrapped by the `MainLayout` component. */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);