import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import UserList from './components/UserList';

import Home from './components/Home';
import Register from './components/Registration';
import About from './components/About';
import Users from "./components/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;