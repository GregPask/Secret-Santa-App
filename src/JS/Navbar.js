import React, { Component } from 'react';
import "../scss/App.scss";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";



class Navbar extends Component {
    state = {}

    logoutUser = () => {

        this.props.logoutUser();
    }

    render() {
        console.log(this.props);
        return (
            <nav id="navbar" class="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="/" class="navbar-brand" href="#">Pasky's </Link>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        {!this.props.authProp.authenticated ? (
                            <div>
                                <li class="nav-item active">
                                    <Link to="/login" class="nav-link" href="#">Login </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/register" class="nav-link" href="#">Register</Link>
                                </li>
                            </div>
                        ) :

                            <div>
                                <li class="nav-item">
                                    <Link to="/" onClick={this.logoutUser} class="nav-link" href="#">Logout</Link>
                                </li>
                            </div>


                        }
                    </ul>
                </div>
            </nav>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        authProp: state.auth
    };
}

export default connect(mapStateToProps, { logoutUser })(Navbar);