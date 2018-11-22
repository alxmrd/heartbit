import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const AppMap = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap defaultZoom={14} center={{ lat: 40.30069, lng: 21.78896 }}>
        {" "}
        <Marker position={{ lat: 40.30069, lng: 21.78896 }} />
      </GoogleMap>
    );
  })
);

export default AppMap;
