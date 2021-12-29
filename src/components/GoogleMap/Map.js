import React, { useState } from 'react';
/* eslint-disable */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { isEmptyObj } from '../../utils/isEmptyObj';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import '@reach/combobox/styles.css';
const libraries = ['places'];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ coordinates = {}, getMarkerPosition = () => {} }) => {
  const [center, setCenter] = useState({
    lat: 50.487279,
    lng: 30.452726,
  });
  const [selected, setSelected] = useState(false);
  const [marker, setMarker] = useState(coordinates);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCCtQeWi-QXdVEWcaUqWj1AVS8L_w6NReI',
    libraries,
  });

  const handleClick = (e) => {
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(coords);
    getMarkerPosition(coords)
  };

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map...';

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: 400 }}
      center={center}
      zoom={8}
      onClick={handleClick}
      options={options}
    >
      {!isEmptyObj(marker) && <Marker position={marker} onClick={() => setSelected(true)}/>}
      {selected && (
        <InfoWindow
          position={marker}
          onCloseClick={() => setSelected(false)}
        >
          <div className="gmap-info-window">
            <p>Latitude {marker.lat}</p>
            <p>Longitude {marker.lng}</p>
          </div>
        </InfoWindow>
      )}
      <Search />
    </GoogleMap>
  );
};

Map.propTypes = {
  coordinates: PropTypes.object,
};

export default Map;

const Search = () => {
  const { value, ready, suggestions: { status, data }, setValue } = usePlacesAutocomplete();

  const handleSelect = (e) => {
    console.log(e);
  };

  const handleInput = (e) => {
    console.log(e);
    setValue(e.target.value)
  }

  return (
    <div className="map-search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          {status === 'OK' && data.map((el) => ({ id, description }) => (
             <ComboboxOption key={id} value={description} />
          ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
