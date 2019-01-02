import React, { Component } from 'react';

class Dashboard extends Component {
    state = {
        token: localStorage.getItem("token"),
        userName: "",
        participants: []
    }

    componentDidMount() {


        fetch("http://localhost:8080/api/santa", {
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

        let users = this.state.participants.map((user) => {
            return (
                <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>False</td>
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
                            <th>Email Pending</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users}

                    </tbody>

                </table>

            </div>
        );
    }
}

export default Dashboard;