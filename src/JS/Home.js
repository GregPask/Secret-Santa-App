import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from "react-router-dom";



class Home extends Component {
    state = {}
    render() {
        return (
            <div id="home">
                <div id="jumbo" class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="content-title">Secret Santa</h1>
                        <hr class="my-2" />
                        <br />
                        <p class="lead">
                            <Link to="/register" id="jumboBtn" class="btn btn-primary btn-lg" href="Jumbo action link" role="button">Sign Up</Link>
                        </p>
                    </div>
                </div>
                <br /><br />
                <div style={{ textAlign: "center" }} className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Some Content</h3>
                            <hr />
                            <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, labore!</p>
                        </div>
                        <div className="col-md-6">
                            <h3>Greg Content</h3>
                            <hr />
                            <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, labore!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Home;

