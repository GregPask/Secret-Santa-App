import React, { Component } from 'react';
import classnames from "classnames";
import { Redirect } from "react-router-dom";

import { logoutUser } from "../Actions/authActions";
import { connect } from "react-redux";

class User extends Component {
    state = {
        token: localStorage.getItem("token"),
        userName: "",
        usersAdded: [],
        usersLeft: 3,
        name: "",
        email: "",
        errors: {},
        logout: false,
        dashboard: false,
        backendErrors: []
    };

    logout = () => {
        localStorage.removeItem("token");

        this.setState({
            logout: true
        })

        this.props.logoutUser();
    }

    changeHandler = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteUser = (id) => {

        let userCopy = this.state.usersAdded.slice();
        let filter = userCopy.filter((users) => users.name !== id);

        this.setState({
            usersAdded: filter,
            usersLeft: this.state.usersLeft + 1
        })
    }

    finalSubmit = (e) => {
        e.preventDefault();

        let data = this.state.usersAdded.slice();

        let user = {
            participants: [
                ...data
            ]
        };

        console.log(user);

        fetch("http://localhost:8080/api/santa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify(user)
        })

            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.errors) {
                    this.setState({
                        backendErrors: data.errors
                    })
                } else {

                    // $("#modelId").modal("toggle");

                    this.setState({
                        dashboard: true
                    })
                }
            }).catch((err) => console.log(err));
    }

    cancelBackend = () => {
        this.setState({
            backendErrors: []
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        let { name, email } = this.state;

        let errorCopy = Object.assign({}, this.state.errors);
        let nameError = [];
        let emailError = [];

        if (name === "") {
            nameError.push("Name field Required!");
            errorCopy["name"] = nameError;
            this.setState({
                errors: errorCopy
            })

        } else {
            this.setState({
                errors: errorCopy
            })
        }

        if (email === "") {
            emailError.push("Email field Required!");
            errorCopy["email"] = emailError;
            this.setState({
                errors: errorCopy
            })

        } else {

            errorCopy["email"] = [];
            this.setState({
                errors: errorCopy
            })
        }

        if (name !== "" && email !== "") {

            let userDetails = {
                name: name,
                email: email
            }

            let currentUsers = this.state.usersAdded.slice();
            currentUsers.push(userDetails);

            this.setState({
                usersAdded: currentUsers,
                name: "",
                email: "",
                usersLeft: this.state.usersLeft - 1
            })
        } else {
            return;
        }

        this.setState({
            errors: {}
        })
    }

    componentDidMount() {

        fetch("http://localhost:8080/api/users/principal", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    userName: data.username
                })
            });
    }

    render() {

        if (this.state.dashboard) {
            return <Redirect to="/dashboard" />
        }

        console.log(this.props.authProp);
        console.log(this.state.token);

        if (!this.state.token) {
            return <Redirect to="/" />;
        }

        if (this.state.logout) {
            return <Redirect to='/' />;
        }

        let { usersLeft } = this.state;
        let userMessage = "";
        if (usersLeft > 0 && usersLeft <= 3) {
            userMessage = `${usersLeft} users left to add!`;
        }


        let welcomeMessage = "";

        if (this.state.userName !== "") {
            welcomeMessage = "Welcome " + this.state.userName;
        } else {
            welcomeMessage = "";
        }

        let addedUsers = this.state.usersAdded.map((user) => {
            return (
                <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><button id="userButtons" onClick={this.deleteUser.bind(this, user.name)}>Delete</button></td>
                </tr>
            );
        })

        return (
            <div className="userPage" >
                <div className="container">
                    <h2>{welcomeMessage}</h2>
                    <hr />
                    <p>You must now add a list of people you want to </p>
                    <button onClick={this.logout} className="btn btn-dark">LOGOUT USER</button>
                    <br />  <br />
                    <div className="row">
                        <div className="col-lg-5">
                            <form style={{ maxWidth: "400px" }} id="addUsers">
                                <div className="group-input">
                                    <label for="user">Name:</label><br />
                                    <input name="name" onChange={this.changeHandler} className={classnames("form-control", {
                                        "is-invalid": this.state.errors.name
                                    })} type="text" placeholder=". . ." />
                                    {this.state.errors.name && (
                                        <div className="invalid-feedback">{this.state.errors.name}</div>
                                    )}
                                </div>
                                <br />
                                <div className="group-input">
                                    <label for="user">Email:</label><br />
                                    <input requried type="email" value={this.state.email} name="email" onChange={this.changeHandler}
                                        className={classnames("form-control", { "is-invalid": this.state.errors.email })}
                                        placeholder=". . ." />
                                    {this.state.errors.email && (
                                        <div className="invalid-feedback">{this.state.errors.email}</div>
                                    )}
                                </div>
                                <div>
                                    <br />
                                    <button disabled={this.state.usersLeft === 0 ? true : false} className="btn btn-dark" onClick={this.submitForm}>Add</button>
                                </div>
                            </form>
                        </div>
                        <div id="middle" className="col-lg-2"></div>
                        <div className="col-lg-5">
                            <h4>Added Users</h4>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addedUsers}
                                </tbody>
                            </table>
                            <hr />
                            <br />
                            <div>
                                <button onClick={this.checkLength} disabled={this.state.usersLeft === 0 ? false : true} className="btn btn-success" data-toggle="modal" data-target="#modelId" id="finalSubmit">Final Submit</button>
                                <br /><br /><br /><br />
                                <p>{userMessage}</p>
                                <div class="modal fade" id="modelId" tabindex="-1">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            </div>
                                            <div class="modal-body">
                                                Are You Happy With your Final Selection?
                                            </div>
                                            <p style={{ fontSize: "22px", color: "red" }}>{this.state.backendErrors[0]}</p>
                                            <div class="modal-footer">
                                                <button onClick={this.cancelBackend} type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
                                                <button onClick={this.finalSubmit} type="submit" data-dismiss="modal" class="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { logoutUser })(User);