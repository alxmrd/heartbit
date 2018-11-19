import React from "react";
import Paper from "@material-ui/core/Paper";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class AppMap extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div>
        <Paper elevation={1}>
          <Map google={this.props.google} zoom={14}>
            <Marker onClick={this.onMarkerClick} name={"Current location"} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
            </InfoWindow>
          </Map>
        </Paper>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(AppMap);
