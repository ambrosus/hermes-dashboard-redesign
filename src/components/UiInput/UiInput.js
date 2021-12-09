import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const UiInput = ({
  label,
  placeholder,
  onclick,
  type = 'text',
  imgSrc,
  value,
  onChange,
  className,
  onImageClick,
}) => {
  const handleInput = ({ target }) => onChange(target.value);

  return (
    <div
      className={cx('ui-input', className, label ? 'ui-input--with-label' : '')}
      onClick={onclick}
      role="presentation"
    >
      {label && <label className="ui-input__label">{label}</label>}
      <input
        className="ui-input__input"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleInput}
      />
      {imgSrc && (
        <img
          role="presentation"
          onClick={onImageClick}
          src={imgSrc}
          alt="input-icon"
          className="ui-input__icon"
        />
      )}
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
  value: PropTypes.string,
  className: PropTypes.string,
};

export default UiInput;
