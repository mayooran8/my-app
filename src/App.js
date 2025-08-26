import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';

import './App.css'; // Keep this if you have custom styles

function App() {
  return (
    <Router>
      <div className="App">
        {/* This is where a navigation bar would go later */}
        <Routes>
          {/* Define which component to show for each URL path */}
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
