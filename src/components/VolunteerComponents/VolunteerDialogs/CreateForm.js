import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

function EditForm({
  onCreateFormChange,
  onCreateFormChangeNumber,
  onCreate,
  onClose,
  Generate,
  password
}) {
  return (
    <form onSubmit={onCreate}>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="username">Όνομα Χρήστη*</InputLabel>
        <Input
          id="username"
          name="username"
          type="username"
          onChange={onCreateFormChange}
          autoFocus
          inputProps={{
            title: "Eισάγετε Όνομα Χρήστη"
          }}
        />
      </FormControl>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="name">Όνομα*</InputLabel>
        <Input
          id="name"
          name="name"
          type="name"
          onChange={onCreateFormChange}
          autoFocus
          inputProps={{
            title: "Eισάγετε Όνομα"
          }}
        />
      </FormControl>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="surname">Επώνυμο*</InputLabel>
        <Input
          id="surname"
          name="surname"
          type="name"
          onChange={onCreateFormChange}
          autoFocus
          inputProps={{
            title: "Eισάγετε Επίθετο"
          }}
        />
      </FormControl>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="email">E-mail*</InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={onCreateFormChange}
          inputProps={{
            title: "Eισάγετε Ε-mail"
          }}
        />
      </FormControl>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="email">Kωδικός*</InputLabel>
        <Input
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={onCreateFormChange}
          inputProps={{
            title: "Eισάγετε Κωδικό"
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={Generate}>
                <i className="material-icons">cached</i>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl margin="dense" required fullWidth>
        <InputLabel htmlFor="tel1">Τηλέφωνο*</InputLabel>
        <Input
          id="tel1"
          name="tel1"
          type="number"
          onChange={onCreateFormChangeNumber}
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
          onChange={onCreateFormChangeNumber}
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
          Ημερομηνία Γέννησης*
        </InputLabel>

        <Input
          id="dateofbirth"
          type="date"
          onChange={onCreateFormChange}
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
          onChange={onCreateFormChange}
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
          onChange={onCreateFormChange}
          fullWidth
          inputProps={{
            title: "Eισάγετε Διεύθυνση"
          }}
        />
      </FormControl>

      <FormControl required margin="dense" fullWidth>
        <InputLabel htmlFor="location">Περιφέρεια</InputLabel>
        <NativeSelect
          // value={this.state.age}
          onChange={onCreateFormChange}
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
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Aκυρωση
        </Button>
        <Button type="submit" color="primary">
          Εισαγωγη
        </Button>
      </DialogActions>
    </form>
  );
}

EditForm.propTypes = {
  onCreateFormChange: PropTypes.func.isRequired,
  onCreateFormChangeNumber: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  Generate: PropTypes.func,
  password: PropTypes.string.isRequired
};

export default EditForm;
