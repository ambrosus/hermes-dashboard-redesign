import React from 'react';
import PropTypes from 'prop-types';

const UiTextaera = ({ label, onChange, placeholder, name }) => (
  <div className="ui-input">
    {label && <label className="ui-input__label">{label}</label>}
    <textarea
      className="ui-input__input ui-textarea"
      onChange={onChange}
      name={name}
      cols="30"
      rows="10"
      placeholder={placeholder}
    />
  </div>
);

UiTextaera.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default UiTextaera;
