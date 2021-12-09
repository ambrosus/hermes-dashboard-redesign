import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UiInput from '../UiInput';
import searchIcon from '../../assets/svg/search.svg';

const SearchInput = ({ className }) => {
  const [value, setValue] = useState('');
  return (
    <UiInput
      value={value}
      onChange={setValue}
      placeholder="Value"
      imgSrc={searchIcon}
      className={className}
    />
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

export default SearchInput;
