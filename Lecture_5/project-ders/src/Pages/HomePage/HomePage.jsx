import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-header">Welcome to the Todo App</h1>
        <p className="home-description">
          A todo app helps you organize your tasks, set priorities, and track
          your progress. Easily add, edit, and remove tasks to stay productive
          every day!
        </p>
        <button className="home-button">Look at Todos!</button>
      </div>
    </div>
  );
}

export default HomePage;
