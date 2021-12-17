import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

export const Maps = withGoogleMap(({ coordinates }) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
  >
    <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
  </GoogleMap>
));

Maps.defaultProps = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

export default Maps;
