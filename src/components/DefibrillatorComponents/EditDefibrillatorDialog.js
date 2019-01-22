import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import NativeSelect from "@material-ui/core/NativeSelect";

import { updateDefibrillator } from "../../store/actions/actions";

const initState = {
  installationdate: "",
  upgradedate: "",
  notes: "",
  location: "",
  model: "",
  latitude: "",
  longitude: "",
  locker: "",
  presentflag: "",
  id: "",
  hasChanged: false
};
class EditDefibrillatorDialog extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = initState;
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.defibrillator !== prevProps.defibrillator) {
      this.setState({
        ...this.props.defibrillator
      });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,

      hasChanged: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      installationdate: "",
      upgradedate: "",
      notes: "",
      location: "",
      model: "",
      latitude: "",
      longitude: "",
      locker: "",
      presentflag: "",
      id: "",
      hasChanged: false
    });
    this.props.onClose();
  };
  handleUpdate = event => {
    event.preventDefault();

    const dataPouStelnw = {
      installationdate: this.state.installationdate,
      upgradedate: this.state.installationdate,
      notes: this.state.notes,
      location: this.state.location,
      model: this.state.model,
      id: this.state.id
    };

    this.props.onUpdateDefibrillator(dataPouStelnw);
    this.props.onClose();
  };

  render() {
    const { open, onClose, defibrillator } = this.props;
    return (
      <form>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Επεξεργασία Απινιδωτή
          </DialogTitle>

          <DialogContent>
            <FormControl margin="dense" required fullWidth>
              <InputLabel shrink={true} htmlFor="installationdate">
                Ημερομηνία Εγκατάστασης
              </InputLabel>
              <Input
                id="installationdate"
                type="date"
                defaultValue={defibrillator.installationdate}
                onChange={this.handleChange}
                inputProps={{
                  max: moment().format("YYYY-MM-DD"),
                  min: "2019-01-01",
                  title: "Eισάγετε Ημερομηνία Γέννησης"
                }}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel shrink={true} htmlFor="upgradedate">
                Ημερομηνία Αναβάθμισης
              </InputLabel>
              <Input
                id="upgradedate"
                type="date"
                defaultValue={defibrillator.upgradedate}
                onChange={this.handleChange}
                inputProps={{
                  max: moment().format("YYYY-MM-DD"),
                  min: "2019-01-01",
                  title: "Eισάγετε Ημερομηνία Γέννησης"
                }}
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="model">Moντέλο Απινιδωτή</InputLabel>
              <NativeSelect
                defaultValue={defibrillator.model}
                onChange={this.handleChange}
                input={<Input name="model" id="model" />}
              >
                <option value="" />
                <option value="xsMax">xsMax</option>
                <option value="S9">S9</option>
                <option value="SQ7">SQ7</option>
                <option value="RS7">RS7</option>
              </NativeSelect>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel shrink={true} htmlFor="notes">
                Σημειώσεις
              </InputLabel>
              <Input
                multiline
                id="notes"
                type="text"
                defaultValue={defibrillator.notes}
                onChange={this.handleChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              ΑΚΥΡΩΣΗ
            </Button>
            <Button
              onClick={this.handleUpdate}
              disabled={!this.state.hasChanged}
              color="primary"
            >
              ΕΝΗΜΕΡΩΣΗ
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

EditDefibrillatorDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  defibrillator: PropTypes.object,
  onUpdateDefibrillator: PropTypes.func
};

const mapStateToProps = state => ({
  defibrillators: state.defibrillators,
  defibrillator:
    state.defibrillators.filter(
      defibrillator => defibrillator.id === state.id
    )[0] || {},
  defibrillatorData: state.defibrillatorData,
  id: state.id
});
const mapDispatchToProps = dispatch => ({
  onUpdateDefibrillator: defibrillatorData =>
    dispatch(updateDefibrillator(defibrillatorData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDefibrillatorDialog);
