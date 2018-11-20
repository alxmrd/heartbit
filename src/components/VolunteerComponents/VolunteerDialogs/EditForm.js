import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

function EditForm({ volunteerData, onEditFormChange, onEditFormChangeNumber }) {
  return (
    <DialogContent>
      <TextField
        id="username"
        label="Username"
        name="username"
        type="username"
        defaultValue={volunteerData.username}
        onChange={onEditFormChange}
        autoFocus
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel1"
        label="Contact Number"
        defaultValue={volunteerData.tel1}
        onChange={onEditFormChangeNumber}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        defaultValue={volunteerData.tel2}
        onChange={onEditFormChangeNumber}
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
        onChange={onEditFormChange}
        fullWidth
        margin="normal"
      />
      <TextField
        id="dateofbirth"
        label="Birthday"
        type="date"
        defaultValue={volunteerData.dateofbirth}
        onChange={onEditFormChangeNumber}
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
        onChange={onEditFormChangeNumber}
        fullWidth
        margin="normal"
        defaultValue={volunteerData.latesttraining}
        InputLabelProps={{
          shrink: true
        }}
      />
    </DialogContent>
  );
}

EditForm.propTypes = {
  volunteerData: PropTypes.object.isRequired,
  onEditFormChange: PropTypes.func.isRequired,
  onEditFormChangeNumber: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

export default connect(mapStateToProps)(EditForm);
