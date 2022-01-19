import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick';
import UiInput from '../UiInput';

const UiSelect = ({
  label,
  selectedValue,
  options,
  placeholder,
  onChange,
  name,
  styles,
  conditionToOnlyDropdownSelect,
  searchable = true,
  onSearch = () => {},
  imgSrc,
  className,
  rightEl,
}) => {
  const selectEl = useRef(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(selectedValue);
  const [isOptionsOpened, setIsOptionsOpened] = useDetectOutsideClick(
    selectEl,
    false,
  );

  useEffect(() => {
    if (selectedValue && options && options.length) {
      const selectedItem = options.find((el) => selectedValue === el.value);

      setInputValue(selectedItem ? selectedItem.label : selectedValue);
    }
    if (!selectedValue) {
      setInputValue('');
    }
  }, [selectedValue]);

  useEffect(() => {
    if (inputValue) {
      if (filteredOptions.length) {
        setIsOptionsOpened(true);
      } else {
        setIsOptionsOpened(false);
      }
    } else {
      setIsOptionsOpened(false);
    }
  }, [inputValue]);

  useEffect(() => {
    setFilteredOptions(options);
    setIsOptionsOpened(true);
  }, [options]);

  const toggleOptionsVisibility = () => setIsOptionsOpened((isOpen) => !isOpen);

  const handleChange = (value) => {
    onChange(name ? { [name]: value } : value);
    setIsOptionsOpened(false);
    setInputValue(value);
  };

  const handleSearch = (value) => {
    onSearch(value);
    if (
      !value ||
      !conditionToOnlyDropdownSelect ||
      !conditionToOnlyDropdownSelect(value)
    ) {
      onChange(name ? { [name]: value } : value);
    }
    setInputValue(value);
    if (searchable) {
      setFilteredOptions(
        options.filter(
          (el) => el && el.label.toLowerCase().includes(value.toLocaleString()),
        ),
      );
    }
  };

  const handleShowDropdown = () => {
    setFilteredOptions(options);
    toggleOptionsVisibility();
  };

  return (
    <div className={cx('ui-select', className)} style={styles} ref={selectEl}>
      <UiInput
        value={inputValue}
        placeholder={placeholder}
        onChange={handleSearch}
        label={label}
        imgSrc={imgSrc}
        onImageClick={handleShowDropdown}
        rightEl={rightEl}
      />
      {isOptionsOpened && (
        <ul className="ui-select__options">
          {filteredOptions.map((el) => (
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
  className: PropTypes.string,
  imgSrc: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchable: PropTypes.bool,
  conditionToOnlyDropdownSelect: PropTypes.func,
  styles: PropTypes.object,
  rightEl: PropTypes.element,
};

export default UiSelect;
