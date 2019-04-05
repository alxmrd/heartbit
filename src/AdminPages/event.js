import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles, Tooltip } from "@material-ui/core";
import { fetchEvents } from "../store/actions/actions";
import moment from "moment";
import "../containers/Icons.css";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActionsWrapped from "../components/TablePaginationActions";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    float: "right"
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Event extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false,
      page: 0,
      rowsPerPage: 5
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
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, event } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div className={classes.root}>
          <Toolbar>
            <i className="material-icons teal600 md-36">add_location</i>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Περιστατικά
            </Typography>
          </Toolbar>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Διεύθυνση</TableCell>
                <TableCell>Γεωγραφικό Πλάτος</TableCell>
                <TableCell>Γεωγραφικό Μήκος</TableCell>
                <TableCell>Ημερομηνία / Ώρα</TableCell>
                <TableCell>Ανταπόκριση</TableCell>
                <TableCell>Κατάσταση</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event
                .slice(0)
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map(row => {
                  var hours24 = moment(row.datetime, "YYYY-MM-DD H:mm:ss").add(
                    24,
                    "hours"
                  );

                  var now = moment().format("YYYY-MM-DD H:mm:ss");
                  var active = moment(now).isBefore(hours24);
                  return (
                    <TableRow key={row.id} className={classes.row} hover>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.latitude}</TableCell>
                      <TableCell>{row.longitude}</TableCell>
                      <TableCell>{row.datetime}</TableCell>
                      <TableCell>
                        {row.correspondence === 0 ? (
                          <Tooltip
                            title={row.correspondencetime}
                            placement="bottom"
                          >
                            <i className="material-icons teal600 md-36">
                              check_circle
                            </i>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Χωρίς Ανταπόκριση" placement="bottom">
                            <i className="material-icons red700 md-36">
                              cancel
                            </i>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell>
                        {active ? (
                          <i className="material-icons teal600 md-36">
                            notifications_active
                          </i>
                        ) : (
                          <i className="material-icons red700 md-36">
                            notifications_off
                          </i>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter className={classes.tableWrapper}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={event.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: false
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Fragment>
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
