import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LogRegAvatar from "./../Components/logregAvatar";
import LogRegRedirect from "./../Components/logregRedirect";
import Copyright from "./../Components/copyright";
import { login } from "./../../Auth/actions";
import { clearErrors } from "./../../Auth/errorActions";
import CustomAlert from "./../Components/customAlert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
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
}));

function Login(props) {
  useEffect(() => {
    const { error } = props;

    if (error.id === "LOGIN_FAIL") {
      setIsError(error.response.response);
    } else {
      setIsError("");
    }
  }, [props.error]);

  Login.propTypes = {
    isAuth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };
  const classes = useStyles();
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const body = {
      username: username,
      password: password,
    };
    props.clearErrors();
    props.login(body);
  };
  const referer = props.location.state && (props.location.state.referer || "/");
  if (props.auth.isAuth) {
    return <Redirect to={referer} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LogRegAvatar title="Sign In" />
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

          <Button
            onClick={() => handleSignIn()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <LogRegRedirect
            page="/register"
            text="Don't have an Account? Sign up!"
          />
        </form>
      </div>
      {!!isError && <CustomAlert text={isError} />}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
