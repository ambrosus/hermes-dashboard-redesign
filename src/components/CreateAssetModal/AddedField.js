import React from 'react';
import PropTypes from 'prop-types';
import UiInput from '../UiInput';
import closeFilledIcon from '../../assets/svg/close-filled.svg';

const AddedField = ({
  fieldsData,
  items,
  deleteItem,
  itemName,
  placeholder,
  onChange,
}) => {
  const handleChange = (el, value) => {
    onChange({
      [itemName]: {
        ...fieldsData,
        [el]: {
          ...fieldsData[el],
          ...value,
        },
      },
    });
  };

  return (
    <>
      {items &&
        items.map((el) => (
          <div key={el} className="form-semicolon-wrapper">
            <UiInput
              value={fieldsData[el]?.name}
              label={el === 0 ? 'Name' : ''}
              placeholder={`${placeholder} name`}
              onChange={(value) => handleChange(el, value)}
              name="name"
            />
            <UiInput
              value={fieldsData[el]?.description}
              label={el === 0 ? 'Description' : ''}
              placeholder="Description"
              onChange={(value) => handleChange(el, value)}
              name="description"
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
};

AddedField.propTypes = {
  items: PropTypes.array,
  deleteItem: PropTypes.func,
  onChange: PropTypes.func,
  itemName: PropTypes.string,
  placeholder: PropTypes.string,
  fieldsData: PropTypes.object,
};

export default AddedField;
