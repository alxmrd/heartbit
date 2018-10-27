import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles, Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

class patients extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  loadFromServer = () => {
    fetch(`http://localhost:8080/api/patients`)
      .then(result => result.json())
      .then(data => this.setState({ data: data }))
      //.then(parsedJSON => console.log("parsedJSON", parsedJSON))
      .catch(error => console.log("error", error));
  };
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.loadFromServer();
  }

  //   render() {
  //     return (
  //       <div>
  //         <Table striped bordered condensed hover>
  //           <thead>
  //             <tr>
  //               <th>id</th>
  //               <th>name</th>
  //               <th>surname</th>
  //               <th>address</th>
  //               <th>history</th>
  //               <th>description</th>
  //               <th>birthdate</th>
  //               <th>gender</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {this.state.data.map(function(item, key) {
  //               return (
  //                 <tr key={key}>
  //                   <td>{item.id}</td>
  //                   <td>{item.name}</td>
  //                   <td>{item.surname}</td>
  //                   <td>{item.address}</td>
  //                   <td>{item.history}</td>
  //                   <td>{item.description}</td>
  //                   <td>{item.birthdate}</td>
  //                   <td>{item.gender}</td>
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </Table>
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>surname</TableCell>
              <TableCell>address</TableCell>
              <TableCell>history</TableCell>
              <TableCell>description</TableCell>
              <TableCell>birthdate</TableCell>
              <TableCell>gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.surname}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.history}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.birthdate}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Tooltip title="Add Volunteer">
          <Button
            onClick={this.handleClickOpen}
            variant="fab"
            color="secondary"
            className={classes.absolute}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Patient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Insert The Name Of The Patient
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="name"
              fullWidth
            />
            <DialogContentText>
              Please Insert The Surname Of The Patient
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="surname"
              label="surname"
              type="surname"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Insert
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

patients.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(patients);