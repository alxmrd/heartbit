import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { Button, DialogActions, TextField } from "@material-ui/core";
import {
  newVolunteer,
  updateVolunteer,
  idCleaner
} from "../../store/actions/actions";

class VolunteerDialog extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: "",
      hasChanged: false
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.volunteerData.username !== state.username) {
  //     return {
  //       username: props.volunteerData.username,
  //       email: props.volunteerData.email,
  //       dateofbirth: props.volunteerData.dateofbirth,
  //       latesttraining: props.volunteerData.latesttraining,
  //       tel1: props.volunteerData.tel1,
  //       tel2: props.volunteerData.tel2
  //     };
  //   }
  //   return null;
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      hasChanged: true
    });
  };

  handleNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber,
      hasChanged: true
    });
  };

  handleDialogClose = event => {
    this.setState({ hasChanged: false });
    this.props.onClose();
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

    this.props.onCloseDialog(id);

    this.setState({ open: false });
  };

  render() {
    const {
      open,

      onEdit,
      onClose,

      volunteerData
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        {onEdit === false ? (
          <DialogTitle id="form-dialog-title">Edit Volunteer</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">New Volunteer</DialogTitle>
        )}
        {onEdit === false ? (
          <DialogContent>
            <TextField
              id="username"
              label="Username"
              name="username"
              type="username"
              defaultValue={volunteerData.username}
              onChange={this.handleChange}
              autoFocus
              fullWidth
              margin="normal"
            />
            <TextField
              id="tel1"
              label="Contact Number"
              defaultValue={volunteerData.tel1}
              onChange={this.handleNumber}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              id="tel2"
              label="Second Contact Number"
              defaultValue={volunteerData.tel2}
              onChange={this.handleNumber}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="email"
              type="email"
              id="email"
              defaultValue={volunteerData.email}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="dateofbirth"
              label="Birthday"
              type="date"
              defaultValue={volunteerData.dateofbirth}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              noValidate
              id="latesttraining"
              label="Latest Training"
              type="date"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              defaultValue={volunteerData.latesttraining}
              InputLabelProps={{
                shrink: true
              }}
            />
          </DialogContent>
        ) : (
          <DialogContent>
            <TextField
              id="username"
              label="Username"
              name="username"
              type="username"
              // value={volunteerData.username}
              onChange={this.handleChange}
              autoFocus
              fullWidth
              margin="normal"
            />
            <TextField
              id="tel1"
              label="Contact Number"
              //value={values.tel1}
              onChange={this.handleNumber}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              id="tel2"
              label="Second Contact Number"
              //value={values.tel2}
              onChange={this.handleNumber}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="email"
              type="email"
              id="email"
              // value={values.email}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="dateofbirthday"
              label="Birthday"
              type="date"
              // className={classes.container}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              noValidate
              id="latesttraining"
              label="Latest Training"
              type="date"
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              //className={classes.container}
              InputLabelProps={{
                shrink: true
              }}
            />
          </DialogContent>
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
  id: PropTypes.string
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
