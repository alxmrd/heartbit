import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
class InsertPatientDialog extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      // gender: "female"
    };
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      open,
      onClose,
      classes,
      onGenderChange,
      gender,
      onCreateFormChange,
      onCreateFormChangeNumber,
      hasChanged,
      onCreate
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onCreate}>
          <DialogTitle id="form-dialog-title">Εισαγωγή Ασθενή</DialogTitle>
          <DialogContent>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="name">Όνομα</InputLabel>
              <Input
                id="name"
                name="name"
                type="name"
                onChange={onCreateFormChange}
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
                onChange={onCreateFormChange}
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
                onChange={onCreateFormChange}
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
                onChange={onCreateFormChangeNumber}
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
                  value="0"
                  control={<Radio color="primary" />}
                  label="Aνδρας"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Γυναίκα"
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="history">Ιστορικό</InputLabel>

              <Input
                id="history"
                type="text"
                onChange={onCreateFormChange}
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
                onChange={onCreateFormChange}
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
              Εισαγωγη
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const InsertPatientDialogWithStyles = withStyles(styles)(InsertPatientDialog);
const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

InsertPatientDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hasChanged: PropTypes.bool,
  onCreateFormChange: PropTypes.func,
  onCreateFormChangeNumber: PropTypes.func,
  onGenderChange: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  onCreate: PropTypes.func
};

export default connect(mapStateToProps)(InsertPatientDialogWithStyles);
