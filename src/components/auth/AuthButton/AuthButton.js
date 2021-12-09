import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AuthButton = ({
  children,
  onClick,
  disabled,
  type = 'button',
  plain,
  className,
}) => (
  <button
    /* eslint-disable-next-line react/button-has-type */
    type={type}
    className={cx('auth-button', className, plain && 'auth-button--plain')}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

AuthButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  plain: PropTypes.bool,
};

export default AuthButton;
