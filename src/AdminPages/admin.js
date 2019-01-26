import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  fetchAdmin,
  newAdmin,
  errorMessageCleaner,
  clearAdminData,
  editAdmin,
  idCleaner,
  updateAdmin
} from "../store/actions/actions";
import { connect } from "react-redux";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InsertAdminDialog from "../components/AdminComponents/InsertAdminDialog";
import EditAdminDialog from "../components/AdminComponents/EditAdminDialog";
import TablePaginationActionsWrapped from "../components/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../components/MySnackbarContentWrapper";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import AdminCard from "../components/AdminComponents/AdminCard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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
    position: "fixed",
    bottom: theme.spacing.unit * 6.5,
    right: theme.spacing.unit * 3,
    boxShadow: "5px 5px  5px grey "
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  tableWrapper: {
    float: "right"
  }
});

class admin extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
      openEditDialog: false,
      hasChanged: false,
      showPassword: false,
      type: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      username: "",
      password: "",
      openCard: false
    };
  }
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchAdmin();
  }
  componentDidUpdate(prevProps) {
    //Typical usage (don't forget to compare props):
    if (this.props.admin !== prevProps.admin) {
      this.setState({
        ...this.props.admin
      });
    }
    if (
      this.props.newAdmin.message !== prevProps.newAdmin.message &&
      this.props.newAdmin.message === "success"
    ) {
      this.handleDialogClose();
      this.handleCloseEditDialog();
      const newAdminData = this.props.newAdmin;

      this.props.onClearAdminData(newAdminData);
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClickAway = () => {
    this.setState({
      open: false,
      hasChanged: false,
      showPassword: false,
      type: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      username: "",
      password: ""
    });
  };

  handleDialogClose = () => {
    this.setState({
      open: false,

      hasChanged: false,
      showPassword: false,
      type: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      username: "",
      password: ""
    });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onGenerate = event => {
    event.preventDefault();

    var generator = require("generate-password");

    var password = generator.generate({
      length: 10,
      numbers: true
    });

    // 'uEyMTw32v9'
    this.setState({
      password: password,
      hasChanged: true
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,

      hasChanged: true
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    const dataPouStelnw = {
      type: this.state.type,
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      username: this.state.username,
      address: this.state.address,
      password: this.state.password
    };

    this.props.onNewAdmin(dataPouStelnw);
  };
  handleEditClick = (e, id) => {
    e.stopPropagation();
    this.setState({ openEditDialog: true });
    this.props.onEditAdmin(id);
  };
  handleCloseEditDialog = () => {
    this.setState({
      openEditDialog: false,
      hasChanged: false,
      showPassword: false,
      type: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      username: "",
      password: ""
    });
    const id = this.props.id;
    this.props.onCloseDialog(id);
  };
  handleUpdate = event => {
    event.preventDefault();

    const dataPouStelnw = {
      type: this.state.type,
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      username: this.state.username,
      address: this.state.address,
      password: this.state.password
    };
    const id = this.props.id;
    this.props.onUpdateAdmin(id, dataPouStelnw);
  };
  handleRowClick = (e, id) => {
    e.stopPropagation();

    this.setState({
      openCard: true
    });
    this.props.onEditAdmin(id);
  };
  handleCardClose = () => {
    this.setState({
      openCard: false,
      type: "",
      name: "",
      surname: "",
      email: "",
      address: "",
      username: "",
      password: ""
    });
    const id = this.props.id;
    this.props.onCloseDialog(id);
  };

  render() {
    const { classes, admins, errormessage, admin } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Toolbar>
            <i className="material-icons teal600 md-36">account_circle</i>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Διαχειριστές
            </Typography>
          </Toolbar>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tύπος</TableCell>
                <TableCell>Όνομα</TableCell>
                <TableCell>Επώνυμο</TableCell>
                <TableCell>Ε-mail</TableCell>
                <TableCell>Διεύθυνση</TableCell>
                <TableCell>Όνομα Χρήστη</TableCell>
                <TableCell>Κωδικός</TableCell>
                <TableCell>Eπεξεργασία Διαχειριστή</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      className={classes.row}
                      onClick={e => this.handleRowClick(e, row.id)}
                    >
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.name}</TableCell>

                      <TableCell>{row.surname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.password}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={e => this.handleEditClick(e, row.id)}
                          color="inherit"
                        >
                          <Tooltip
                            title="Επεξεργασία Διαχειριστή"
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
                  count={admins.length}
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
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <InsertAdminDialog
              open={this.state.open}
              onCreateFormChange={this.handleChange}
              onCreate={this.handleSubmit}
              onClose={this.handleDialogClose}
              Generate={this.onGenerate}
              password={this.state.password}
              onPasswordVisibility={this.handleClickShowPassword}
              visibility={this.state.showPassword}
              hasChanged={this.state.hasChanged}
            />
          </ClickAwayListener>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <EditAdminDialog
              open={this.state.openEditDialog}
              onEditFormChange={this.handleChange}
              onUpdate={this.handleUpdate}
              onClose={this.handleCloseEditDialog}
              Generate={this.onGenerate}
              password={this.state.password}
              onPasswordVisibility={this.handleClickShowPassword}
              visibility={this.state.showPassword}
              hasChanged={this.state.hasChanged}
              admin={admin}
            />
          </ClickAwayListener>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <AdminCard
              open={this.state.openCard}
              onClose={this.handleCardClose}
              scroll={this.state.scroll}
              onPasswordVisibility={this.handleClickShowPassword}
              visibility={this.state.showPassword}
              password={this.state.password}
            />
          </ClickAwayListener>
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
      </React.Fragment>
    );
  }
}
admin.propTypes = {
  classes: PropTypes.object.isRequired,
  onfetchAdmin: PropTypes.func.isRequired,
  admins: PropTypes.array.isRequired,
  admin: PropTypes.object.isRequired,
  onNewAdmin: PropTypes.func.isRequired,
  errormessage: PropTypes.string,
  onErrorMessageCleaner: PropTypes.func.isRequired,
  newAdmin: PropTypes.object,
  onClearAdminData: PropTypes.func,
  onEditAdmin: PropTypes.func.isRequired,
  EditAdmin: PropTypes.func,
  onCloseDialog: PropTypes.func.isRequired,
  onUpdateAdmin: PropTypes.func.isRequired,
  id: PropTypes.number
};
const adminWithStyles = withStyles(styles)(admin);
const mapStateToProps = state => ({
  admins: state.admin,
  errormessage: state.error.admmessage,
  newAdmin: state.adminSuccessData,
  id: state.id,
  admin: state.admin.filter(admin => admin.id === state.id)[0] || {}
});

const mapDispatchToProps = dispatch => ({
  onfetchAdmin: () => fetchAdmin(dispatch),
  onNewAdmin: dataPouStelnw => newAdmin(dispatch, dataPouStelnw),
  onErrorMessageCleaner: errormessage =>
    dispatch(errorMessageCleaner(errormessage)),
  onClearAdminData: newAdminData => dispatch(clearAdminData(newAdminData)),
  onEditAdmin: id => dispatch(editAdmin(id)),
  onCloseDialog: id => dispatch(idCleaner(id)),
  onUpdateAdmin: (id, dataPouStelnw) => dispatch(updateAdmin(id, dataPouStelnw))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminWithStyles);
