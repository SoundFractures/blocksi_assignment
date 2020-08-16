import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Initial from "./Views";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Initial}></Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
