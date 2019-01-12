import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function EditForm({
  onCreateFormChange,
  onCreateFormChangeNumber,
  onCreate,
  onClose
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
          type="password"
          onChange={onCreateFormChange}
          inputProps={{
            title: "Eισάγετε Κωδικό"
          }}
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
  onClose: PropTypes.func.isRequired
};

export default EditForm;
