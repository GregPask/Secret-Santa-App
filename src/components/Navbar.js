import React, { Component, Fragment } from 'react';

import "../scss/App.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    grow: {
      flexGrow: 1
    }
};

class Navbar extends Component {
    state = {};

    logoutUser = () => this.props.logoutUser();

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography variant="body1" className={classes.grow}>
                        <Button component={Link} to="/">Secret Santa</Button>
                    </Typography>
                    {
                        !this.props.authProp.authenticated ? 
                        (
                            <Fragment>
                                <Button component={Link} to="/login">Login</Button>
                                <Button component={Link} to="/register">Sign Up</Button>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <Button component={Link} to="/" onClick={this.logoutUser}>Logout</Button>
                            </Fragment>
                        )
                    }     
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authProp: state.auth
    };
}

export default withStyles(styles)(connect(mapStateToProps, { logoutUser })(Navbar));
