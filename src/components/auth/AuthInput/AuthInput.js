import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AuthInput = ({
  className,
  onChange,
  label,
  value,
  rightEl,
  type = 'text',
  errorMessage,
}) => {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <div className={cx('auth-input', className)}>
      {label && (
        <label
          className={cx(
            'auth-input__label',
            errorMessage && 'auth-input__label--error',
          )}
        >
          {label}
        </label>
      )}
      <input
        className={cx(
          'auth-input__input',
          errorMessage && 'auth-input__input--error',
        )}
        type={type}
        onChange={handleChange}
        value={value}
      />
      <div className="auth-input__right-el">{rightEl}</div>
      {errorMessage && (
        <span className="auth-input__error-message">{errorMessage}</span>
      )}
    </div>
  );
};

AuthInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  rightEl: PropTypes.element,
  type: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default AuthInput;
