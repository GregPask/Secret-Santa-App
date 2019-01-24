import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";

import config from "../config";

class Login extends Component {
    displayName = 'Login'

    state = {
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        errors: ""
    };

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();

        let loginData = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(config.LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((res) => res.json())
        .then((data) => {

            if (data.token) {
                localStorage.setItem("token", data.token);
                this.props.loginUser();

                this.setState({
                    loggedIn: true
                })


            } else {
                this.setState({
                    errors: "Unknown User"
                })
            }
        })
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div>
                <br />
                <h2 id="regTitle" style={{ textAlign: "center" }}>Login Form</h2>
                <div id="registerCard" className="card">
                    <form id="registerForm">
                        <div className="group-input">
                            <label>Username</label>
                            <input name="username" onChange={this.changeHandler} className="form-control" id="username" placeholder="" />
                            <hr />
                        </div>
                        <div className="group-input">
                            <label>Password</label>
                            <input name="password" onChange={this.changeHandler} className="form-control" id="password" placeholder="" />
                            <hr />

                            {this.state.errors && (
                                <div className="invalid-feedback">{this.state.errors}</div>
                            )}
                        </div>
                        <div>
                            <button onClick={this.submitForm} id="registerSend" className=" float-right btn btn-dark">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authProps: state.auth
    }
}

export default connect(mapStateToProps, { loginUser })(Login);
