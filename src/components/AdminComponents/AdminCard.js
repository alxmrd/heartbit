import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Dialog } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ReactToPrint from "react-to-print";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
const styles = theme => ({
  cardHeader: {
    minHeight: "100px"
  },

  actions: {
    display: "flex"
  },

  avatar: {
    backgroundColor: "#4e878c"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});
class AdminCard extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      admin,
      onPasswordVisibility,
      visibility,
      password
    } = this.props;
    return (
      <Dialog
        ref={el => (this.componentRef = el)}
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <i className="material-icons">account_circle</i>
            </Avatar>
          }
          action={
            <ReactToPrint
              trigger={() => (
                <IconButton>
                  <i className="material-icons">print</i>
                </IconButton>
              )}
              content={() => this.componentRef}
            />
          }
          // subheader="Όνομα Χρήστη"
          title="Kαρτέλα Διαχειριστή"
        />

        <Divider />

        <DialogContent>
          <TextField
            id="name"
            label="Όνομσ"
            type="text"
            className={classes.textField}
            defaultValue={admin.name}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />

          <TextField
            noValidate
            id="surname"
            label="Eπώνυμο"
            type="text"
            fullWidth
            margin="normal"
            className={classes.textField}
            defaultValue={admin.surname}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <TextField
            id="email"
            type="text"
            label="E-mail"
            className={classes.textField}
            defaultValue={admin.email}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />

          <TextField
            id="address"
            type="text"
            label="Διεύθυνση"
            className={classes.textField}
            defaultValue={admin.address}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />

          <TextField
            id="username"
            type="text"
            label="Όνομα Χρήστη"
            name="username"
            className={classes.textField}
            defaultValue={admin.username}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="password"
            label="Κωδικός"
            type={visibility ? "text" : "password"}
            name="password"
            className={classes.textField}
            value={password}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment variant="outlined" position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={onPasswordVisibility}
                  >
                    {visibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Κλεισιμο καρτελας
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const AdminCardWithStyles = withStyles(styles)(AdminCard);
const mapStateToProps = state => ({
  admin: state.admin.filter(admin => admin.id === state.id)[0] || {}
});

AdminCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  admin: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  visibility: PropTypes.bool,
  onPasswordVisibility: PropTypes.func
};

export default connect(mapStateToProps)(AdminCardWithStyles);
