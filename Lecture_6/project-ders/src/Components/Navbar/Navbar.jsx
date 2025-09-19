import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <h1 className="navbar-header">Todo App</h1>
        <ul className="navbar-links-list">
          <li className="navbar-links-list-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-links-list-item">
            <Link to="/todos" className="navbar-link">
              Todos
            </Link>
          </li>
          <li className="navbar-links-list-item">
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
