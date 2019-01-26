import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog } from "@material-ui/core";
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: "row"
  }
});

class EditAdminDialog extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const {
      open,
      onClose,
      onPasswordVisibility,
      visibility,
      onEditFormChange,
      Generate,
      hasChanged,
      onUpdate,
      admin,
      password
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onUpdate}>
          <DialogTitle id="form-dialog-title">Εισαγωγή Διαχειριστή</DialogTitle>
          <DialogContent>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="type">Τύπος</InputLabel>
              <Input
                id="type"
                name="type"
                type="type"
                defaultValue={admin.type}
                onChange={onEditFormChange}
                autoFocus
                inputProps={{
                  title: "Eισάγετε Tύπο Διαχειριστή"
                }}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="name">Όνομα</InputLabel>
              <Input
                id="name"
                name="name"
                type="name"
                onChange={onEditFormChange}
                defaultValue={admin.name}
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
                type="name"
                onChange={onEditFormChange}
                defaultValue={admin.surname}
                autoFocus
                inputProps={{
                  title: "Eισάγετε Επώνυμο"
                }}
              />
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="email">Ε-mail</InputLabel>

              <Input
                id="email"
                type="text"
                onChange={onEditFormChange}
                defaultValue={admin.email}
                fullWidth
                inputProps={{
                  title: "Ε-mail"
                }}
                multiline
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
                defaultValue={admin.address}
                fullWidth
                inputProps={{
                  title: "Eισάγετε Διεύθυνση"
                }}
              />
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="username">Όνομα Χρήστη</InputLabel>

              <Input
                id="username"
                type="text"
                onChange={onEditFormChange}
                defaultValue={admin.username}
                fullWidth
                inputProps={{
                  title: "Όνομα Χρήστη"
                }}
              />
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel htmlFor="password">Κωδικός</InputLabel>

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

const EditAdminDialogWithStyles = withStyles(styles)(EditAdminDialog);

EditAdminDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hasChanged: PropTypes.bool,
  onEditFormChange: PropTypes.func,
  onEditFormChangeNumber: PropTypes.func,
  Generate: PropTypes.func,
  password: PropTypes.string.isRequired,
  visibility: PropTypes.bool,
  onPasswordVisibility: PropTypes.func,
  onUpdate: PropTypes.func,
  admin: PropTypes.object
};

export default EditAdminDialogWithStyles;
