import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

function EditForm({ volunteerData, EditFormChange, EditFormChangeNumber }) {
  return (
    <DialogContent>
      <TextField
        id="username"
        label="Username"
        name="username"
        type="username"
        defaultValue={volunteerData.username}
        onChange={EditFormChange}
        autoFocus
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel1"
        label="Contact Number"
        defaultValue={volunteerData.tel1}
        onChange={EditFormChangeNumber}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        defaultValue={volunteerData.tel2}
        onChange={EditFormChangeNumber}
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
        onChange={EditFormChange}
        fullWidth
        margin="normal"
      />
      <TextField
        id="dateofbirth"
        label="Birthday"
        type="date"
        defaultValue={volunteerData.dateofbirth}
        onChange={EditFormChangeNumber}
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
        onChange={EditFormChangeNumber}
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
  EditFormChange: PropTypes.func.isRequired,
  EditFormChangeNumber: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

export default connect(mapStateToProps)(EditForm);
