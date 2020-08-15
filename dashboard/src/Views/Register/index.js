import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import LogRegAvatar from "./../Components/logregAvatar";
import logregRedirect from "./../Components/logregRedirect";
import LogRegRedirect from "./../Components/logregRedirect";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function Login(props) {
    const classes = useStyles();
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = async () => {
       
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <LogRegAvatar title="Sign Up"/>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirm"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    />
                    <Button
                        onClick={signIn}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <LogRegRedirect page="/login" text="Have an Account? Sign In!"/>
                    
                </form>
            </div>
            <div>
                
                {isError && (
                    <Alert severity="error">
                        Login faild, check your email and password
                    </Alert>
                )}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © Blocksi "} {new Date().getFullYear()}
        </Typography>
    );
}
export default Login;
