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
  const [selectedKeyByArrow, setSelectedKeyByArrow] = useState(null);
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
    const filtered = filterOptions(options, inputValue);

    setFilteredOptions(filtered);
    if (filtered.length) {
      setIsOptionsOpened(true);
    }
  }, [options]);

  useEffect(() => {
    setIsOptionsOpened(false);
  }, []);

  const toggleOptionsVisibility = () => setIsOptionsOpened((isOpen) => !isOpen);

  const handleChange = (value) => {
    onChange(name ? { [name]: value } : value);
    setInputValue(value);
    setIsOptionsOpened(false);
  };

  const filterOptions = (array, value) =>
    array.filter(
      (el) => el && el.label.toLowerCase().includes(value.toLowerCase()),
    );

  const handleSearch = (value) => {
    onSearch(value);
    setInputValue(value);

    if (
      !value ||
      !conditionToOnlyDropdownSelect ||
      !conditionToOnlyDropdownSelect(value)
    ) {
      onChange(name ? { [name]: value } : value);
    }

    let filtered;

    if (searchable) {
      filtered = filterOptions(options, value);
      setFilteredOptions(filtered);
    }

    setSelectedKeyByArrow(null);

    if (value) {
      if (filtered.length) {
        setIsOptionsOpened(true);
      } else {
        setIsOptionsOpened(false);
      }
    } else {
      setIsOptionsOpened(false);
    }
  };

  const handleShowDropdown = () => {
    setFilteredOptions(options);
    toggleOptionsVisibility();
  };

  const handleKeyPress = (event) => {
    const lastElementIdx = filteredOptions.length - 1;

    if (event.keyCode === 40) {
      if (
        selectedKeyByArrow === null ||
        selectedKeyByArrow === lastElementIdx
      ) {
        setSelectedKeyByArrow(0);
      } else {
        setSelectedKeyByArrow((key) => key + 1);
      }
    } else if (event.keyCode === 38) {
      if (selectedKeyByArrow === null || selectedKeyByArrow === 0) {
        setSelectedKeyByArrow(lastElementIdx);
      } else {
        setSelectedKeyByArrow((key) => key - 1);
      }
    }
  };

  const selectValueByEnter = () => {
    handleChange(filteredOptions[selectedKeyByArrow].value);
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
        onKeyPress={handleKeyPress}
        onEnterPress={selectValueByEnter}
      />
      {isOptionsOpened && (
        <ul className="ui-select__options">
          {filteredOptions.map((el, i) => (
            <li key={el.value}>
              <button
                className={cx(
                  'ui-select__option',
                  i === selectedKeyByArrow && 'ui-select__option--selected',
                )}
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
