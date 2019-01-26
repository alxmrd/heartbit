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
import {
  fetchPatients,
  newPatient,
  errorMessageCleaner,
  clearPatientData,
  editPatient,
  idCleaner,
  updatePatient
} from "../store/actions/actions";
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
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../components/MySnackbarContentWrapper";
import EditIcon from "@material-ui/icons/Edit";
import EditPatientDialog from "../components/PatientComponents/EditPatientDialog";
import PatientCard from "../components/PatientComponents/PatientCard";

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
      gender: "m", //male
      hasChanged: false,
      name: "",
      surname: "",
      address: "",
      history: "",
      birthdate: "",
      description: "",
      openEditDialog: false,
      openCard: false
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.patient !== prevProps.patient) {
      this.setState({
        ...this.props.patient
      });
    }
    if (
      this.props.newPatient.message !== prevProps.newPatient.message &&
      this.props.newPatient.message === "success"
    ) {
      this.handleClose();
      this.handleCloseEditDialog();
      const newPatientData = this.props.newPatient;

      this.props.onClearPatientData(newPatientData);
    }
  }
  handlePencilClick = (e, id) => {
    e.stopPropagation();
    this.setState({ openEditDialog: true });
    this.props.onEditPatient(id);
  };

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
  };
  handleUpdate = event => {
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
    const id = this.props.id;
    this.props.onUpdatePatient(id, dataPouStelnw);
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
    this.setState({
      open: false,
      hasChanged: false,
      gender: "m",

      name: "",
      surname: "",
      address: "",
      history: "",
      birthdate: "",
      description: ""
    });
  };
  handleCloseEditDialog = () => {
    this.setState({
      openEditDialog: false,
      hasChanged: false,
      gender: "m",

      name: "",
      surname: "",
      address: "",
      history: "",
      birthdate: "",
      description: ""
    });
    const id = this.props.id;
    this.props.onCloseDialog(id);
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
    this.setState({ gender: event.target.value, hasChanged: true });
  };
  handleRowClick = (e, id) => {
    e.stopPropagation();

    this.setState({
      openCard: true
    });
    this.props.onEditPatient(id);
  };
  handleCardClose = () => {
    this.setState({ openCard: false });
    const id = this.props.id;
    this.props.onCloseDialog(id);
  };

  render() {
    const { classes, patients, errormessage, patient } = this.props;
    const { rowsPerPage, page, gender } = this.state;
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

                <TableCell>Ιστορικό</TableCell>
                <TableCell>Περιγραφή</TableCell>
                <TableCell>Φύλο</TableCell>
                <TableCell>Επεξεργασία Ασθενή</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      key={row.id}
                      className={classes.row}
                      hover
                      onClick={e => this.handleRowClick(e, row.id)}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.surname}</TableCell>
                      <TableCell>{row.address}</TableCell>

                      <TableCell>{row.birthdate}</TableCell>

                      <TableCell>{row.history}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        {row.gender === "m" ? (
                          <MuiThemeProvider theme={theme}>
                            <Tooltip title="Άνδρας" placement="bottom">
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
                        ) : row.gender === "f" ? (
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
                        ) : (
                          <MuiThemeProvider theme={theme}>
                            <Tooltip title="Άλλο" placement="bottom">
                              <IconButton
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
                      <TableCell>
                        <IconButton
                          onClick={e => this.handlePencilClick(e, row.id)}
                          color="inherit"
                        >
                          <Tooltip
                            title="Επεξεργασία Απινιδωτή"
                            placement="bottom"
                          >
                            <EditIcon />
                          </Tooltip>
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
            gender={gender}
            onCreateFormChangeNumber={this.handleChangeNumber}
            onCreateFormChange={this.handleChange}
            hasChanged={this.state.hasChanged}
            onCreate={this.handleSubmit}
          />
          <EditPatientDialog
            open={this.state.openEditDialog}
            onClose={this.handleCloseEditDialog}
            onGenderChange={this.handleGenderChange}
            gender={this.state.gender}
            onEditFormChangeNumber={this.handleChangeNumber}
            onEditFormChange={this.handleChange}
            hasChanged={this.state.hasChanged}
            onUpdate={this.handleUpdate}
            patient={patient}
          />
          <PatientCard
            open={this.state.openCard}
            onClose={this.handleCardClose}
            scroll={this.state.scroll}
          />
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={errormessage ? true : false}
          autoHideDuration={6000}
          onClose={errormessage =>
            this.props.onErrorMessageCleaner(errormessage)
          }
        >
          <MySnackbarContentWrapper
            onClose={errormessage =>
              this.props.onErrorMessageCleaner(errormessage)
            }
            variant="error"
            className={classes.margin}
            message={errormessage}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

patients.propTypes = {
  classes: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  onfetchPatients: PropTypes.func.isRequired,
  onNewPatient: PropTypes.func.isRequired,
  errormessage: PropTypes.string,
  onErrorMessageCleaner: PropTypes.func.isRequired,
  onClearPatientData: PropTypes.func,
  newPatient: PropTypes.object,
  onEditPatient: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  id: PropTypes.number,
  patient: PropTypes.object,
  onUpdatePatient: PropTypes.func.isRequired
};

const patientWithStyles = withStyles(styles)(patients);

const mapStateToProps = state => ({
  patients: state.patients,
  errormessage: state.error.patmessage,
  newPatient: state.patientSuccessData,
  id: state.id,
  patient: state.patients.filter(patient => patient.id === state.id)[0] || {}
});

const mapDispatchToProps = dispatch => ({
  onfetchPatients: () => fetchPatients(dispatch),
  onNewPatient: dataPouStelnw => newPatient(dispatch, dataPouStelnw),
  onErrorMessageCleaner: errormessage =>
    dispatch(errorMessageCleaner(errormessage)),
  onClearPatientData: newPatientData =>
    dispatch(clearPatientData(newPatientData)),
  onEditPatient: id => dispatch(editPatient(id)),
  onCloseDialog: id => dispatch(idCleaner(id)),
  onUpdatePatient: (id, dataPouStelnw) =>
    dispatch(updatePatient(id, dataPouStelnw))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(patientWithStyles);
