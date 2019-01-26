import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, FormControlLabel } from "@material-ui/core";
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  }
});

class EditPatientDialog extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const {
      open,
      onClose,
      classes,
      onGenderChange,
      gender,
      onEditFormChange,
      onEditFormChangeNumber,
      hasChanged,
      onUpdate,
      patient
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onUpdate}>
          <DialogTitle id="form-dialog-title">Εισαγωγή Ασθενή</DialogTitle>
          <DialogContent>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="name">Όνομα</InputLabel>
              <Input
                id="name"
                name="name"
                type="name"
                defaultValue={patient.name}
                onChange={onEditFormChange}
                autoFocus
                inputProps={{
                  title: "Eισάγετε Όνομα Ασθενή"
                }}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="surname">Επώνυμο</InputLabel>
              <Input
                id="surname"
                name="surname"
                type="name"
                onChange={onEditFormChange}
                defaultValue={patient.surname}
                autoFocus
                inputProps={{
                  title: "Eισάγετε Επώνυμο"
                }}
              />
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel shrink={true} htmlFor="address">
                Διεύθυνση
              </InputLabel>

              <Input
                id="address"
                type="text"
                onChange={onEditFormChange}
                defaultValue={patient.address}
                fullWidth
                inputProps={{
                  title: "Eισάγετε Διεύθυνση"
                }}
              />
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel shrink={true} htmlFor="number">
                Έτος Γέννησης
              </InputLabel>

              <Input
                id="birthdate"
                type="number"
                onChange={onEditFormChangeNumber}
                fullWidth
                inputProps={{
                  title: "Eισάγετε Έτος Γέννησης",
                  max: 2010,
                  min: 1950,

                  step: "1"
                }}
              />
            </FormControl>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              required
            >
              <FormLabel component="legend">Γένος</FormLabel>

              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={gender}
                onChange={onGenderChange}
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={gender === "m"}
                      onChange={this.handleChange}
                      value={"m"}
                      name="radio-button-demo"
                      label="Άνδρας"
                      color="primary"
                    />
                  }
                  label="Άνδρας"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={gender === "f"}
                      onChange={this.handleChange}
                      value={"f"}
                      name="radio-button-demo"
                      aria-label="Γυναίκα"
                    />
                  }
                  label="Γυναίκα"
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="history">Ιστορικό</InputLabel>

              <Input
                id="history"
                type="text"
                onChange={onEditFormChange}
                defaultValue={patient.history}
                fullWidth
                inputProps={{
                  title: "Iστορικό Ασθενή"
                }}
                multiline
              />
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="description">Περιγραφή</InputLabel>

              <Input
                id="description"
                type="text"
                onChange={onEditFormChange}
                defaultValue={patient.description}
                fullWidth
                inputProps={{
                  title: "Περιγραφή Ασθενή"
                }}
                multiline
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Ακυρωση
            </Button>
            <Button type="submit" color="primary" disabled={!hasChanged}>
              Eνημερωση
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const EditPatientDialogWithStyles = withStyles(styles)(EditPatientDialog);

EditPatientDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hasChanged: PropTypes.bool,
  onEditFormChange: PropTypes.func,
  onEditFormChangeNumber: PropTypes.func,
  onGenderChange: PropTypes.func.isRequired,
  gender: PropTypes.string,
  onUpdate: PropTypes.func,
  patient: PropTypes.object
};

export default EditPatientDialogWithStyles;
