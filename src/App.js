import React, { Component } from 'react';

import "./scss/App.scss";

import { Route, Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route name="register" path="/register" component={Register} />
          <Route exact path="/user" component={User} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
export default App;