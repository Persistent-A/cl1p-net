import ClipPanel from './components/ClipPanel';
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:url' element={<ClipPanel/>}/>
      </Routes>
    </Router>
  );
}

export default App;
