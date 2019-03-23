import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function EditForm({
  volunteerData,
  onEditFormChange,
  onEditFormChangeNumber,
  disabled,
  onUpdate,
  onClose,
  Generate,
  RFIDgenerate,
  password,
  onPasswordVisibility,
  visibility,
  RFID
}) {
  return (
    <form onSubmit={onUpdate}>
      <DialogContent>
        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="username">Όνομα Χρήστη</InputLabel>
          <Input
            id="username"
            name="username"
            type="username"
            defaultValue={volunteerData.username}
            onChange={onEditFormChange}
            autoFocus
            inputProps={{
              title: "Eισάγετε Όνομα Χρήστη",
              autoComplete: "off"
            }}
          />
        </FormControl>
        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="name">Όνομα</InputLabel>
          <Input
            id="name"
            name="name"
            type="name"
            defaultValue={volunteerData.name}
            onChange={onEditFormChange}
            autoFocus
            inputProps={{
              title: "Eισάγετε Όνομα"
            }}
          />
        </FormControl>

        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="surname">Επώνυμο</InputLabel>
          <Input
            id="surname"
            name="surname"
            type="surname"
            defaultValue={volunteerData.surname}
            onChange={onEditFormChange}
            autoFocus
            inputProps={{
              title: "Eισάγετε Επίθετο"
            }}
          />
        </FormControl>
        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={volunteerData.email}
            onChange={onEditFormChange}
            inputProps={{
              title: "Eισάγετε Ε-mail"
            }}
          />
        </FormControl>
        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="email">Kωδικός</InputLabel>
          <Input
            id="password"
            name="password"
            type={visibility ? "text" : "password"}
            // defaultValue={volunteerData.password}

            value={password}
            onChange={onEditFormChange}
            inputProps={{
              title: "Eισάγετε Κωδικό"
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={Generate}>
                  <i className="material-icons">cached</i>
                </IconButton>

                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={onPasswordVisibility}
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl margin="dense" required fullWidth>
          <InputLabel htmlFor="tel1">Τηλέφωνο</InputLabel>
          <Input
            id="tel1"
            name="tel1"
            type="number"
            defaultValue={volunteerData.tel1}
            onChange={onEditFormChangeNumber}
            inputProps={{
              max: 6999999999,
              min: 0,
              title: "Eισάγετε τηλεφωνικό αριθμό",
              step: "1"
            }}
          />
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="tel2">Εναλλακτικό Τηλέφωνο</InputLabel>
          <Input
            id="tel2"
            name="tel2"
            type="number"
            defaultValue={volunteerData.tel2}
            onChange={onEditFormChangeNumber}
            inputProps={{
              max: 6999999999,
              min: 0,
              title: "Eισάγετε τηλεφωνικό αριθμό",
              step: "1"
            }}
          />
        </FormControl>
        <FormControl margin="dense" required fullWidth>
          <InputLabel shrink={true} htmlFor="tel2">
            Ημερομηνία Γέννησης
          </InputLabel>

          <Input
            id="dateofbirth"
            type="date"
            defaultValue={volunteerData.dateofbirth}
            onChange={onEditFormChange}
            fullWidth
            inputProps={{
              max: "2000-01-01",
              min: "1950-01-01",
              title: "Eισάγετε Ημερομηνία Γέννησης"
            }}
          />
          {/* new Date().toISOString().slice(0, 10) */}
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel shrink={true} htmlFor="tel2">
            Ημερομηνία Τελευταίας Εκπαίδευσης
          </InputLabel>

          <Input
            id="latesttraining"
            type="date"
            onChange={onEditFormChange}
            defaultValue={volunteerData.latesttraining}
            fullWidth
            inputProps={{
              max: new Date().toISOString().slice(0, 10), //current date
              min: "2010-01-01",
              title: "Eισάγετε Ημερομηνία Τελευταίας Εκπαίδευσης"
            }}
          />
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel shrink={true} htmlFor="tel2">
            Διεύθυνση
          </InputLabel>

          <Input
            id="address"
            type="text"
            defaultValue={volunteerData.address}
            onChange={onEditFormChange}
            fullWidth
            inputProps={{
              title: "Eισάγετε Διεύθυνση"
            }}
          />
        </FormControl>

        <FormControl required fullWidth margin="dense">
          <InputLabel htmlFor="location">Περιφέρεια</InputLabel>
          <NativeSelect
            defaultValue={volunteerData.location}
            // value={this.state.age}
            onChange={onEditFormChange}
            input={<Input name="location" id="location" />}
          >
            <option value="" />
            <option value="Ανατολική Μακεδονία και Θράκη">
              Ανατολική Μακεδονία και Θράκη
            </option>
            <option value="Κεντρική Μακεδονία">Κεντρική Μακεδονία</option>
            <option value="Δυτική Μακεδονία">Δυτική Μακεδονία</option>
            <option value="Ήπειρος">Ήπειρος</option>
            <option value="Θεσσαλία">Θεσσαλία</option>
            <option value="Ιόνιοι Νήσοι">Ιόνιοι Νήσοι</option>
            <option value="Δυτική Ελλάδα">Δυτική Ελλάδα</option>
            <option value="Στερεά Ελλάδα">Στερεά Ελλάδα</option>
            <option value="Αττική">Αττική</option>
            <option value="Πελοπόννησος">Πελοπόννησος</option>
            <option value="Βόρειο Αιγαίο">Βόρειο Αιγαίο</option>
            <option value="Νότιο Αιγαίο"> Νότιο Αιγαίο</option>
            <option value="Κρήτη">Κρήτη</option>
          </NativeSelect>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="rfid">RFID</InputLabel>
          <Input
            value={RFID}
            id="RFID"
            name="RFID"
            type="text"
            //defaultValue={volunteerData.RFID}
            onChange={onEditFormChange}
            inputProps={{
              title: "Eισάγετε RFID "
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={RFIDgenerate}>
                  <i className="material-icons">cached</i>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
  disabled: PropTypes.bool.isRequired,
  Generate: PropTypes.func,
  password: PropTypes.string,
  visibility: PropTypes.bool,
  onPasswordVisibility: PropTypes.func,
  RFID: PropTypes.number,
  RFIDgenerate: PropTypes.func
};

const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

export default connect(mapStateToProps)(EditForm);
