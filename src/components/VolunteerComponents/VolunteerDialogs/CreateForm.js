import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

function EditForm({ CreateFormChange, CreateFormChangeNumber }) {
  return (
    <DialogContent>
      <TextField
        id="username"
        label="Username"
        name="username"
        type="username"
        onChange={CreateFormChange}
        autoFocus
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel1"
        label="Contact Number"
        // value={this.state.tel1}
        onChange={CreateFormChangeNumber}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        // value={this.state.tel2}
        onChange={CreateFormChangeNumber}
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
        onChange={CreateFormChange}
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
        onChange={CreateFormChange}
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
  CreateFormChange: PropTypes.func.isRequired,
  CreateFormChangeNumber: PropTypes.func.isRequired
};

export default EditForm;
