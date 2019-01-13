import React, { Component, Fragment } from 'react';

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import config from '../config';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
  });

class Register extends Component {
    displayName = 'Register'

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            usernameError: null,
            email: null,
            password: null,
            registered: false,
            error: null,
            open: false
        };
    }

    handleInputChanged = (e) => {

        let name = e.target.name;
        let input = e.target.value;

        if (name === "username") {

            if (input.length > 0) {

                fetch(config.AVAILABLE + "/" + input, {
                    method: "GET"
                })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.available) {
                        this.setState({
                            open: true,
                            error: "username " + input + " is taken"
                        })
                    }
                });
            } 
        }
       
        this.setState({[name]: input});
    }

    handlePasswordChanged = (e) => this.setState({password: e.target.value});

    handleClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

    submitForm = (e) => {
        e.preventDefault();

        let { username, password, email } = this.state;

        let body = {
            username: username,
            password: password,
            email,
        }

        fetch(config.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                let token = data.token;

                if (token) {
                    localStorage.setItem("token", token);

                    this.setState({
                        registered: true
                    })

                    this.props.loginUser();
                    return;
                }

                // If we are here something has done wrong
                this.setState({
                    open: true, 
                    error: data.errors });

            }).catch((err) => {
                this.setState({
                    open: true, 
                    usernameError: 'dasfs',
                    error: err.message });
            });
    }

    render() {

        const { registered, error, open } = this.state;
        const { classes } = this.props;

        if (registered) {
            return <Redirect to='/user' />;
        }

        const form = (
            <Paper 
                elevation={20} 
                className={classes.root}>
                <Typography variant="h5" component="h3" style={{ textAlign: "center"}}>Sign Up</Typography>
                <form onSubmit={this.submitForm}>
                    <TextField
                        name="username"
                        value={this.state.username}
                        label="Username"
                        margin="dense"
                        fullWidth
                        required
                        onChange={this.handleInputChanged}
                        />
                        <TextField
                        name="email"
                        value={this.state.email}
                        label="Email"
                        margin="dense"
                        required
                        fullWidth
                        onChange={this.handleInputChanged}
                        />
                        <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        required
                        fullWidth
                        onChange={this.handlePasswordChanged} 
                        />
                        <Button 
                        type="submit"
                        variant="contained" 
                        style={{ margin: '16px' }}
                        sizeLarge
                        color="primary">
                            Submit
                        </Button>
                </form>
            </Paper>
        );

        const errors = (
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            ContentProps={{'aria-describedby': 'message-id'}}
            onClose={this.handleClose}
            message={
                <span id="client-snackbar">
                  {error}
                </span> }           
            action={[
                <IconButton
                key="close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
                >
                <CloseIcon />
                </IconButton>
            ]}
            />
        );

        return (
            <Fragment>
                    <Grid
                        container
                        spacing={0}
                        alignItems="flex-start"
                        justify="center"
                        className="registration-form"
                        style={{ minHeight: '100vh' }}
                        >
                        <Grid item lg={6} style={{ paddingTop: '30px'}}>
                            <Grow in timeout={1000}>
                                {form}
                            </Grow>
                            {errors}
                        </Grid>   
                    </Grid> 
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authProp: state.auth
    }
}

export default withStyles(styles)(connect(mapStateToProps, { loginUser })(Register));
