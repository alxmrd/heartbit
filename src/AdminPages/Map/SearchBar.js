import React from "react";
import { classnames } from "./helpers";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
  insertEventClick,
  selectPlace,
  clearSelectedPlace
} from "../../store/actions/actions";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },

  margin: {
    margin: theme.spacing.unit
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    grow: 1,
    alignItems: "center",
    width: 400,
    marginRight: "8%",
    marginTop: 20,
    float: "left"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit * 8.5,
    marginLeft: "0px",
    left: 0
  }
});
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
      open: false,
      vertical: "top",
      horizontal: "center"
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: ""
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false
        });
        const selectedPlace = {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          address: this.state.address
        };

        this.props.onSelectPlace(selectedPlace);
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null
    });
  };

  handleInsertEvent = (event, state) => {
    event.preventDefault();
    const dataPouStelnw = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address: this.state.address
    };

    this.props.onInsertEventClick(dataPouStelnw);
    this.props.onClearSelectPlace(this.props.selectPlace);

    this.setState({
      address: "",
      latitude: null,
      longitude: null,
      open: true,
      ...state
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <React.Fragment>
                <Paper className={classes.search} elevation={1}>
                  <InputBase
                    className={classes.input}
                    {...getInputProps({
                      id: "input",

                      placeholder: "Aναζήτηση Διεύθυνσης...",

                      margin: "dense"
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <IconButton
                      color="inherit"
                      className={classes.iconButton}
                      aria-label="Directions"
                    >
                      <CloseIcon
                        // className={classes.searchIcon}
                        aria-label="Αναζήτηση"
                        onClick={this.handleCloseClick}
                      />
                    </IconButton>
                  )}
                  <Divider className={classes.divider} />
                  <Tooltip title="Προσθήκη Aπινιδωτή" placement="bottom">
                    <IconButton
                      color="secondary"
                      className={classes.iconButton}
                      aria-label="Directions"
                    >
                      <LocalHospitalIcon
                        // className={classes.searchIcon}
                        aria-label="Αναζήτηση"
                      />
                    </IconButton>
                  </Tooltip>
                  <Divider className={classes.divider} />
                  <Tooltip title="Προσθήκη Περιστατικού" placement="bottom">
                    <IconButton
                      color="primary"
                      className={classes.iconButton}
                      aria-label="Directions"
                    >
                      <AddLocationIcon
                        // className={classes.searchIcon}
                        aria-label="Αναζήτηση"
                        onClick={event =>
                          this.handleInsertEvent(event, {
                            vertical: "bottom",
                            horizontal: "left"
                          })
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </Paper>

                {suggestions.length > 0 && (
                  <div className={classes.paper}>
                    {suggestions.map(suggestion => {
                      const className = classnames("Demo__suggestion-item", {
                        "Demo__suggestion-item--active": suggestion.active
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <Paper
                          className={classes.paper}
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <Typography>
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </Typography>
                        </Paper>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div />
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && <div>{""}</div>}

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            className={classes.margin}
            message={
              <span id="message-id">Επιτυχής προσθήκη περιστατικού</span>
            }
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}
const SearchBarWithStyles = withStyles(styles)(SearchBar);

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  selectPlace: state.selectedPlace
});
const mapDispatchToProps = dispatch => ({
  onInsertEventClick: (longitude, latitude, address) =>
    dispatch(insertEventClick(longitude, latitude, address)),
  onSelectPlace: (longitude, latitude, address) =>
    dispatch(selectPlace(longitude, latitude, address)),
  onClearSelectPlace: selectedPlace =>
    dispatch(clearSelectedPlace(selectedPlace))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarWithStyles);
