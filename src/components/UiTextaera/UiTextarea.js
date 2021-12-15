import React from 'react';
import PropTypes from 'prop-types';

const UiTextaera = ({ label, onChange, placeholder, name, rows = '10' }) => {
  const handleChange = ({ target }) => {
    const { value } = target;
    onChange(name ? { [name]: value } : value);
  };

  return (
    <div className="ui-input">
      {label && <label className="ui-input__label">{label}</label>}
      <textarea
        className="ui-input__input ui-textarea"
        onChange={handleChange}
        cols="30"
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};

UiTextaera.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.string,
};

export default UiTextaera;
