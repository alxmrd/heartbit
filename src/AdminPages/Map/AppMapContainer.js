import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { InfoWindow, Marker } from "google-maps-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.js";
import firstaid from "../../firstaid.png";

const mapStyles = {
  width: "92%",
  height: "700px"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    input: null,
    peristatikoMarker: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar />

        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 40.30069, lng: 21.78896 }}
        >
          <Marker onClick={this.onMarkerClick} name={"Κοζάνη"} />
          <Marker
            onClick={this.onMarkerClick}
            name={this.props.address}
            position={{ lat: this.props.latitude, lng: this.props.longitude }}
            icon={firstaid}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  onSearch: PropTypes.func,
  address: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number
};

const mapStateToProps = state => ({
  longitude: state.selectedPlace.longitude,
  latitude: state.selectedPlace.latitude,
  address: state.selectedPlace.address
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);

export default connect(mapStateToProps)(WrappedContainer);
