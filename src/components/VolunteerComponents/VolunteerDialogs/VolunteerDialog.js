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
  updateVolunteer
} from "../../../store/actions/actions";
import CreateForm from "./CreateForm";

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
  address: ""
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
      name: "",
      surname: "",
      password: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: "",
      address: ""
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
      address: this.state.address
    };

    this.props.onNewVolunteer(dataPouStelnw);
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
      address: ""
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
      tel2: this.state.tel2,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address
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
      address: ""
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
