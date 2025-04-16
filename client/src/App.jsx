import './app.css' // Import the app.css file for styling the App component
import Gallery from './components/gallery/gallery' // Import the Gallery component
import LeftBar from './components/leftBar/leftBar' // Import the LeftBar component
import TopBar from './components/topBar/topBar' // Import the TopBar component

// Define the App component, which is the main component of the application
const App = () => {
  return (
    // The main container for the application with the class name 'app'
    <div className='app'>
      {/* Render the LeftBar component */}
      <LeftBar/>
      {/* Container for the main content of the application with the class name 'content' */}
      <div className="content">
        {/* Render the TopBar component */}
        <TopBar/>
        {/* Render the Gallery component */}
        <Gallery/>
      </div>
    </div>
  )
}

// Export the App component so it can be used in other parts of the application
export default App