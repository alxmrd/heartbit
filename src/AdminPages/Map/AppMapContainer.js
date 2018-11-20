import React from "react";
import AppMap from "./AppMap";

export default class AppMapContainer extends React.Component {
  render() {
    return (
      <AppMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px`, width: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
