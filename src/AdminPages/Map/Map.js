import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { InfoWindow, Marker } from "google-maps-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.js";
import firstaid from "../../firstaid.png";
import pin from "../../pin.png";
import defibrillator from "../../defibrillator.png";
import { fetchDefifrillators } from "../../store/actions/actions.js";
import Paper from "@material-ui/core/Paper";

const mapStyles = {
  width: "92%",
  height: "80%",
  marginTop: "100px"
};

export class map extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    input: null,
    peristatikoMarker: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchDefibrillators();
  }

  render() {
    const { defibrillators } = this.props;
    const onMarkerClick = this.onMarkerClick;
    return (
      <React.Fragment>
        <Paper>
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: 40.30069, lng: 21.78896 }}
          >
            <SearchBar />
            <Marker onClick={this.onMarkerClick} name={"Κοζάνη"} />
            <Marker
              onClick={this.onMarkerClick}
              name={this.props.address}
              position={{ lat: this.props.latitude, lng: this.props.longitude }}
              icon={pin}
            />
            <Marker
              onClick={this.onMarkerClick}
              name={this.props.insertAddress}
              position={{
                lat: this.props.insertLat,
                lng: this.props.insertLong
              }}
              icon={firstaid}
            />

            {defibrillators.map(item => (
              <Marker
                key={item.id}
                onClick={onMarkerClick}
                const
                name={item.model}
                position={{ lat: item.latitude, lng: item.longitude }}
                icon={defibrillator}
              />
            ))}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>
                  {this.state.selectedPlace && this.state.selectedPlace.name}
                </h4>
              </div>
            </InfoWindow>
          </Map>
        </Paper>
      </React.Fragment>
    );
  }
}

map.propTypes = {
  google: PropTypes.object,
  onSearch: PropTypes.func,
  address: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  insertAddress: PropTypes.string,
  insertLat: PropTypes.number,
  insertLong: PropTypes.number,
  defibrillators: PropTypes.array.isRequired,
  onfetchDefibrillators: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  longitude: state.selectedPlace.longitude,
  latitude: state.selectedPlace.latitude,
  address: state.selectedPlace.address,
  defibrillators: state.defibrillators,
  insertLong: state.eventSuccessData.longitude,
  insertLat: state.eventSuccessData.latitude,
  insertAddress: state.eventSuccessData.address
});

const mapDispatchToProps = dispatch => ({
  onfetchDefibrillators: () => fetchDefifrillators(dispatch)
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(map);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedContainer);
