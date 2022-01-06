import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { handleModal } from '../../store/modules/modal';
import UiInput from '../UiInput';
import UiSelect from '../UiSelect';
import UiToggle from '../UiToggle';
import { ReactComponent as VisibilityIcon } from '../../assets/svg/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '../../assets/svg/visibility_off.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/svg/checkmark-transparent.svg';
import { ReactComponent as CloseFilledIcon } from '../../assets/svg/close-filled.svg';
import { ReactComponent as CheckboxIcon } from '../../assets/svg/checkbox-green.svg';
import FileIcon from '../../assets/svg/file.svg';
// eslint-disable-next-line import/no-duplicates
import chevronImg from '../../assets/svg/chevron.svg';
import UiTextarea from '../UiTextaera';
import addIcon from '../../assets/svg/add-icon.svg';
import UiButton from '../UiButton';
import AddedField from './AddedField';
import createAssetNormalizer from '../../utils/createAssetNormalizer';
import { isEmptyObj } from '../../utils/isEmptyObj';
import {
  bulkEvents,
  createAsset,
  createEvent,
} from '../../store/modules/assets/actions';
// eslint-disable-next-line import/no-duplicates
import { ReactComponent as ChevronSvg } from '../../assets/svg/chevron.svg';
import Map from '../GoogleMap';
import DragAndDrop from '../DragAndDrop';

const privateToggleOptions = [
  {
    value: 0,
    label: (
      <span>
        <VisibilityIcon />
        Public
      </span>
    ),
  },
  {
    value: 1,
    label: (
      <span>
        <VisibilityOffIcon />
        Private
      </span>
    ),
  },
];

const assetTypes = [
  { value: 'box', label: 'Box' },
  { value: 'pallet', label: 'Pallet' },
  { value: 'container', label: 'Container' },
];

const eventTypes = [
  { value: 'transfer', label: 'Transfer' },
  { value: 'location', label: 'Location' },
  { value: 'media', label: 'Media' },
  { value: 'ambrosus.event.pack', label: 'Package' },
];

const CreateAssetModal = ({
  isCreateEvent,
  bulkEventData = {},
  assetId,
  modalType,
}) => {
  const dispatch = useDispatch();

  const [isPropertyOpened, setIsPropertyOpened] = useState(false);
  const [isIdentifiersOpened, setIsIdentifiersOpened] = useState(false);
  const [isLocationOpened, setIsLocationOpened] = useState(false);

  const [isJSONForm, setIsJSONForm] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [rowUrl, setRowUrl] = useState('');
  const [additionalFields, setAdditionalFields] = useState({
    propertiesItems: [0],
    identifiersItems: [0],
  });
  const [groupFields, setGroupFields] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    customType: '',
    description: '',
    propertiesItems: {},
    identifiersItems: {},
    images: [],
    coverImgUrl: '',
    rows: [],
    latitude: '',
    longitude: '',
    accessLevel: 0,
  });
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    const dataFromStorage = localStorage.getItem('createAssetData');
    let data = dataFromStorage ? JSON.parse(dataFromStorage) : {};

    data = data[modalType] || {};

    if (data.additionalFields) {
      setAdditionalFields(data.additionalFields);
    }
    if (data.groupFields) {
      setGroupFields(data.groupFields);
    }
    if (data.formData) {
      setFormData(data.formData);
    }
  }, []);

  useEffect(() => {
    setDataInLocalStorage({ additionalFields });
  }, [additionalFields]);

  useEffect(() => {
    setDataInLocalStorage({ groupFields });
  }, [groupFields]);

  useEffect(() => {
    setDataInLocalStorage({ formData });
  }, [formData]);

  const setDataInLocalStorage = (keyValue) => {
    const dataFromStorage = localStorage.getItem('createAssetData');
    const data = dataFromStorage ? JSON.parse(dataFromStorage) : {};

    localStorage.setItem(
      'createAssetData',
      JSON.stringify({
        ...data,
        [modalType]: { ...data[modalType], ...keyValue },
      }),
    );
  };

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
    const fieldData = formData[itemName];
    delete fieldData[idx];
    handleSetFormData({ [itemName]: fieldData });

    const clone = [...additionalFields[itemName]];
    const filtered = clone.filter((el) => el !== idx);
    setAdditionalFields({ ...additionalFields, [itemName]: filtered });
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
    const data = isJSONForm ? JSON.parse(jsonData) : formData;

    let submitFunc = () => createAsset(data, isJSONForm);

    if (isCreateEvent) {
      submitFunc = () => createEvent(assetId, formData);
    }
    if (modalType === 'editAsset') {
      submitFunc = () => createEvent(assetId, formData, true);
    }
    if (!isEmptyObj(bulkEventData)) {
      submitFunc = () => bulkEvents(bulkEventData.assetsIds, formData);
    }

    dispatch(
      handleModal({
        name: 'createResult',
        data: submitFunc,
      }),
    );

    localStorage.removeItem('createAssetData');
  };

  const handleRaw = async (blob) => {
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

      handleSetFormData({
        rows: [
          ...formData.rows,
          {
            name: blob.name,
            data: reader.result,
            expansion,
            nameExpansion,
            type,
            background: FileIcon,
          },
        ],
      });
    };
  };

  const addRow = () => {
    const value = rowUrl;
    const nameExpansion = value.match(/\w[^.]*$/)[0];

    if (value) {
      let name = value.split('/');
      name = name[name.length - 1];

      handleSetFormData({
        rows: [
          ...formData.rows,
          {
            name,
            data: value,
            nameExpansion,
            type: 'url',
            background: FileIcon,
          },
        ],
      });

      setRowUrl('');
    }
  };

  const deleteFile = (name) => {
    handleSetFormData({
      rows: formData.rows.filter((el) => el.name !== name),
    });
  };

  const entityName =
    isCreateEvent || !isEmptyObj(bulkEventData) ? 'Event' : 'Asset';

  const handlePropertyOpen = () => setIsPropertyOpened(!isPropertyOpened);
  const handleLocationOpen = () => setIsLocationOpened(!isLocationOpened);
  const handleIdentifiersOpen = () =>
    setIsIdentifiersOpened(!isIdentifiersOpened);

  const handleMapCoords = ({ lat, lng, city, country }) => {
    handleSetFormData({ longitude: lng, latitude: lat, city, country });
  };

  return (
    <div className="create-asset">
      <div
        className="create-asset-title"
        style={{ padding: '0 0 20px 0', cursor: 'auto' }}
      >
        <h3 className="create-asset-title__text">New {entityName}</h3>
        {!isEmptyObj(bulkEventData) && (
          <span className="create-asset-title__bulk">
            For {bulkEventData.assetsIds.length} assets
          </span>
        )}
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
        <>
          <UiTextarea
            label="JSON*"
            rows="20"
            value={jsonData}
            onChange={setJsonData}
          />
          <div className="form-semicolon-wrapper">
            <UiButton
              onclick={closeModal}
              styles={{ background: '#9198BB', padding: 12 }}
            >
              Cancel
            </UiButton>
            <UiButton styles={{ padding: 12 }} onclick={showResultModal}>
              Create {entityName}
            </UiButton>
          </div>
        </>
      ) : (
        <form className="create-asset-form">
          <UiInput
            label="Name*"
            placeholder={`${entityName} name`}
            name="name"
            onChange={handleSetFormData}
            value={formData.name}
          />
          <div className="form-semicolon-wrapper">
            <UiSelect
              className="create-asset-form__type"
              options={
                isCreateEvent || !isEmptyObj(bulkEventData)
                  ? eventTypes
                  : assetTypes
              }
              placeholder={`${entityName} type`}
              label={`${entityName} type*`}
              name="customType"
              onChange={handleSetFormData}
              selectedValue={formData.customType}
              imgSrc={chevronImg}
            />
            <UiToggle
              label="Access level"
              options={privateToggleOptions}
              selectedValue={formData.accessLevel}
              onChange={handleSetFormData}
              name="accessLevel"
            />
          </div>
          <UiTextarea
            placeholder={`${entityName} description`}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleSetFormData}
          />
          <hr />
          <div className="create-asset-form__media-bundle">
            Media bundle size{' '}
            <span>
              {(
                JSON.stringify(createAssetNormalizer(formData)).length /
                1024 /
                1024
              ).toFixed(4)}{' '}
              Mb
            </span>{' '}
            from <span>16 Mb</span>
          </div>
          <UiInput
            placeholder="Enter an image url here"
            label={`${entityName} images`}
            imgSrc={addIcon}
            onImageClick={addImg}
            onChange={setImgUrl}
            value={imgUrl}
          />
          {!!formData.images.length && (
            <>
              <span className="create-asset-form__checkmark-label">
                <CheckmarkIcon />
                Check for cover image
              </span>
              <div className="create-asset-form__added-img-wrapper">
                {formData.images.map((el) => (
                  <div key={el} className="create-asset-form__added-img">
                    <button
                      type="button"
                      className={cx(
                        'create-asset-form__set-cover-img',
                        'create-asset-form__set-cover-img',
                        formData.coverImgUrl === el &&
                          'create-asset-form__set-cover-img--selected',
                      )}
                      onClick={() => setCoverImg(el)}
                    >
                      <CheckboxIcon />
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
          <p className="ui-input__label">Rows</p>
          <DragAndDrop dropped={handleRaw} />
          <UiInput
            placeholder="Raws"
            imgSrc={addIcon}
            onChange={setRowUrl}
            onImageClick={addRow}
            value={rowUrl}
          />
          <div className="create-asset-form__added-img-wrapper">
            {formData.rows.map((el) => (
              <div key={el} className="create-asset-form__added-img">
                <img src={el.background} alt="row-file" />
                <button
                  type="button"
                  className="create-asset-form__delete-img"
                  onClick={() => deleteFile(el.name)}
                >
                  <CloseFilledIcon />
                </button>
                <p className="create-asset-form__added-file-name">
                  {el.name.length > 20
                    ? `${el.name.substring(
                        0,
                        17 - el.nameExpansion.length,
                      )}...${el.nameExpansion}`
                    : el.name}
                </p>
              </div>
            ))}
          </div>
          <div className="create-asset-form__item-wrapper">
            <div
              className={cx(
                'create-asset-title',
                isPropertyOpened && 'create-asset-title--opened',
              )}
              onClick={handlePropertyOpen}
              role="presentation"
            >
              <h3 className="create-asset-title__text">Properties</h3>
              <ChevronSvg />
            </div>
            {isPropertyOpened && (
              <>
                <div className="create-asset-form__item-wrapper-padding">
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
                    className="add-form-item-btn"
                  >
                    <img src={addIcon} alt="add icon" />
                    Add properties
                  </button>
                  {groupFields.map((el) => (
                    <div key={el} className="create-asset-form__group">
                      <hr />
                      <UiInput
                        label="Group name"
                        placeholder="Group name"
                        value={formData[`groupPropertyItems${el}`].groupName}
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
                        className="add-form-item-btn"
                        onClick={() => addGroupProperty(el)}
                      >
                        <img src={addIcon} alt="add icon" />
                        Add properties
                      </button>
                    </div>
                  ))}
                </div>
                <UiButton
                  type="light"
                  styles={{ padding: 12 }}
                  onclick={addGroup}
                >
                  <>
                    <img src={addIcon} alt="add icon" />
                    Add group
                  </>
                </UiButton>
              </>
            )}
          </div>
          <div className="create-asset-form__item-wrapper">
            <div
              className={cx(
                'create-asset-title',
                isIdentifiersOpened && 'create-asset-title--opened',
              )}
              onClick={handleIdentifiersOpen}
              role="presentation"
            >
              <h3 className="create-asset-title__text">Identifiers</h3>
              <ChevronSvg />
            </div>
            {isIdentifiersOpened && (
              <>
                <div className="create-asset-form__item-wrapper-padding">
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
                    className="add-form-item-btn"
                  >
                    <img src={addIcon} alt="add icon" />
                    Add identifier
                  </button>
                </div>
              </>
            )}
          </div>
          {isCreateEvent && (
            <div className="create-asset-form__item-wrapper">
              <div
                className={cx(
                  'create-asset-title',
                  isPropertyOpened && 'create-asset-title--opened',
                )}
                onClick={handleLocationOpen}
                role="presentation"
              >
                <h3 className="create-asset-title__text">Location</h3>
                <ChevronSvg />
              </div>
              {isLocationOpened && (
                <>
                  <div className="create-asset-form__map">
                    <Map getMarkerPosition={handleMapCoords} />
                  </div>
                  <div
                    className="form-semicolon-wrapper"
                    style={{ padding: '0 20px' }}
                  >
                    <UiInput
                      type="number"
                      label="Latitude"
                      name="latitude"
                      onChange={handleSetFormData}
                      value={formData.latitude}
                    />
                    <UiInput
                      type="number"
                      label="Longitude"
                      name="longitude"
                      onChange={handleSetFormData}
                      value={formData.longitude}
                    />
                  </div>
                  <div
                    className="form-semicolon-wrapper"
                    style={{ padding: '0 20px' }}
                  >
                    <UiInput
                      label="City"
                      name="city"
                      onChange={handleSetFormData}
                      value={formData.city}
                    />
                    <UiInput
                      label="Country"
                      name="country"
                      onChange={handleSetFormData}
                      value={formData.country}
                    />
                  </div>
                </>
              )}
            </div>
          )}
          <div className="form-semicolon-wrapper">
            <UiButton type="secondary" onclick={closeModal}>
              Cancel
            </UiButton>
            <UiButton
              styles={{ padding: 12 }}
              onclick={showResultModal}
              disabled={!formData.name || !formData.customType}
            >
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
  bulkEventData: PropTypes.object,
  assetId: PropTypes.string,
  modalType: PropTypes.string,
};

export default CreateAssetModal;
