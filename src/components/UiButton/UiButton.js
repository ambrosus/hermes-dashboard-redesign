import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const UiButton = ({
  priority,
  type,
  children,
  disabled,
  onclick,
  styles,
  nativeType = 'button',
  selected,
  className,
}) => {
  const cssClasses = cx(
    className,
    'btn',
    priority,
    type,
    selected ? 'selected' : '',
  );
  return (
    <button
      /* eslint-disable-next-line react/button-has-type */
      type={nativeType}
      disabled={disabled}
      onClick={onclick}
      className={cssClasses}
      style={styles}
    >
      {children}
    </button>
  );
};

UiButton.propTypes = {
  disabled: PropTypes.bool,
  onclick: PropTypes.func,
  styles: PropTypes.object,
  priority: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  nativeType: PropTypes.string,
  selected: PropTypes.bool,
  className: PropTypes.string,
};

export default UiButton;
