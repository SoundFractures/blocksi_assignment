import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles(theme => ({
    avatar: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        display:"flex"
    },

}));

export default function LogRegAvatar(props){
    const classes = useStyles();
    return <div>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            {props.title}
        </Typography>
    </div>
}