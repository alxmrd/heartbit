import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { Button, DialogActions, TextField } from "@material-ui/core";

const VolunteerDialog = ({
  open,
  hasChanged,

  onEdit,
  onClose,
  onInputChange,
  onSave,
  onNumberChange,
  onUpdate,
  volunteerData
}) => (
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
          onChange={onInputChange}
          autoFocus
          fullWidth
          margin="normal"
        />
        <TextField
          id="tel1"
          label="Contact Number"
          defaultValue={volunteerData.tel1}
          onChange={onNumberChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          id="tel2"
          label="Second Contact Number"
          defaultValue={volunteerData.tel2}
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
          defaultValue={volunteerData.email}
          onChange={onInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="dateofbirth"
          label="Birthday"
          type="date"
          defaultValue={volunteerData.dateofbirth}
          onChange={onInputChange}
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
    )}

    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      {onEdit === false ? (
        <Button
          onClick={onUpdate}
          type="submit"
          color="primary"
          disabled={!hasChanged}
        >
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

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

VolunteerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hasChanged: PropTypes.bool.isRequired,
  onEdit: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    username: PropTypes.string.isRequired,
    tel1: PropTypes.number,
    email: PropTypes.string.isRequired,
    tel2: PropTypes.number
  }),
  onInputChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  volunteerData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(VolunteerDialog);
