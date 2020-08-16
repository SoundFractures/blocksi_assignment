import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function Views() {
  const user = null;
  return (
    <div>
      <Link to="/login">
        <Button color="primary">Login</Button>
      </Link>
      <Link to="/register">
        <Button color="primary">Register</Button>
      </Link>
      <Link to="/home">
        <Button color="primary">Home</Button>
      </Link>
    </div>
  );
}

export default Views;
