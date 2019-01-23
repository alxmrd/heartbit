import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { Typography } from "@material-ui/core";

class LocationSearchbar extends React.Component {
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location !== prevProps.location) {
      this.setState({
        ...this.props.location
      });
    }
  }
  render() {
    const { onLocationChange, location, onSelect } = this.props;
    return (
      <PlacesAutocomplete
        onChange={onLocationChange}
        onSelect={suggestion => onSelect(suggestion)}
        value={location}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FormControl margin="dense" fullWidth>
              <InputLabel shrink={true} htmlFor="location">
                Διεύθυνση
              </InputLabel>
              <Input
                value={location}
                id="location"
                onChange={onLocationChange}
                {...getInputProps({
                  placeholder: "Aναζήτηση Διεύθυνσης...",
                  className: "location-search-input"
                })}
              />
            </FormControl>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <Typography
                    key="location"
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </Typography>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchbar;
