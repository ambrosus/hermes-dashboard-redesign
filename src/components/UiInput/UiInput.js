import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const UiInput = ({
  label,
  placeholder,
  onclick,
  type = 'text',
  imgSrc,
  value = '',
  onChange,
  className,
  onImageClick,
  disabled,
  name,
  onEnterPress = () => {},
  rightEl,
  onKeyPress = () => {},
  errorMessage,
  maxLength = 0,
  maxNumber,
  minNumber = 0,
}) => {
  const handleInput = ({ target }) =>
    onChange(name ? { [name]: target.value } : target.value);

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      onEnterPress();
    }
    onKeyPress(event);
  };

  const maxLengthAttr = { ...(maxLength && { maxLength }) };
  const maxNumberAttr = {
    ...(!!maxNumber && type === 'number' && { max: maxNumber, min: minNumber }),
  };

  return (
    <div
      className={cx('ui-input', className)}
      onClick={onclick}
      role="presentation"
    >
      {label && <label className="ui-input__label">{label}</label>}
      <input
        className={cx(
          'ui-input__input',
          imgSrc && 'ui-input__input--with-icon',
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        {...maxLengthAttr}
        {...maxNumberAttr}
      />
      {imgSrc && (
        <img
          style={{ cursor: onImageClick ? 'pointer' : 'auto' }}
          role="presentation"
          onClick={onImageClick}
          src={imgSrc}
          alt="input-icon"
          className="ui-input__icon"
        />
      )}
      {rightEl && (
        <div
          role="presentation"
          className="ui-input__el"
          onClick={onImageClick}
        >
          {rightEl}
        </div>
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

UiInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onclick: PropTypes.func,
  imgSrc: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onImageClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onEnterPress: PropTypes.func,
  onKeyPress: PropTypes.func,
  rightEl: PropTypes.element,
  errorMessage: PropTypes.string,
  maxLength: PropTypes.number,
  maxNumber: PropTypes.number,
  minNumber: PropTypes.number,
};

export default UiInput;
