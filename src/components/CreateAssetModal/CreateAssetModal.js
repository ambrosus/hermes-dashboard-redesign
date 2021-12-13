import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { handleModal } from '../../store/modules/modal';
import UiInput from '../UiInput';
import UiSelect from '../UiSelect';
import UiToggle from '../UiToggle';
import visibilityIcon from '../../assets/svg/visibility.svg';
import visibilityOffIcon from '../../assets/svg/visibility_off.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/svg/checkmark-transparent.svg';
import { ReactComponent as CloseFilledIcon } from '../../assets/svg/close-filled.svg';
import UiTextarea from '../UiTextaera';
import addIcon from '../../assets/svg/add-icon.svg';
import uploadIcon from '../../assets/svg/upload.svg';
import infoIcon from '../../assets/svg/info-filled.svg';
import UiButton from '../UiButton';
import AddedField from './AddedField';

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

const CreateAssetModal = ({ isCreateEvent }) => {
  const dispatch = useDispatch();

  const [isJSONForm, setIsJSONForm] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [additionalFields, setAdditionalFields] = useState({
    propertiesItems: [0],
    identifiersItems: [0],
  });
  const [groupFields, setGroupFields] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    propertiesItems: {},
    identifiersItems: {},
    images: [],
    coverImgUrl: '',
  });

  const setJSONForm = () => setIsJSONForm(true);
  const setUsualForm = () => setIsJSONForm(false);

  const addImg = () => {
    const { images } = formData;

    if (imgUrl && !images.find((el) => el === imgUrl)) {
      handleSetFormData({ images: [...images, imgUrl] });
      setImgUrl('');
    }
  };

  const deleteImg = (url) => {
    handleSetFormData({ images: formData.images.filter((el) => el !== url) });
  };

  const setCoverImg = (url) => {
    handleSetFormData({ coverImgUrl: url });
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
  const addIdentifier = () => addAdditionalField('identifiersItems');

  const deleteAdditionalField = (idx, itemName) => {
    const clone = [...additionalFields[itemName]];
    clone.splice(idx, 1);

    setAdditionalFields({ ...additionalFields, [itemName]: clone });
  };

  const addGroup = () => {
    const currentItemsName = `groupPropertyItems${groupFields.length}`;

    setGroupFields([...groupFields, groupFields.length]);
    setFormData({ ...formData, [currentItemsName]: {} });
    setAdditionalFields({
      ...additionalFields,
      [currentItemsName]: [0],
    });
  };

  const addGroupProperty = (el) => {
    const currentItemsName = `groupPropertyItems${el}`;
    const currentItems = additionalFields[currentItemsName];

    setAdditionalFields({
      ...additionalFields,
      [currentItemsName]: [...currentItems, currentItems.length],
    });
  };

  const setGroupName = (value, el) => {
    const currentItemsName = `groupPropertyItems${el}`;

    setFormData({
      ...formData,
      [currentItemsName]: {
        ...formData[currentItemsName],
        groupName: value,
      },
    });
  };
  const closeModal = () => dispatch(handleModal(null));

  const handleSetFormData = (keyValue) => {
    setFormData({
      ...formData,
      ...keyValue,
    });
  };

  const showResultModal = () => {
    dispatch(
      handleModal({
        name: 'createResult',
        data: isCreateEvent ? { ...formData, isCreateEvent: true } : formData,
      }),
    );
  };

  const handleRaw = async (e) => {
    const { files } = e.target;

    const blob = files[0];

    const reader = new FileReader();
    await reader.readAsDataURL(blob);

    reader.onloadend = () => {
      if (!reader.result) {
        return;
      }

      const nameExpansion = blob.name.match(/\w[^.]*$/)[0];
      // eslint-disable-next-line no-nested-ternary
      const type = blob.type.match(/^\w*/)
        ? blob.type.match(/^\w*/)[0]
        : nameExpansion === 'wbmp'
        ? 'image'
        : 'unknown';
      const expansion = blob.type.match(/\w[^/]*$/)
        ? blob.type.match(/\w[^/]*$/)[0]
        : nameExpansion;

      console.log({
        name: blob.name,
        data: reader.result,
        expansion,
        nameExpansion,
        type,
        background: '',
      });
    };
  };

  return (
    <div className="create-asset">
      <div className="create-asset-title">
        <h3 className="create-asset-title__text">New Asset</h3>
        <div>
          <button
            onClick={setUsualForm}
            type="button"
            className="create-asset-title__toggle-tab create-asset-title__toggle-tab--selected"
          >
            Form
          </button>
          <button
            onClick={setJSONForm}
            type="button"
            className="create-asset-title__toggle-tab"
          >
            JSON
          </button>
        </div>
      </div>
      {isJSONForm ? (
        <UiTextarea label="JSON*" rows="20" />
      ) : (
        <form className="create-asset-form">
          <UiInput
            label="Name*"
            placeholder="Asset name"
            name="name"
            onChange={handleSetFormData}
          />
          <div className="form-semicolon-wrapper">
            <UiSelect
              options={[
                { value: '1', label: 'Box' },
                { value: '2', label: 'Pallet' },
                { value: '3', label: 'Container' },
              ]}
              placeholder="Asset type"
              label="Asset type*"
              name="type"
              onChange={handleSetFormData}
              selectedValue={formData.type}
            />
            <UiToggle label="Access level" options={privateToggleOptions} />
          </div>
          <UiTextarea
            placeholder="Asset description"
            label="Description"
            name="description"
            onChange={handleSetFormData}
          />
          <hr />
          <div className="create-asset-form__media-bundle">
            Media bundle size{' '}
            <span>
              {(JSON.stringify(formData).length / 1024 / 1024).toFixed(4)} Mb
            </span>{' '}
            from <span>16 Mb</span>
          </div>
          <UiInput
            placeholder="Enter an image url here"
            label="Asset images"
            imgSrc={addIcon}
            onImageClick={addImg}
            onChange={setImgUrl}
            value={imgUrl}
          />
          {!!formData.images.length && (
            <>
              <span className="create-asset-form__checkmark-label">
                <CheckmarkIcon />
                Chek for cover image
              </span>
              <div className="create-asset-form__added-img-wrapper">
                {formData.images.map((el) => (
                  <div key={el} className="create-asset-form__added-img">
                    <button
                      type="button"
                      className={cx(
                        'create-asset-form__set-cover-img',
                        formData.coverImgUrl === el &&
                          'create-asset-form__set-cover-img--selected',
                      )}
                      onClick={() => setCoverImg(el)}
                    >
                      <CheckmarkIcon />
                    </button>
                    <img src={el} alt="added" />
                    <button
                      type="button"
                      className="create-asset-form__delete-img"
                      onClick={() => deleteImg(el)}
                    >
                      <CloseFilledIcon />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          <UiInput
            placeholder="Raws"
            label="Enter a raw file url"
            imgSrc={addIcon}
          />
          <input type="file" id="file-upload" onChange={handleRaw} />
          <label
            htmlFor="file-upload"
            className="btn create-asset-form__upload-file"
          >
            <img src={uploadIcon} alt="upload icon" />
            Or upload raw file
          </label>
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
            onChange={handleSetFormData}
            fieldsData={formData.propertiesItems}
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
              <UiInput
                label="Group name"
                placeholder="Group name"
                onChange={(value) => setGroupName(value, el)}
              />
              <AddedField
                items={additionalFields[`groupPropertyItems${el}`]}
                deleteItem={deleteAdditionalField}
                placeholder="Group property"
                itemName={`groupPropertyItems${el}`}
                fieldsData={formData[`groupPropertyItems${el}`]}
                onChange={handleSetFormData}
              />
              <button
                type="button"
                className="create-asset-form__add-btn"
                onClick={() => addGroupProperty(el)}
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
            onChange={handleSetFormData}
            fieldsData={formData.identifiersItems}
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
          {isCreateEvent && (
            <>
              <div className="create-asset-title">
                <h3 className="create-asset-title__text">Identifiers</h3>
              </div>
              <div className="form-semicolon-wrapper">
                <UiInput label="City" />
                <UiInput label="Country" />
              </div>
              <div className="form-semicolon-wrapper">
                <UiInput label="GLN" />
                <UiInput label="Location ID" />
              </div>
              <div className="form-semicolon-wrapper">
                <UiInput label="Latitude" />
                <UiInput label="Longitude" />
              </div>
              <hr />
            </>
          )}
          <div className="form-semicolon-wrapper">
            <UiButton
              onclick={closeModal}
              styles={{ background: '#9198BB', padding: 12 }}
            >
              Cancel
            </UiButton>
            <UiButton styles={{ padding: 12 }} onclick={showResultModal}>
              Create {isCreateEvent ? 'Event' : 'Asset'}
            </UiButton>
          </div>
        </form>
      )}
    </div>
  );
};

CreateAssetModal.propTypes = {
  isCreateEvent: PropTypes.bool,
};

export default CreateAssetModal;
