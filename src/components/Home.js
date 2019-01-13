import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <div id="jumbo" className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="content-title">Secret Santa</h1>
                        <br />
                        <Link 
                            to="/register" 
                            id="jumboBtn" 
                            className="btn btn-primary btn-lg" 
                            href="Jumbo action link" 
                            role="button">Sign Up</Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
