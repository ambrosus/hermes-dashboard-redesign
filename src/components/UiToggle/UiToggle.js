import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const UiToggle = ({ selectedValue, options, onChange, label, name }) => {
  const handleChange = (value) => {
    onChange(name ? { [name]: value } : value);
  };

  return (
    <div className="ui-toggle ui-input">
      {label && <span className="ui-input__label">{label}</span>}
      <div className="ui-toggle__options-wrapper">
        {options.map((el) => (
          <button
            type="button"
            className={cx(
              'ui-toggle__option',
              selectedValue === el.value ? 'ui-toggle__option--selected' : '',
            )}
            key={el.value}
            onClick={() => handleChange(el.value)}
          >
            {el.label}
          </button>
        ))}
      </div>
    </div>
  );
};

UiToggle.propTypes = {
  selectedValue: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default UiToggle;
