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

class defibrillators extends Component {
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
    fetch(`http://localhost:8080/api/defibrillators`)
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
              <TableCell>installationdate</TableCell>
              <TableCell>upgradedate</TableCell>
              <TableCell>notes</TableCell>
              <TableCell>model</TableCell>
              <TableCell>presentflag</TableCell>
              <TableCell>locker</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.installationdate}</TableCell>
                  <TableCell>{item.upgradedate}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.presentflag}</TableCell>
                  <TableCell>{item.locker}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Tooltip title="Add Defibrillator">
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
          <DialogTitle id="form-dialog-title">New Defibrillator</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Insert Notes about the Defibrillator
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="notes"
              label="notes"
              type="notes"
              fullWidth
            />
            <DialogContentText>
              Please Insert The model of the Defibrillator
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="model"
              label="model"
              type="model"
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
defibrillators.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(defibrillators);