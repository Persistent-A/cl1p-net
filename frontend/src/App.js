import ClipPanel from "./components/ClipPanel"; // Import the ClipPanel component from the specified path
import Home from "./components/Home"; // Import the Home component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import the necessary components from react-router-dom

function App() {
  return (
    <Router> {/* Create a Router component for managing routing */}
      <Routes> {/* Define the routes */}
        <Route path="/" element={<Home />} /> {/* Render the Home component when the path is "/" */}
        <Route path="/:url" element={<ClipPanel />} /> {/* Render the ClipPanel component when the path is "/:url" */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component for use in other files
