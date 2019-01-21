import React, { Component, Fragment } from "react";
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
import { fetchPatients } from "../store/actions/actions";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TablePaginationActionsWrapped from "../components/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

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

class patients extends Component {
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
    this.props.onfetchPatients();
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
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
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow key={row.id} className={classes.row} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.surname}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.history}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.birthdate}</TableCell>
                      <TableCell>{row.gender}</TableCell>
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
          <Tooltip title="Add Volunteer">
            <Fab
              onClick={this.handleClickOpen}
              color="secondary"
              className={classes.absolute}
            >
              <AddIcon />
            </Fab>
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
      </Fragment>
    );
  }
}

patients.propTypes = {
  classes: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  onfetchPatients: PropTypes.func.isRequired
};

const patientWithStyles = withStyles(styles)(patients);

const mapStateToProps = state => ({
  patients: state.patients
});

const mapDispatchToProps = dispatch => ({
  onfetchPatients: () => fetchPatients(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(patientWithStyles);
