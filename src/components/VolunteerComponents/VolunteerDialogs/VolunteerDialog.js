import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { Button, DialogActions } from "@material-ui/core";
import EditForm from "./EditForm";
import {
  newVolunteer,
  idCleaner,
  updateVolunteer
} from "../../../store/actions/actions";
import CreateForm from "./CreateForm";

const initState = {
  username: "",
  email: "",
  dateofbirth: "",
  latesttraining: "",
  tel1: "",
  tel2: "",
  hasChanged: false
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
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: ""
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
      tel2: this.state.tel2
    };

    this.props.onNewVolunteer(dataPouStelnw);
    this.setState({
      hasChanged: false,
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: ""
    });
    this.props.onClose();
  };

  handleUpdate = event => {
    event.preventDefault();

    const dataPouStelnw = {
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2
    };
    const id = this.props.id;
    this.props.onUpdateVolunteer(id, dataPouStelnw);
    this.setState({
      hasChanged: false,
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: ""
    });
    this.props.onClose();
  };

  render() {
    const { open, onEdit, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        {onEdit === false ? (
          <DialogTitle id="form-dialog-title">Edit Volunteer</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">New Volunteer</DialogTitle>
        )}
        {onEdit === false ? (
          <EditForm
            onEditFormChange={this.handleChange}
            onEditFormChangeNumber={this.handleNumber}
            onUserNameEdit={this.onUserNameEdit}
          />
        ) : (
          <CreateForm
            onCreateFormChange={this.handleChange}
            onCreateFormChangeNumber={this.handleNumber}
          />
        )}

        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Cancel
          </Button>
          {onEdit === false ? (
            <Button
              onClick={this.handleUpdate}
              type="submit"
              color="primary"
              disabled={!this.state.hasChanged}
            >
              Update
            </Button>
          ) : (
            <Button onClick={this.handleSubmit} type="submit" color="primary">
              Insert
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {},
  id: state.id
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
  id: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
  onNewVolunteer: dataPouStelnw => newVolunteer(dispatch, dataPouStelnw),
  onUpdateVolunteer: (id, dataPouStelnw) =>
    dispatch(updateVolunteer(id, dataPouStelnw)),
  onCloseDialog: id => dispatch(idCleaner(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerDialog);
