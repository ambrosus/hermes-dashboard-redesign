import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AuthCheckbox = ({ label, onChange, checked, className }) => (
  <label className={cx('auth-checkbox', className)}>
    <input
      type="checkbox"
      checked={checked ? 'checked' : ''}
      onChange={onChange}
      className="auth-checkbox__input"
    />
    <span className="auth-checkbox__checkmark" />
    {label}
  </label>
);

AuthCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

export default AuthCheckbox;
