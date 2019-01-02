import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        registered: false
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitForm = (e) => {
        e.preventDefault();

        let { username, password, email } = this.state;

        let data = {
            username: username,
            password: password,
            email,
        }


        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                let token = data.token;

                localStorage.setItem("token", token);


                if (token) {
                    this.setState({
                        registered: true
                    })

                    this.props.loginUser();



                }


            }).catch((err) => console.log(err));



    }
    render() {



        if (this.state.registered) {
            return <Redirect to='/user' />;
        }
        return (
            <div>
                <br />
                <h2 id="regTitle" style={{ textAlign: "center" }}>Register Form</h2>
                <div id="registerCard" className="card">
                    <form id="registerForm">
                        <div className="group-input">
                            <label>Username</label>
                            <input name="username" onChange={this.changeHandler} className="form-control" id="username" placeholder="" />
                            <hr />
                        </div>
                        <div className="group-input">
                            <label>Email</label>
                            <input name="email" onChange={this.changeHandler} className="form-control" id="email" placeholder="" />
                            <hr />
                        </div>
                        <div className="group-input">
                            <label>Password</label>
                            <input name="password" onChange={this.changeHandler} className="form-control" id="password" placeholder="" />
                            <hr />
                        </div>
                        <div>
                            <button onClick={this.submitForm} id="registerSend" className=" float-right btn btn-dark">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        authProp: state.auth
    }
}

export default connect(mapStateToProps, { loginUser })(Register);