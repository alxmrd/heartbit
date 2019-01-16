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
import moment from "moment";
import "../containers/Icons.css";

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
              <TableCell>Ανταπόκριση</TableCell>
              <TableCell>Διεύθυνση</TableCell>
              <TableCell>Γεωγραφικό Πλάτος</TableCell>
              <TableCell>Γεωγραφικό Μήκος</TableCell>
              <TableCell>Ημερομηνία / Ώρα</TableCell>
              <TableCell>Κατάσταση</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event
              .slice(0)
              .reverse()
              .map(function(item, key) {
                var hours24 = moment(item.datetime, "YYYY-MM-DD H:mm:ss").add(
                  24,
                  "hours"
                );

                var now = moment().format("YYYY-MM-DD H:mm:ss");
                var active = moment(now).isBefore(hours24);
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.correspondence}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.latitude}</TableCell>
                    <TableCell>{item.longitude}</TableCell>
                    <TableCell>{item.datetime}</TableCell>
                    <TableCell>
                      {active ? (
                        <i className="material-icons teal600 md-36">
                          notifications_active
                        </i>
                      ) : (
                        <i className="material-icons red700 md-36">
                          notification_important
                        </i>
                      )}
                    </TableCell>
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
  event: state.event,
  active: state.eventSuccessData.active
});

const mapDispatchToProps = dispatch => ({
  onfetchEvents: () => fetchEvents(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventWithStyles);
