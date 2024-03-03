import './App.css';
import Navbar from './Components/Navbar';
import Carosuel from './Components/Carosuel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommonForm from './Components/CommonForm';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Carosuel />} />
        <Route path="/form/:sport" element={<CommonForm />} />
      </Routes>
    </Router>

    
    
    </div>
  );
}

export default App;
