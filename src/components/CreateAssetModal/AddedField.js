import React from 'react';
import PropTypes from 'prop-types';
import UiInput from '../UiInput';
import closeFilledIcon from '../../assets/svg/close-filled.svg';

const AddedField = ({ items, deleteItem, itemName, placeholder }) => (
  <>
    {items.map((el) => (
      <div key={el} className="form-semicolon-wrapper">
        <UiInput
          label={el === 0 ? 'Name' : ''}
          placeholder={`${placeholder} name`}
        />
        <UiInput
          label={el === 0 ? 'Description' : ''}
          placeholder={`${placeholder} description`}
        />
        {el !== 0 && (
          <button
            type="button"
            className="create-asset-form__delete-property"
            onClick={() => deleteItem(el, itemName)}
          >
            <img src={closeFilledIcon} alt="delete property" />
          </button>
        )}
      </div>
    ))}
  </>
);

AddedField.propTypes = {
  items: PropTypes.array,
  deleteItem: PropTypes.func,
  itemName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AddedField;
