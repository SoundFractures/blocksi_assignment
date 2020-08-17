import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Formik, useField } from "formik";
import * as yup from "yup";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { logout } from "./../../Auth/actions";

const validationSchema = yup.object({
  firstName: yup.string().required().min(3).max(10),
  lastName: yup.string().required().min(3).max(10),
  phoneNumber: yup.string().required().min(6).max(12),
});
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  table: {
    width: "auto",
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
  },
  form: {
    width: "auto",
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
  },
  formTopHeader: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  formTextField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),

    width: "auto",
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  activeRow: {
    backgroundColor: theme.palette.primary.light,
    textDecorationColor: "white",
  },
}));

const CustomField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

function Contacts(props) {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [editID, setEditID] = useState("");
  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  //Handles getting all Contacts from User
  const getContacts = async () => {
    await axios
      .get("/api/contacts", header)
      .then((res) => setContacts(res.data))
      .catch((error) => handleUnauthorized(error));
  };

  //Handles create / update Contact
  const handleContact = async (data) => {
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      user_id: props.user,
    };
    !!editID
      ? await axios
          .put(`/api/contacts/${editID}`, body, header)
          .catch((error) => handleUnauthorized(error))
      : await axios
          .post("/api/contacts", body, header)
          .catch((error) => handleUnauthorized(error));

    await getContacts();
    setEditID("");
  };
  //Handles logging out token is not valid or missing
  const handleUnauthorized = (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      props.logout();
    }
  };

  //Handles delete Contact
  const deleteContact = async (id, resetForm) => {
    await axios
      .delete(`/api/contacts/${id}`, header)
      .catch((error) => handleUnauthorized(error));
    await getContacts();
    setEditID("");
    resetForm();
  };

  //Handles populating the form for Contact update
  const prepareUpdate = (id, contact, setFieldValue) => {
    setFieldValue("firstName", contact.firstName);
    setFieldValue("lastName", contact.lastName);
    setFieldValue("phoneNumber", contact.phoneNumber);
    setEditID(id);
  };

  //Handles removing data for updating a Contact
  const cancelUpdate = (resetForm) => {
    setEditID("");
    resetForm();
  };

  //Handles getting all initial Contacts
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Formik
      validationOnChage={true}
      initialValues={{ firstName: "", lastName: "", phoneNumber: "" }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await handleContact(data);
        resetForm();
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Paper className={classes.form}>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography className={classes.formTopHeader}>
                  {!!editID ? "Update" : "Create"} Contact
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3} className={classes.formTextField}>
                <CustomField label="First Name" name="firstName" type="input" />
              </Grid>
              <Grid item xs={3} className={classes.formTextField}>
                <CustomField label="Last Name" name="lastName" type="input" />
              </Grid>
              <Grid item xs={3} className={classes.formTextField}>
                <CustomField
                  label="Phone Number"
                  name="phoneNumber"
                  type="input"
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              direction="row-reverse"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {!!editID ? "Update" : "Add"}
                </Button>
              </Grid>
              {!!editID ? (
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={isSubmitting}
                    onClick={() => cancelUpdate(resetForm)}
                  >
                    Cancel
                  </Button>
                </Grid>
              ) : (
                <div></div>
              )}
            </Grid>
          </Paper>
          {contacts.length === 0 ? (
            <Typography className={classes.formTopHeader}>
              No Contacts :(
            </Typography>
          ) : (
            <TableContainer component={Paper} className={classes.table}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow
                      key={contact._id}
                      className={
                        editID === contact._id ? classes.activeRow : null
                      }
                    >
                      <TableCell component="th" scope="row">
                        {contact.firstName}
                      </TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.phoneNumber}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={() =>
                            prepareUpdate(contact._id, contact, setFieldValue)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={() => deleteContact(contact._id, resetForm)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </form>
      )}
    </Formik>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Contacts);
