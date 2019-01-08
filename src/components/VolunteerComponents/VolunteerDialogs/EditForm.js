import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function EditForm({
  volunteerData,
  onEditFormChange,
  onEditFormChangeNumber,
  disabled,
  onUpdate,
  onClose
}) {
  return (
    <form onSubmit={onUpdate}>
      <DialogContent>
        <TextField
          id="username"
          label="Όνομα Χρήστη*"
          name="username"
          type="username"
          defaultValue={volunteerData.username}
          onChange={onEditFormChange}
          autoFocus
          fullWidth
          margin="normal"
          required
          inputProps={{
            title: "Eισάγετε Όνομα Χρήστη"
          }}
        />
        <TextField
          id="name"
          label="Όνομα*"
          name="name"
          type="name"
          defaultValue={volunteerData.name}
          onChange={onEditFormChange}
          autoFocus
          fullWidth
          margin="normal"
          required
          inputProps={{
            title: "Eισάγετε Όνομα"
          }}
        />
        <TextField
          id="surname"
          label="Eπίθετο*"
          name="surname"
          type="surname"
          defaultValue={volunteerData.surname}
          onChange={onEditFormChange}
          autoFocus
          fullWidth
          margin="normal"
          required
          inputProps={{
            title: "Eισάγετε Επίθετο"
          }}
        />
        <TextField
          name="email"
          label="e-mail*"
          type="email"
          id="email"
          defaultValue={volunteerData.email}
          onChange={onEditFormChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            title: "Eισάγετε Ε-mail"
          }}
        />
        <TextField
          name="pasword"
          label="Κωδικός*"
          type="password"
          id="password"
          defaultValue={volunteerData.password}
          onChange={onEditFormChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            title: "Eισάγετε Κωδικό"
          }}
        />
        <TextField
          id="tel1"
          label="Τηλέφωνο*"
          defaultValue={volunteerData.tel1}
          onChange={onEditFormChangeNumber}
          type="number"
          fullWidth
          margin="normal"
          required
          inputProps={{
            max: 6999999999,
            min: 0,
            title: "Eισάγετε τηλεφωνικό αριθμό",
            step: "1"
          }}
        />
        <TextField
          id="tel2"
          label="Εναλλακτικό Τηλέφωνο"
          defaultValue={volunteerData.tel2}
          onChange={onEditFormChangeNumber}
          type="number"
          fullWidth
          margin="normal"
          inputProps={{
            max: 6999999999,
            min: 0,
            title: "Eισάγετε τηλεφωνικό αριθμό",
            step: "1"
          }}
        />

        <TextField
          id="dateofbirth"
          label="Ημερομηνία Γεννησης*"
          type="date"
          defaultValue={volunteerData.dateofbirth}
          onChange={onEditFormChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            max: "2000-01-01",
            min: "1950-01-01",
            title: "Eισάγετε Ημερομηνία Γέννησης"
          }}
          required
        />

        <TextField
          noValidate
          id="latesttraining"
          label="Ημερομηνία Τελευταίας Εκπαίδευσης"
          type="date"
          onChange={onEditFormChange}
          fullWidth
          margin="normal"
          defaultValue={volunteerData.latesttraining}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            max: new Date().toISOString().slice(0, 10), //current date
            min: "2010-01-01",
            title: "Eισάγετε Ημερομηνία Τελευταίας Εκπαίδευσης"
          }}
        />
        <TextField
          name="address"
          label="Διεύθυνση"
          type="address"
          id="address"
          defaultValue={volunteerData.address}
          onChange={onEditFormChange}
          fullWidth
          margin="normal"
          inputProps={{
            title: "Eισάγετε Διεύθυνση"
          }}
        />
        <DialogActions>
          <Button onClick={onClose} color="primary">
            ΑΚΥΡΩΣΗ
          </Button>
          <Button type="submit" color="primary" disabled={disabled}>
            ΕΝΗΜΕΡΩΣΗ
          </Button>
        </DialogActions>
      </DialogContent>
    </form>
  );
}

EditForm.propTypes = {
  volunteerData: PropTypes.object.isRequired,
  onEditFormChange: PropTypes.func.isRequired,
  onEditFormChangeNumber: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

export default connect(mapStateToProps)(EditForm);
