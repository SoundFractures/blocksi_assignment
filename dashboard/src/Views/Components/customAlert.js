import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(4),
  },
}));

function CustomAlert(props) {
  const classes = useStyles();
  return (
    <Alert severity="warning" className={classes.alert}>
      {props.text}
    </Alert>
  );
}

export default CustomAlert;
