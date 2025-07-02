import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <Link to="/" className="nav-logo">
          InterviewBit
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/add-blog">Add Blog</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
