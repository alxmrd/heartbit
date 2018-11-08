import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { Button, DialogActions, TextField } from "@material-ui/core";

const VolunteerDialog = ({
  open,
  props,
  isOpen,
  onClose,
  onInputChange,
  onSave,
  onNumberChange
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">New Volunteer</DialogTitle>
    <DialogContent>
      <TextField
        id="username"
        label="Username"
        name="username"
        type="username"
        //value={values.username}
        onChange={onInputChange}
        autoFocus
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel1"
        label="Contact Number"
        //value={values.tel1}
        onChange={onNumberChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        //value={values.tel2}
        onChange={onNumberChange}
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
        onChange={onInputChange}
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
        onChange={onInputChange}
        fullWidth
        margin="normal"
        //className={classes.container}
        InputLabelProps={{
          shrink: true
        }}
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      {isOpen === false ? (
        <Button onClick={onClose} type="submit" color="primary">
          Update
        </Button>
      ) : (
        <Button onClick={onSave} type="submit" color="primary">
          Insert
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

VolunteerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tel1: PropTypes.number,
    email: PropTypes.string.isRequired,
    tel2: PropTypes.number
  }),
  onInputChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default VolunteerDialog;
