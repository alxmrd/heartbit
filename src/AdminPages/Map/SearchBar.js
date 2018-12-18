import React from "react";
import { classnames } from "./helpers";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { insertEventClick, selectPlace } from "../../store/actions/actions";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  margin: {
    margin: theme.spacing.unit
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
              <div className="Demo__search-bar-container">
                <Typography variant="h5">
                  Ψάξτε διεύθυνση
                  <i className="material-icons">search</i>
                </Typography>
                <div className="Demo__search-input-container">
                  <TextField
                    {...getInputProps({
                      id: "input",

                      style: { margin: 8 },
                      placeholder: "π.χ. Κοζάνη",

                      margin: "normal",
                      InputLabelProps: {
                        shrink: true
                      }
                    })}
                  />

                  {this.state.address.length > 0 && (
                    <Button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                      color="primary"
                    >
                      x
                    </Button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames("Demo__suggestion-item", {
                        "Demo__suggestion-item--active": suggestion.active
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{" "}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer" />
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && <div>{""}</div>}

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={event =>
            this.handleInsertEvent(event, {
              vertical: "bottom",
              horizontal: "left"
            })
          }
        >
          ΠΡΟΣΘΗΚΗ ΠΕΡΙΣΤΑΤΙΚΟΥ
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
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

const mapDispatchToProps = dispatch => ({
  onInsertEventClick: (longitude, latitude, address) =>
    dispatch(insertEventClick(longitude, latitude, address)),
  onSelectPlace: (longitude, latitude, address) =>
    dispatch(selectPlace(longitude, latitude, address))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBarWithStyles);
