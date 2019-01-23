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
import {
  updateDefibrillator,
  clearDefibrillatorData,
  errorMessageCleaner
} from "../../store/actions/actions";
import LocationSearchbar from "./LocationSearchbar";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import MySnackbarContentWrapper from "../MySnackbarContentWrapper";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
const styles = theme => ({
  margin: {
    marginTop: theme.spacing.unit * 3
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
});
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
  hasChanged: false,
  gmapsLoaded: false
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
    if (
      this.props.newDefibrillator.message !==
        prevProps.newDefibrillator.message &&
      this.props.newDefibrillator.message === "success"
    ) {
      this.handleCloseDialog();

      const newDefibrillatorData = this.props.newDefibrillator;

      this.props.onClearDefibrillatorData(newDefibrillatorData);
    }
  }
  initMap = () => {
    this.setState({
      gmapsLoaded: true
    });
  };

  componentDidMount() {
    window.initMap = this.initMap;
    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&libraries=places&callback=initMap`;
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl);
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
      id: this.state.id,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };

    this.props.onUpdateDefibrillator(dataPouStelnw);
    // this.props.onClose();
  };

  handleSelect = suggestion => {
    geocodeByAddress(suggestion)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng,
          location: suggestion
        })
      );
  };

  handleLocationChange = location => {
    this.setState({
      location: location,
      hasChanged: true,
      latitude: "",
      longitude: ""
    });
  };

  render() {
    const { classes, open, onClose, defibrillator, errormessage } = this.props;
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

            {this.state.gmapsLoaded && (
              <LocationSearchbar
                location={this.state.location}
                onLocationChange={this.handleLocationChange}
                onSelect={suggestion => this.handleSelect(suggestion)}
              />
            )}
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={errormessage ? true : false}
          autoHideDuration={6000}
          onClose={errormessage =>
            this.props.onErrorMessageCleaner(errormessage)
          }
        >
          <MySnackbarContentWrapper
            onClose={errormessage =>
              this.props.onErrorMessageCleaner(errormessage)
            }
            variant="error"
            className={classes.margin}
            message={errormessage}
          />
        </Snackbar>
      </form>
    );
  }
}

EditDefibrillatorDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  defibrillator: PropTypes.object,
  onUpdateDefibrillator: PropTypes.func,
  newDefibrillator: PropTypes.object,
  onClearDefibrillatorData: PropTypes.func,
  classes: PropTypes.object.isRequired,
  errormessage: PropTypes.string,
  onErrorMessageCleaner: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  defibrillators: state.defibrillators,
  defibrillator:
    state.defibrillators.filter(
      defibrillator => defibrillator.id === state.id
    )[0] || {},
  defibrillatorData: state.defibrillatorData,
  id: state.id,
  newDefibrillator: state.defibrillatorSuccessData,
  errormessage: state.error.defmessage
});
const mapDispatchToProps = dispatch => ({
  onUpdateDefibrillator: defibrillatorData =>
    dispatch(updateDefibrillator(defibrillatorData)),
  onClearDefibrillatorData: newDefibrillatorData =>
    dispatch(clearDefibrillatorData(newDefibrillatorData)),
  onErrorMessageCleaner: errormessage =>
    dispatch(errorMessageCleaner(errormessage))
});
const EditDefibrillatorDialogWithStyles = withStyles(styles)(
  EditDefibrillatorDialog
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDefibrillatorDialogWithStyles);
