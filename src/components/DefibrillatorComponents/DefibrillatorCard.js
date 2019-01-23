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
class DefibrillatorCard extends React.Component {
  render() {
    const { classes, open, onClose, defibrillator } = this.props;
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
              <i className="material-icons">local_hospital</i>
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
          title="Kαρτέλα Aπινιδωτή"
        />

        <Divider />

        <DialogContent>
          <TextField
            id="installationdate"
            label="Ημερομηνία Εγκατάστασης"
            type="date"
            className={classes.textField}
            defaultValue={defibrillator.installationdate}
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
            id="upgradedate"
            label="Ημερομηνία Τελευταίας Αναβάθμισης"
            type="date"
            fullWidth
            margin="normal"
            className={classes.textField}
            defaultValue={defibrillator.upgradedate}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />

          <TextField
            id="model"
            type="text"
            label="Μοντέλο Απινιδωτή"
            name="model"
            className={classes.textField}
            defaultValue={defibrillator.model}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="location"
            type="location"
            label="Διεύθυνση"
            name="location"
            className={classes.textField}
            defaultValue={defibrillator.location}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="notes"
            type="notes"
            label="Σημειώσεις"
            name="notes"
            className={classes.textField}
            defaultValue={defibrillator.notes}
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

const DefibrillatorCardWithStyles = withStyles(styles)(DefibrillatorCard);
const mapStateToProps = state => ({
  defibrillator:
    state.defibrillators.filter(
      defibrillator => defibrillator.id === state.id
    )[0] || {}
});

DefibrillatorCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  defibrillator: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DefibrillatorCardWithStyles);
