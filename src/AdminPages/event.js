import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { fetchEvents } from "../store/actions/actions";

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

  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchEvents();
  }

  render() {
    const { classes, event } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>correspondence</TableCell>
              <TableCell>address</TableCell>
              <TableCell>latitude</TableCell>
              <TableCell>longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.correspondence}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.latitude}</TableCell>
                  <TableCell>{item.longitude}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  onfetchEvents: PropTypes.func.isRequired,
  event: PropTypes.array.isRequired
};

const EventWithStyles = withStyles(styles)(Event);

const mapStateToProps = state => ({
  event: state.event
});

const mapDispatchToProps = dispatch => ({
  onfetchEvents: () => fetchEvents(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventWithStyles);
