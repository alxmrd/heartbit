import React, { Component, Fragment } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { fetchPatients, newPatient } from "../store/actions/actions";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TablePaginationActionsWrapped from "../components/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import FaceIcon from "@material-ui/icons/Face";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core";
import InsertPatientDialog from "../components/PatientComponents/InsertPatientDialog";

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
    position: "fixed",
    bottom: theme.spacing.unit * 6.5,
    right: theme.spacing.unit * 3,
    boxShadow: "5px 5px  5px grey "
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
      main: "#6747e5"
    },
    secondary: {
      main: "#d86187"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class patients extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false,
      page: 0,
      rowsPerPage: 5,
      gender: "0",
      hasChanged: false,
      name: "",
      surname: "",
      address: "",
      history: "",
      birthdate: "",
      description: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();

    const dataPouStelnw = {
      gender: this.state.gender,
      email: this.state.email,
      birthdate: this.state.birthdate,
      description: this.state.description,
      history: this.state.history,

      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address
    };

    this.props.onNewPatient(dataPouStelnw);
    this.handleClose();
  };
  handleChangeNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber,
      hasChanged: true
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,

      hasChanged: true
    });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, hasChanged: false });
  };
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchPatients();
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };

  render() {
    const { classes, patients } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div className={classes.root}>
          <Toolbar>
            <i className="material-icons teal600 md-36">healing</i>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Aσθενείς
            </Typography>
          </Toolbar>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Όνομα</TableCell>
                <TableCell>Επώνυμο</TableCell>
                <TableCell>Διεύθυνση</TableCell>
                <TableCell>Έτος Γέννησης</TableCell>
                <TableCell>Φύλο</TableCell>
                <TableCell>Ιστορικό</TableCell>
                <TableCell>Περιγραφή</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow key={row.id} className={classes.row} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.surname}</TableCell>
                      <TableCell>{row.address}</TableCell>

                      <TableCell>{row.birthdate}</TableCell>
                      <TableCell>
                        {row.gender === 0 ? (
                          <MuiThemeProvider theme={theme}>
                            <Tooltip title="Άντρας" placement="bottom">
                              <IconButton
                                color="primary"
                                aria-label="Directions"
                              >
                                <FaceIcon
                                  className="material-icons md-36"
                                  aria-label="Αναζήτηση"
                                />
                              </IconButton>
                            </Tooltip>
                          </MuiThemeProvider>
                        ) : (
                          <MuiThemeProvider theme={theme}>
                            <Tooltip title="Γυναίκα" placement="bottom">
                              <IconButton
                                color="secondary"
                                //className={classes.iconButton}
                                aria-label="Directions"
                              >
                                <FaceIcon
                                  className="material-icons md-36"
                                  aria-label="Αναζήτηση"
                                />
                              </IconButton>
                            </Tooltip>
                          </MuiThemeProvider>
                        )}
                      </TableCell>
                      <TableCell>{row.history}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter className={classes.tableWrapper}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={patients.length}
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
          <Tooltip title="Εισαγωγή Ασθενή">
            <Fab
              onClick={this.handleClickOpen}
              color="secondary"
              className={classes.absolute}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <InsertPatientDialog
            open={this.state.open}
            onClose={this.handleClose}
            onGenderChange={this.handleGenderChange}
            gender={this.state.gender}
            onCreateFormChangeNumber={this.handleChangeNumber}
            onCreateFormChange={this.handleChange}
            hasChanged={this.state.hasChanged}
            onCreate={this.handleSubmit}
          />
        </Paper>
      </Fragment>
    );
  }
}

patients.propTypes = {
  classes: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  onfetchPatients: PropTypes.func.isRequired,
  onNewPatient: PropTypes.func.isRequired
};

const patientWithStyles = withStyles(styles)(patients);

const mapStateToProps = state => ({
  patients: state.patients
});

const mapDispatchToProps = dispatch => ({
  onfetchPatients: () => fetchPatients(dispatch),
  onNewPatient: dataPouStelnw => newPatient(dispatch, dataPouStelnw)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(patientWithStyles);
