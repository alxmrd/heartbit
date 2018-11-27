import React from "react";
import { classnames } from "./helpers";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { searchBarClick } from "../../store/actions/actions";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
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
      isGeocoding: false
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
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null
    });
  };

  handleInsertEvent = event => {
    event.preventDefault();
    const dataPouStelnw = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address: this.state.address
    };

    this.props.onSearchBarClick(dataPouStelnw);
    this.setState({
      address: "",
      latitude: null,
      longitude: null
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding
    } = this.state;
    const { classes, onAddressSelect } = this.props;

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
          onSelect={e => onAddressSelect(e)}
          onClick={this.handleInsertEvent}
        >
          ΠΡΟΣΘΗΚΗ ΠΕΡΙΣΤΑΤΙΚΟΥ
        </Button>
      </React.Fragment>
    );
  }
}
const SearchBarWithStyles = withStyles(styles)(SearchBar);

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  onSearchBarClick: (longitude, latitude, address) =>
    dispatch(searchBarClick(longitude, latitude, address))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBarWithStyles);
