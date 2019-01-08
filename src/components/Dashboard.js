import React, { Component } from 'react';

import config from '../config';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem("token"),
            userName: null,
            participants: []
        };
    }


    componentDidMount() {

        fetch(config.SECRET_SANTA, {
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
                    userName: data.username,
                    participants: data.participants
                })
            });
    }

    render() {

        let participants = this.state.participants.map((participant) => {
            return (
                <tr>
                    <td>{participant.name}</td>
                    <td>{participant.email}</td>
                    <td>{participant.emailVerified ? "True": "False"}</td>
                </tr>
            );
        })

        return (
            <div>
                <h2>Dashboard</h2>
                <br /><br /><br />
                <table style={{ maxWidth: "500px" }} className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Email Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Dashboard;
