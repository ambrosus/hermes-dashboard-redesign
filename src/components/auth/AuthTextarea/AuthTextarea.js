import React from 'react';
import PropTypes from 'prop-types';

const AuthTextarea = ({ label, placeholder, onChange, value }) => {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <div className="auth-input">
      {label && <label className="auth-input__label">{label}</label>}
      <textarea
        style={{ padding: 10, minHeight: 150 }}
        placeholder={placeholder}
        className="auth-input__input"
        value={value}
        onChange={handleChange}
        rows="2"
      />
    </div>
  );
};

AuthTextarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default AuthTextarea;
