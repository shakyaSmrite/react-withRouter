import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/tablePage">Table</Link>
        </li>
        <li>
          <Link to="/newentry">Create a New Entry</Link>
        </li>
        <li>
          <Link to="/imagecount">Counter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
