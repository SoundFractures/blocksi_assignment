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
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(4),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleSignUp = async () => {
    if (password === passwordConfirm) {
      setIsError("");
      const body = {
        username: username,
        password: password,
      };
      const res = await axios
        .post("/api/auth/register", body)
        .then((res) => console.log(res)) //Redirect with Auth PRoute
        .catch((error) => setIsError(error.response.data.response));
    } else {
      setIsError("Passwords do not match.");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LogRegAvatar title="Sign Up" />
        <form className={classes.form} noValidate>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
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
            onChange={(e) => {
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
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
          />
          <Button
            onClick={() => handleSignUp()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <LogRegRedirect page="/login" text="Have an Account? Sign In!" />
        </form>
      </div>
      <div>
        {!!isError && (
          <Alert severity="warning" className={classes.alert}>
            {isError}
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
