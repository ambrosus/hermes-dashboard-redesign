import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick';

const UiSelect = ({
  label,
  selectedValue,
  options,
  placeholder,
  onChange,
  name,
}) => {
  const selectEl = useRef(null);
  const [isOptionsOpened, setIsOptionsOpened] = useDetectOutsideClick(
    selectEl,
    false,
  );
  const toggleOptionsVisibility = () => setIsOptionsOpened(!isOptionsOpened);

  const handleChange = (value) => {
    onChange(name ? { [name]: value } : value);
    setIsOptionsOpened(false);
  };

  return (
    <div className="ui-input ui-select" ref={selectEl}>
      {label && <label className="ui-input__label">{label}</label>}
      <button
        type="button"
        className="ui-input__input"
        onClick={toggleOptionsVisibility}
      >
        {selectedValue ? (
          <span className="ui-select__value">
            {options.find((el) => el.value === selectedValue).label}
          </span>
        ) : (
          <span className="ui-select__placeholder">{placeholder}</span>
        )}
      </button>
      {isOptionsOpened && (
        <ul className="ui-select__options">
          {options.map((el) => (
            <li key={el.value}>
              <button
                className="ui-select__option"
                type="button"
                onClick={() => handleChange(el.value)}
              >
                {el.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

UiSelect.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default UiSelect;
