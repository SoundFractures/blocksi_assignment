import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, auth: auth, ...rest }) {
  const { token } = auth;

  PrivateRoute.propTypes = {
    isAuth: PropTypes.bool,
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { referer: props.location },
            }}
          />
        )
      }
    />
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
