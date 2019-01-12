import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import EditForm from "./EditForm";
import DialogContent from "@material-ui/core/DialogContent";
import {
  newVolunteer,
  idCleaner,
  updateVolunteer,
  errorMessageCleaner
} from "../../../store/actions/actions";
import CreateForm from "./CreateForm";
import MySnackbarContentWrapper from "../../MySnackbarContentWrapper";
import Snackbar from "@material-ui/core/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  margin: {
    marginTop: theme.spacing.unit * 3
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const initState = {
  hasChanged: false,
  username: "",
  name: "",
  surname: "",
  password: "",
  email: "",
  dateofbirth: "",
  latesttraining: "",
  tel1: "",
  tel2: "",
  address: "",
  location: ""
};

class VolunteerDialog extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = initState;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.volunteerData !== prevProps.volunteerData) {
      this.setState({
        ...this.props.volunteerData
      });
    }
    if (
      this.props.newVolunteer.success !== prevProps.newVolunteer.success &&
      this.props.newVolunteer.success === "success"
    ) {
      this.handleDialogClose();
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,

      hasChanged: true
    });
  };
  onChangeFunction(component, value) {
    this.setValue({ value: value });
  }
  handleNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber,
      hasChanged: true
    });
  };

  handleDialogClose = event => {
    this.props.onClose();
    this.setState({
      hasChanged: false,
      username: "",
      name: "",
      surname: "",
      password: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: "",
      address: "",
      location: ""
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const dataPouStelnw = {
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address,
      location: this.state.location
    };

    this.props.onNewVolunteer(dataPouStelnw);
  };

  handleUpdate = event => {
    event.preventDefault();

    const dataPouStelnw = {
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address,
      location: this.state.location
    };
    const id = this.props.id;
    this.props.onUpdateVolunteer(id, dataPouStelnw);

    this.setState({
      hasChanged: false,
      username: "",
      name: "",
      surname: "",
      password: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: "",
      address: "",
      location: ""
    });
    this.props.onClose();
  };

  render() {
    const { classes, open, onEdit, onClose, errormessage } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        {onEdit === false ? (
          <DialogTitle id="form-dialog-title">Επεξεργασία Εθελοντή</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">Εισαγωγή Εθελοντή</DialogTitle>
        )}
        <DialogContent>
          {onEdit === false ? (
            <EditForm
              onEditFormChange={this.handleChange}
              onEditFormChangeNumber={this.handleNumber}
              onUserNameEdit={this.onUserNameEdit}
              onClose={this.handleDialogClose}
              disabled={!this.state.hasChanged}
              onUpdate={this.handleUpdate}
            />
          ) : (
            <CreateForm
              onCreateFormChange={this.handleChange}
              onCreateFormChangeNumber={this.handleNumber}
              onCreate={this.handleSubmit}
              onClose={this.handleDialogClose}
            />
          )}
        </DialogContent>
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
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {},
  id: state.id,
  errormessage: state.error.message,
  errorcode: state.error.httpstatus,
  newVolunteer: state.volunteerSuccessData
});

VolunteerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tel1: PropTypes.number,
    email: PropTypes.string.isRequired,
    tel2: PropTypes.number
  }),

  volunteerData: PropTypes.object.isRequired,
  onNewVolunteer: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onUpdateVolunteer: PropTypes.func.isRequired,
  onErrorMessageCleaner: PropTypes.func.isRequired,
  id: PropTypes.number,
  classes: PropTypes.object.isRequired,
  errormessage: PropTypes.string,
  errorcode: PropTypes.string,
  newVolunteer: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  onNewVolunteer: dataPouStelnw => newVolunteer(dispatch, dataPouStelnw),
  onUpdateVolunteer: (id, dataPouStelnw) =>
    dispatch(updateVolunteer(id, dataPouStelnw)),
  onCloseDialog: id => dispatch(idCleaner(id)),
  onErrorMessageCleaner: errormessage =>
    dispatch(errorMessageCleaner(errormessage))
});
const VolunteerDialogWithStyles = withStyles(styles)(VolunteerDialog);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerDialogWithStyles);
