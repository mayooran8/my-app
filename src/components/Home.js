import React from "react";
import Registration from './Home';
import { Link } from "react-router-dom";
<Link to="/users" className="btn btn-outline-primary ms-2">View Users</Link>

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to {`Mayoo's App`}</h1>
      <p>Manage your data efficiently using our mobile app.</p>
      <Link to="/registration" className="btn btn-primary">
        Register
      </Link>
    </div>
  );
}

export default Home;
