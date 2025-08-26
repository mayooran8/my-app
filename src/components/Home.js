import React from "react";
// CURRENT CODE (causing error):
import Registration from './Home';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to {`Your Project Title`}</h1>
      <p>Manage your data efficiently using our mobile app.</p>
      <Link to="/registration" className="btn btn-primary">
        Register
      </Link>
    </div>
  );
}

export default Home;
