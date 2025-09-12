import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <h1 className="home-page-title">Welcome to my Todo App!</h1>
        <p className="home-page-description">
          Manage your tasks efficiently and stay organized with our powerful and
          easy-to-use Todo App.
        </p>
        <Link to="/todos" className="home-page-button">
          Look into todos!
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
