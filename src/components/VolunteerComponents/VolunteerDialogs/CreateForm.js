import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

function EditForm({ onCreateFormChange, onCreateFormChangeNumber }) {
  return (
    <DialogContent>
      <TextField
        id="username"
        label="Username"
        name="username"
        type="username"
        onChange={onCreateFormChange}
        autoFocus
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel1"
        label="Contact Number"
        // value={this.state.tel1}
        onChange={onCreateFormChangeNumber}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        // value={this.state.tel2}
        onChange={onCreateFormChangeNumber}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="email"
        type="email"
        id="email"
        // value={this.state.email}
        onChange={onCreateFormChange}
        fullWidth
        margin="normal"
      />
      <TextField
        id="dateofbirthday"
        label="Birthday"
        type="date"
        // value={this.state.dateofbirth}
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
        onChange={onCreateFormChange}
        fullWidth
        margin="normal"
        // value={this.state.latesttraining}
        //className={classes.container}
        InputLabelProps={{
          shrink: true
        }}
      />
    </DialogContent>
  );
}

EditForm.propTypes = {
  onCreateFormChange: PropTypes.func.isRequired,
  onCreateFormChangeNumber: PropTypes.func.isRequired
};

export default EditForm;
