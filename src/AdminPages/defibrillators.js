import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import {
  fetchDefifrillators,
  changeDefibrillatorFlag,
  changeDefibrillatorLocker,
  lockerClick,
  SnackClose,
  flagClick,
  editDefibrillator,
  idCleaner
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
import EditDefibrillatorDialog from "../components/DefibrillatorComponents/EditDefibrillatorDialog";
import EditIcon from "@material-ui/icons/Edit";
import DefibrillatorCard from "../components/DefibrillatorComponents/DefibrillatorCard";

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
  },
  deactivateButton: {
    color: "#C62828"
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
      rowsPerPage: 5,
      openSnack: false,
      vertical: "top",
      horizontal: "center",
      openCard: false
    };
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSnackClose = e => {
    e.preventDefault();

    this.setState({ openSnack: false });

    this.props.onSnackClose(this.props.defibrillatorData);
  };

  handlePencilClick = (e, id) => {
    e.stopPropagation();
    this.setState({ open: true });
    this.props.onEditDefibrillator(id);
  };

  handleClose = () => {
    this.setState({ open: false });
    const id = this.props.id;
    this.props.onCloseDialog(id);
  };
  handleCardClose = () => {
    this.setState({ openCard: false });
    const id = this.props.id;
    this.props.onCloseDialog(id);
  };
  handlePresentFlag = (e, id, flag) => {
    e.stopPropagation();

    const defibrillatorData = {
      id: id,
      presentflag: flag
    };
    this.props.onFlagClick(defibrillatorData);
    this.setState({ openSnack: true });
  };
  handleLocker = (e, id, locker) => {
    e.stopPropagation();

    const defibrillatorData = {
      id: id,
      locker: locker
    };
    this.props.onLockerClick(defibrillatorData);
    this.setState({ openSnack: true });
  };
  handleYesClick = (e, defibrillatorData) => {
    e.preventDefault();

    if (
      defibrillatorData.locker === 0 || defibrillatorData.locker === 1
        ? this.props.onChangeLocker(defibrillatorData)
        : this.props.onChangeFlag(defibrillatorData)
    );
    this.setState({ openSnack: false });
    this.props.onSnackClose(defibrillatorData);
  };
  handleRowClick = (e, id) => {
    e.stopPropagation();

    this.setState({
      openCard: true
    });
    this.props.onEditDefibrillator(id);
  };

  componentDidMount() {
    this.props.onfetchDefibrillators();
  }

  render() {
    const { classes, defibrillators, defibrillatorData } = this.props;
    const { rowsPerPage, page, vertical, horizontal, openSnack } = this.state;

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
                <TableCell>Eπεξεργασία Απινιδωτή</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defibrillators
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      key={row.id}
                      onClick={e => this.handleRowClick(e, row.id)}
                      className={classes.row}
                      hover
                    >
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
                      <TableCell>
                        <IconButton
                          onClick={e => this.handlePencilClick(e, row.id)}
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
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
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={this.handleSnackClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Eίστε Σίγουρος;</span>}
            action={[
              <Button
                key="Deactivate"
                // className={classes.deactivateButton}
                color="primary"
                size="small"
                onClick={e => this.handleYesClick(e, defibrillatorData)}
              >
                ναι
              </Button>,

              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={e => this.handleSnackClose(e)}
              >
                οχι
              </Button>
            ]}
          />
        </Paper>
        <EditDefibrillatorDialog
          open={this.state.open}
          onClose={this.handleClose}
        />
        <DefibrillatorCard
          open={this.state.openCard}
          onClose={this.handleCardClose}
          scroll={this.state.scroll}
        />
      </Fragment>
    );
  }
}
defibrillators.propTypes = {
  classes: PropTypes.object.isRequired,
  defibrillators: PropTypes.array.isRequired,
  onfetchDefibrillators: PropTypes.func.isRequired,
  onChangeFlag: PropTypes.func.isRequired,
  onChangeLocker: PropTypes.func.isRequired,
  onLockerClick: PropTypes.func.isRequired,
  onSnackClose: PropTypes.func.isRequired,
  defibrillatorData: PropTypes.object,
  onFlagClick: PropTypes.func.isRequired,
  onEditDefibrillator: PropTypes.func.isRequired,
  id: PropTypes.number,
  onCloseDialog: PropTypes.func.isRequired,
  defibrillator: PropTypes.object,
  onRowClick: PropTypes.func
};
const defibrillatorsWithStyles = withStyles(styles)(defibrillators);

const mapStateToProps = state => ({
  defibrillators: state.defibrillators,
  defibrillatorData: state.defibrillatorData,
  id: state.id
});

const mapDispatchToProps = dispatch => ({
  onfetchDefibrillators: () => fetchDefifrillators(dispatch),
  onLockerClick: defibrillatorData => dispatch(lockerClick(defibrillatorData)),
  onFlagClick: defibrillatorData => dispatch(flagClick(defibrillatorData)),
  onChangeFlag: defibrillatorData =>
    dispatch(changeDefibrillatorFlag(defibrillatorData)),
  onChangeLocker: defibrillatorData =>
    dispatch(changeDefibrillatorLocker(defibrillatorData)),
  onSnackClose: defibrillatorData => dispatch(SnackClose(defibrillatorData)),
  onEditDefibrillator: id => dispatch(editDefibrillator(id)),
  onCloseDialog: id => dispatch(idCleaner(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(defibrillatorsWithStyles);
