import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../store/modules/modal';
import UiInput from '../UiInput';
import UiSelect from '../UiSelect';
import UiToggle from '../UiToggle';
import visibilityIcon from '../../assets/svg/visibility.svg';
import visibilityOffIcon from '../../assets/svg/visibility_off.svg';
import UiTextaera from '../UiTextaera';
import addIcon from '../../assets/svg/add-icon.svg';
import uploadIcon from '../../assets/svg/upload.svg';
import infoIcon from '../../assets/svg/info-filled.svg';
import UiButton from '../UiButton';
import AddedField from './AddedField';
import UiModal from '../UiModal';

const privateToggleOptions = [
  {
    value: 1,
    label: (
      <span>
        <img src={visibilityIcon} alt="public-img" />
        Public
      </span>
    ),
  },
  {
    value: 2,
    label: (
      <span>
        <img src={visibilityOffIcon} alt="private-img" />
        Public
      </span>
    ),
  },
];

const CreateAssetModal = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [additionalFields, setAdditionalFields] = useState({
    propertiesItems: [0],
    propertyGroupItems: [0],
    identifiersItems: [0],
  });
  const [groupFields, setGroupFields] = useState([]);

  const addImg = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'HEAD',
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      true,
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr);
          alert(`Size in bytes: ${xhr.getResponseHeader('Content-Length')}`);
        } else {
          alert('ERROR');
        }
      }
    };
    xhr.send(null);
    if (imgUrl) {
      setImages([...images, imgUrl]);
    }
  };

  const deleteImg = (idx) => {
    console.log(idx);
  };

  const addAdditionalField = (itemName) => {
    const currentFields = additionalFields[itemName];

    setAdditionalFields({
      ...additionalFields,
      [itemName]: [
        ...currentFields,
        currentFields[currentFields.length - 1] + 1,
      ],
    });
  };

  const addProperties = () => addAdditionalField('propertiesItems');
  const addPropertyGroup = () => addAdditionalField('propertyGroupItems');
  const addIdentifier = () => addAdditionalField('identifiersItems');

  const deleteAdditionalField = (idx, itemName) => {
    const clone = [...additionalFields[itemName]];
    clone.splice(idx, 1);

    setAdditionalFields({ ...additionalFields, [itemName]: clone });
  };

  const addGroup = () => {
    setGroupFields([...groupFields, groupFields.length + 1]);
  };

  const closeModal = () => dispatch(handleModal(''));

  return (
    <UiModal modalName="createAsset">
      <div className="create-asset">
        <div className="create-asset-title">
          <h3 className="create-asset-title__text">New Asset</h3>
          <div>
            <button
              type="button"
              className="create-asset-title__toggle-tab create-asset-title__toggle-tab--selected"
            >
              Form
            </button>
            <button type="button" className="create-asset-title__toggle-tab">
              JSON
            </button>
          </div>
        </div>
        <form className="create-asset-form">
          <UiInput label="Name*" placeholder="Asset name" />
          <div className="form-semicolon-wrapper">
            <UiSelect
              options={[
                { value: 1, label: 'Box' },
                { value: 2, label: 'Pallet' },
                { value: 3, label: 'Container' },
              ]}
              placeholder="Asset type"
              label="Asset type*"
            />
            <UiToggle label="Access level" options={privateToggleOptions} />
          </div>
          <UiTextaera placeholder="Asset description" label="Description" />
          <hr />
          <div className="create-asset-form__media-bundle">
            Media bundle size <span>0 Mb</span> used from <span>16 Mb</span>
          </div>
          <UiInput
            placeholder="Enter an image url here"
            label="Asset images"
            imgSrc={addIcon}
            onImageClick={addImg}
            onChange={setImgUrl}
          />
          {images.map((el) => (
            <div className="create-asset-form__added-img">
              <img src={el} alt="added" />
              <button
                type="button"
                className="create-asset-form__delete-img"
                onClick={deleteImg}
              >
                x
              </button>
            </div>
          ))}
          <UiInput
            placeholder="Raws"
            label="Enter a raw file url"
            imgSrc={addIcon}
          />
          <UiButton className="create-asset-form__upload-file">
            <>
              <img src={uploadIcon} alt="upload icon" />
              Or upload raw file
            </>
          </UiButton>
          <hr />
          <div className="create-asset-title">
            <h3 className="create-asset-title__text">Properties</h3>
            <img src={infoIcon} alt="info icon" />
          </div>
          <AddedField
            itemName="propertiesItems"
            deleteItem={deleteAdditionalField}
            placeholder="Property"
            items={additionalFields.propertiesItems}
          />
          <button
            onClick={addProperties}
            type="button"
            className="create-asset-form__add-btn"
          >
            <img src={addIcon} alt="add icon" />
            Add properties
          </button>
          {groupFields.map((el) => (
            <div key={el} className="create-asset-form__group">
              <UiInput label="Group name" placeholder="Group name" />
              <AddedField
                items={additionalFields.propertyGroupItems}
                deleteItem={deleteAdditionalField}
                placeholder="Group property"
                itemName="propertyGroupItems"
              />
              <button
                onClick={addPropertyGroup}
                type="button"
                className="create-asset-form__add-btn"
              >
                <img src={addIcon} alt="add icon" />
                Add properties
              </button>
            </div>
          ))}
          <UiButton
            type="light"
            styles={{ padding: 12, marginTop: 60 }}
            onclick={addGroup}
          >
            <>
              <img src={addIcon} alt="add icon" />
              Add group
            </>
          </UiButton>
          <hr />
          <div className="create-asset-title">
            <h3 className="create-asset-title__text">Identifiers</h3>
            <img src={infoIcon} alt="info icon" />
          </div>
          <AddedField
            itemName="identifiersItems"
            deleteItem={deleteAdditionalField}
            placeholder="Identifier"
            items={additionalFields.identifiersItems}
          />
          <button
            onClick={addIdentifier}
            type="button"
            className="create-asset-form__add-btn"
          >
            <img src={addIcon} alt="add icon" />
            Add identifier
          </button>
          <hr />
          <div className="form-semicolon-wrapper">
            <UiButton
              onclick={closeModal}
              styles={{ background: '#9198BB', padding: 12 }}
            >
              Cancel
            </UiButton>
            <UiButton styles={{ padding: 12 }}>Create Asset</UiButton>
          </div>
        </form>
      </div>
    </UiModal>
  );
};

export default CreateAssetModal;
