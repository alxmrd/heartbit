import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles, Button, Input, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { PostData } from "../containers/PostData";
import SimpleToolips from "../components/SimpleTooltips";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },

  table: {
    minWidth: 700
  },

  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Volunteer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false,
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    PostData("insert", this.state)
      .then(result => {
        let responseJson = result;
        console.log(responseJson);
      })

      .catch(error => console.log("error", error));
    //axios.post('/api/login',{user: this.state});
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadFromServer = () => {
    fetch(`http://localhost:8080/api/volunteers`)
      .then(result => result.json())
      .then(data => this.setState({ data: data }))
      //.then(parsedJSON => console.log("parsedJSON", parsedJSON))
      .catch(error => console.log("error", error));
  };
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.loadFromServer();
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>username</TableCell>
              <TableCell>password</TableCell>
              <TableCell>tel1</TableCell>
              <TableCell>tel2</TableCell>
              <TableCell>name</TableCell>
              <TableCell>surname</TableCell>
              <TableCell>email</TableCell>
              <TableCell>notes</TableCell>
              <TableCell>latesttraining</TableCell>
              <TableCell>dateofbirth</TableCell>
              <TableCell>address</TableCell>
              <TableCell>Delete Volunteer</TableCell>
              <TableCell>Edit Volunteer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>{item.tel1}</TableCell>
                  <TableCell>{item.tel2}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.surname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>{item.latesttraining}</TableCell>
                  <TableCell>{item.dateofbirth}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                    <DeleteIcon />
                  </TableCell>
                  <TableCell>
                    <EditIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <SimpleToolips
          definition="Add Volunteer"
          onButtonClick={() => {
            this.handleClickOpen();
          }}
        />

        <form onSubmit={this.handleSubmit}>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Volunteer</DialogTitle>
            <DialogContent>
              <TextField
                id="username"
                label="Username"
                name="username"
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
                autoFocus
                fullWidth
                margin="normal"
              />
              <TextField
                id="tel1"
                label="Contact Number"
                value={this.state.tel1}
                onChange={this.handleChange}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                id="tel2"
                label="Second Contact Number"
                value={this.state.tel2}
                onChange={this.handleChange}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                name="email"
                label="email"
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                id="dateofbirthday"
                label="Birthday"
                type="date"
                className={classes.container}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                noValidate
                id="latesttraining"
                label="Latest Training"
                type="date"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                className={classes.container}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="submit" color="primary">
                Insert
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Paper>
    );
  }
}
Volunteer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Volunteer);
