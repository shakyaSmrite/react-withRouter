import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import ImageCount from "./ImageCount";
import Nav from "./Nav";
import TablePage from "./TablePage";
import NewEntry from "./NewEntry";
import axios from "axios";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tablePage" component={TablePage} />
          <Route path="/imagecount" component={ImageCount} />
          <Route path="/newentry" component={NewEntry} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1> Welcome to the HomePage!</h1>;
  </div>
);

export default App;
