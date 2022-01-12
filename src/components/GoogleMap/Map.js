/*eslint-disable*/
import React, { useState } from 'react';
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
import Geocode from 'react-geocode';
import { NotificationManager } from 'react-notifications';
import { isEmptyObj } from '../../utils/isEmptyObj';
import '@reach/combobox/styles.css';
const libraries = ['places'];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

Geocode.setApiKey('AIzaSyAiefOqIuYCfafKYdZRGkGt_7TqLn4n2Ng');

const Map = ({ coordinates = {}, getMarkerPosition = () => {} }) => {
  const [center, setCenter] = useState({
    lat: coordinates.lat || 50.487279,
    lng: coordinates.lng || 30.452726,
  });
  const [selected, setSelected] = useState(false);
  const [marker, setMarker] = useState(coordinates);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAiefOqIuYCfafKYdZRGkGt_7TqLn4n2Ng',
    libraries,
  });

  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker({ lat, lng });
    Geocode.fromLatLng(lat, lng).then(({ results }) => {
      const result = results[0];
      const { address_components: addressComponents } = result;

      const country = getAddress(addressComponents);
      const city = getAddress(addressComponents, true);

      getMarkerPosition({
        lat,
        lng,
        country: country ? country.long_name : '',
        city: city ? city.long_name : '',
      });
    });
  };

  const getAddress = (addresses, isCity) =>
    addresses.find((el) =>
      el.types.find((type) => type === (isCity ? 'locality' : 'country')),
    );

  const handleSelect = (result) => {
    const { coordinates: coords, address_components: addressComponents } =
      result;

    const country = getAddress(addressComponents);
    const city = getAddress(addressComponents, true);

    setMarker(coords);
    getMarkerPosition({
      ...coords,
      country: country ? country.long_name : '',
      city: city ? city.long_name : '',
    });
    setCenter(coords);
  };

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map...';

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: 400 }}
      center={center}
      zoom={8}
      onClick={isEmptyObj(coordinates) ? handleClick : () => {}}
      options={options}
    >
      {!isEmptyObj(marker) && (
        <Marker position={marker} onClick={() => setSelected(true)} />
      )}
      {selected && (
        <InfoWindow position={marker} onCloseClick={() => setSelected(false)}>
          <div className="gmap-info-window">
            <p>Latitude {marker.lat}</p>
            <p>Longitude {marker.lng}</p>
          </div>
        </InfoWindow>
      )}
      {isEmptyObj(coordinates) && <Search handleSelect={handleSelect} />}
    </GoogleMap>
  );
};

Map.propTypes = {
  coordinates: PropTypes.object,
  getMarkerPosition: PropTypes.func,
};

export default Map;

const Search = ({ handleSelect }) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const onSelect = async (address) => {
    setValue(address);
    setIsDropdownVisible(false);

    try {
      const results = await getGeocode({ address });
      const coordinates = await getLatLng(results[0]);

      handleSelect({ coordinates, ...results[0] });
    } catch (e) {
      NotificationManager.error('Error');
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    setIsDropdownVisible(true);
  };

  return (
    <div className="map-search">
      <input
        onChange={handleInput}
        className="map-search__input"
        value={value}
      />
      {isDropdownVisible && (
        <ul className="map-search__dropdown">
          {status === 'OK' &&
            data.map(({ description }) => (
              <li
                role="presentation"
                key={description}
                onClick={() => onSelect(description)}
              >
                {description}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

Search.propTypes = {
  handleSelect: PropTypes.func,
};
