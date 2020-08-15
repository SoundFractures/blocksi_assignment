import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
export default function LogRegRedirect(props) {
    return (
        <Link to={props.page}>
            <Typography  variant="body2" align="center">
                {props.text}
            </Typography>
        </Link>
    );
}