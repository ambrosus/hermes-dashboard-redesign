import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AuthInput = ({
  className,
  onChange,
  label,
  passwordInput,
  value,
  placeholder,
  rightEl,
  leftEl,
  type = 'text',
  errorMessage,
  maxLength = 0,
}) => {
  const [showPass, setShowPass] = useState(false);
  const handleChange = ({ target }) => onChange(target.value);
  const handleShowPassword = () => setShowPass(!showPass);

  const maxLengthProp = { ...(maxLength && { maxLength }) };

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
        placeholder={placeholder}
        className={cx(
          'auth-input__input',
          errorMessage && 'auth-input__input--error',
        )}
        /* eslint-disable-next-line */
        type={passwordInput ? (showPass ? 'text' : 'password') : type}
        onChange={handleChange}
        value={value}
        {...maxLengthProp}
      />
      <div
        className="auth-input__right-el"
        role="presentation"
        style={{ cursor: 'pointer' }}
        onClick={() => passwordInput && handleShowPassword()}
      >
        {rightEl}
      </div>
      <div className="auth-input__left-el">{leftEl}</div>
      {errorMessage && (
        <span className="auth-input__error-message">{errorMessage}</span>
      )}
    </div>
  );
};

AuthInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  passwordInput: PropTypes.bool,
  rightEl: PropTypes.element,
  leftEl: PropTypes.element,
  type: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  maxLength: PropTypes.number,
};

export default AuthInput;
