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

class Event extends Component {
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
    fetch(`http://localhost:8080/api/event`)
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
              <TableCell>correspondence</TableCell>
              <TableCell>email</TableCell>
              <TableCell>lat</TableCell>
              <TableCell>long</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.correspondence}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.lat}</TableCell>
                  <TableCell>{item.long}</TableCell>
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
          <DialogTitle id="form-dialog-title">New Event</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Insert lat</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="lat"
              label="lat"
              type="lat"
              fullWidth
            />
            <DialogContentText>Please Insert long</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="long"
              label="long"
              type="long"
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

Event.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Event);

//   render() {
//     return (
//       <div>
//         <Table striped bordered condensed hover>
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>correspodence</th>
//               <th>email</th>
//               <th>lat</th>
//               <th>long</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.data.map(function(item, key) {
//               return (
//                 <tr key={key}>
//                   <td>{item.id}</td>
//                   <td>{item.correspodence}</td>
//                   <td>{item.email}</td>
//                   <td>{item.lat}</td>
//                   <td>{item.long}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>
//     );
//   }
// }
