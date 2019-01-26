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

class InsertAdminDialog extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const {
      open,
      onClose,
      Generate,
      password,
      onPasswordVisibility,
      visibility,
      onCreateFormChange,

      hasChanged,
      onCreate
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onCreate}>
          <DialogTitle id="form-dialog-title">Εισαγωγή Ασθενή</DialogTitle>
          <DialogContent>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="name">Τύπος</InputLabel>
              <Input
                id="type"
                name="type"
                type="text"
                onChange={onCreateFormChange}
                autoFocus
                inputProps={{
                  title: "Eισάγετε Τύπο Διαχειριστή"
                }}
              />
            </FormControl>
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
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="email">E-mail</InputLabel>
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
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="username">Όνομα Χρήστη</InputLabel>
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
              <InputLabel htmlFor="email">Kωδικός</InputLabel>
              <Input
                id="password"
                name="password"
                value={password}
                type={visibility ? "text" : "password"}
                onChange={onCreateFormChange}
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
              Εισαγωγη
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const InsertAdminDialogWithStyles = withStyles(styles)(InsertAdminDialog);

InsertAdminDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hasChanged: PropTypes.bool,
  onCreateFormChange: PropTypes.func,
  Generate: PropTypes.func,
  password: PropTypes.string.isRequired,
  visibility: PropTypes.bool,
  onPasswordVisibility: PropTypes.func,
  onCreate: PropTypes.func
};

export default InsertAdminDialogWithStyles;
