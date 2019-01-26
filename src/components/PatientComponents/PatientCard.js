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
class PatientCard extends React.Component {
  render() {
    const { classes, open, onClose, patient } = this.props;
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
              <i className="material-icons">healing</i>
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
          title="Kαρτέλα Aσθενή"
        />

        <Divider />

        <DialogContent>
          <TextField
            id="name"
            label="Όνομσ"
            type="text"
            className={classes.textField}
            defaultValue={patient.name}
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
            defaultValue={patient.surname}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />

          <TextField
            id="address"
            type="text"
            label="Διεύθυνση"
            className={classes.textField}
            defaultValue={patient.address}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="gender"
            type="text"
            label="Γένος"
            className={classes.textField}
            defaultValue={
              patient.gender === "m"
                ? "Άνδρας"
                : patient.gender === "f"
                ? "Γυναίκα"
                : "Άλλο"
            }
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="birthdate"
            type="text"
            label="Έτος Γέννησης"
            className={classes.textField}
            defaultValue={patient.birthdate}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="history"
            type="text"
            label="Iστορικό"
            multiline
            className={classes.textField}
            defaultValue={patient.history}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="description"
            type="text"
            label="Περιγραφή"
            multiline
            className={classes.textField}
            defaultValue={patient.description}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
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

const PatientCardWithStyles = withStyles(styles)(PatientCard);
const mapStateToProps = state => ({
  patient: state.patients.filter(patient => patient.id === state.id)[0] || {}
});

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  patient: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PatientCardWithStyles);
