import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// import AddIcon from "@material-ui/icons/Add";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import {
  fetchDefifrillators,
  changeDefibrillatorFlag,
  changeDefibrillatorLocker
} from "../store/actions/actions";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import FlagIcon from "@material-ui/icons/Flag";
import OutlinedFlagIcon from "@material-ui/icons/OutlinedFlag";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00897b"
    },
    secondary: {
      main: "#e64a19"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class defibrillators extends Component {
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
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };
  handlePresentFlag = (e, id, flag) => {
    e.stopPropagation();

    const defibrillatorData = {
      id: id,
      presentflag: flag
    };
    this.props.onChangeFlag(defibrillatorData);

    // this.setState({
    //   openSnack: false
    // });
    // this.props.onClose();
  };
  handleLocker = (e, id, locker) => {
    e.stopPropagation();

    const defibrillatorData = {
      id: id,
      locker: locker
    };
    this.props.onChangeLocker(defibrillatorData);

    // this.setState({
    //   openSnack: false
    // });
    // this.props.onClose();
  };

  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchDefibrillators();
  }

  render() {
    const { classes, defibrillators } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div className={classes.root}>
          <Toolbar>
            <i className="material-icons teal600 md-36">local_hospital</i>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Aπινιδωτές
            </Typography>
          </Toolbar>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Ημερομηνία Εγκατάστασης</TableCell>
                <TableCell>Ημερομηνία Αναβάθμισης</TableCell>
                <TableCell>Διεύθυνση</TableCell>
                <TableCell>Μοντέλο</TableCell>
                <TableCell>Τρέχουσα Κατάσταση</TableCell>
                <TableCell>Κλείδωμα / Ξεκλείδωμα</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defibrillators
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow key={row.id} className={classes.row} hover>
                      <TableCell>{row.installationdate}</TableCell>
                      <TableCell>{row.upgradedate}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.model}</TableCell>
                      <TableCell>
                        {row.presentflag === 0 ? (
                          <MuiThemeProvider theme={theme}>
                            <IconButton
                              color="primary"
                              // className={classes.iconButton}
                              onClick={e =>
                                this.handlePresentFlag(
                                  e,
                                  row.id,
                                  row.presentflag
                                )
                              }
                              aria-label="Directions"
                            >
                              <FlagIcon
                                className="material-icons md-36"
                                aria-label="Αναζήτηση"
                              />
                            </IconButton>
                          </MuiThemeProvider>
                        ) : (
                          <MuiThemeProvider theme={theme}>
                            <IconButton
                              color="secondary"
                              //className={classes.iconButton}
                              aria-label="Directions"
                              onClick={e =>
                                this.handlePresentFlag(
                                  e,
                                  row.id,
                                  row.presentflag
                                )
                              }
                            >
                              <OutlinedFlagIcon
                                className="material-icons md-36"
                                aria-label="Αναζήτηση"
                              />
                            </IconButton>
                          </MuiThemeProvider>
                        )}
                      </TableCell>

                      <TableCell>
                        {row.locker === 0 ? (
                          <MuiThemeProvider theme={theme}>
                            <IconButton
                              color="primary"
                              aria-label="Directions"
                              onClick={e =>
                                this.handleLocker(e, row.id, row.locker)
                              }
                            >
                              <LockIcon
                                // className={classes.searchIcon}
                                className="material-icons md-36"
                                aria-label="Αναζήτηση"
                              />
                            </IconButton>
                          </MuiThemeProvider>
                        ) : (
                          <MuiThemeProvider theme={theme}>
                            <IconButton
                              color="secondary"
                              // className={classes.iconButton}
                              aria-label="Directions"
                              onClick={e =>
                                this.handleLocker(e, row.id, row.locker)
                              }
                            >
                              <LockOpenIcon
                                className="material-icons md-36"
                                aria-label="Αναζήτηση"
                              />
                            </IconButton>
                          </MuiThemeProvider>
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
                  count={defibrillators.length}
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
defibrillators.propTypes = {
  classes: PropTypes.object.isRequired,
  defibrillators: PropTypes.array.isRequired,
  onfetchDefibrillators: PropTypes.func.isRequired,
  onChangeFlag: PropTypes.func.isRequired,
  onChangeLocker: PropTypes.func.isRequired
};
const defibrillatorsWithStyles = withStyles(styles)(defibrillators);

const mapStateToProps = state => ({
  defibrillators: state.defibrillators
});

const mapDispatchToProps = dispatch => ({
  onfetchDefibrillators: () => fetchDefifrillators(dispatch),

  onChangeFlag: defibrillatorData =>
    dispatch(changeDefibrillatorFlag(defibrillatorData)),
  onChangeLocker: defibrillatorData =>
    dispatch(changeDefibrillatorLocker(defibrillatorData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(defibrillatorsWithStyles);
