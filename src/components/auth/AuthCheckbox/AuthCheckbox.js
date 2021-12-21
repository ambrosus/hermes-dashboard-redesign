import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AuthCheckbox = ({ label, onChange, checked, className, disable }) => {
  const handleChange = ({ target }) => {
    onChange(target.checked);
  };

  return (
    <label className={cx('auth-checkbox', className)}>
      <input
        type="checkbox"
        checked={checked ? 'checked' : ''}
        onChange={handleChange}
        className="auth-checkbox__input"
        disabled={disable}
      />
      <span className="auth-checkbox__checkmark" />
      {label}
    </label>
  );
};

AuthCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disable: PropTypes.bool,
};

export default AuthCheckbox;
