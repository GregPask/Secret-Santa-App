import React, { Component } from 'react';

import "./scss/App.scss";

import { Route, Link, Switch, Redirect } from "react-router-dom";


import Register from "./JS/Register";
import Login from "./JS/Login";
import Navbar from "./JS/Navbar";
import User from "./JS/User";
import Home from "./JS/Home";
import Dashboard from "./JS/Dashboard";





class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route name="register" exact path="/register" component={Register} />
          <Route exact path="/user" component={User} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
export default App;