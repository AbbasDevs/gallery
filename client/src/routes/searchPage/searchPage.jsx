// Import the useSearchParams hook from react-router to access query parameters in the URL
import { useSearchParams } from 'react-router'

// Import the Gallery component, which displays a collection of items
import Gallery from '../../components/gallery/gallery'

// Import the CSS file for styling the SearchPage component
import './searchPage.css'

// Define the SearchPage component
const SearchPage = () => {
  // Use the useSearchParams hook to retrieve query parameters from the URL
  let [searchParams] = useSearchParams()

  // Extract the "search" query parameter from the URL
  const search = searchParams.get("search")

  // Extract the "boardId" query parameter from the URL
  const boardId = searchParams.get("boardId")

  // Render the Gallery component, passing the search and boardId values as props
  return (
    <Gallery search={search} boardId={boardId}/>
  )
}

// Export the SearchPage component as the default export of the file
export default SearchPage