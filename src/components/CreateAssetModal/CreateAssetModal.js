import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationManager from 'react-notifications/lib/NotificationManager';
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
import { ReactComponent as DeleteIcon } from '../../assets/svg/trash.svg';
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
  { value: 'ambrosus.event.unpack', label: 'Unpack' },
];

const CreateAssetModal = ({
  isCreateEvent,
  bulkEventData = {},
  assetId,
  modalType,
  submitCallback,
}) => {
  const dispatch = useDispatch();

  const { data: initialData } = useSelector((state) => state.modal.openedModal);

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
    city: '',
    country: '',
  });
  const [jsonData, setJsonData] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem('createAssetData');
    let data = dataFromStorage ? JSON.parse(dataFromStorage) : {};

    data = data[modalType] || {};

    if (initialData) {
      data = initialData;
    }

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
    setDataInLocalStorage({ formData: { ...formData, rows: [] } });
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

  const mediaBundle = (
    JSON.stringify(createAssetNormalizer(formData)).length /
    1024 /
    1024
  ).toFixed(4);

  const handleBundleSize = (size, callback) => {
    if (size / 1024 / 1024 + +mediaBundle < 16) {
      callback();
    } else {
      NotificationManager.error('Bundle size is too big');
    }
  };

  const addImg = () => {
    const { images } = formData;

    if (imgUrl && !images.find((el) => el === imgUrl)) {
      if (!images.length) {
        setCoverImg(imgUrl);
      }
      handleBundleSize(imgUrl.length, () => {
        handleSetFormData({ images: [...images, imgUrl] });
        setImgUrl('');
      });
    }
  };

  const deleteImg = (url) => {
    if (formData.coverImgUrl === url) {
      setCoverImg('');
    }
    handleSetFormData({ images: formData.images.filter((el) => el !== url) });
  };

  const setCoverImg = (url, isRemove) => {
    handleSetFormData({ coverImgUrl: isRemove ? '' : url });
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
    setFormData((state) => ({
      ...state,
      ...keyValue,
    }));
  };

  const isFieldsPairFilled = () => {
    const groupFieldsKeys = Object.keys(formData).filter((el) =>
      el.includes('groupPropertyItems'),
    );

    const pairsFieldsNames = [
      ...groupFieldsKeys,
      'propertiesItems',
      'identifiersItems',
    ];
    let isFilled = true;

    pairsFieldsNames.forEach((item) => {
      Object.keys(formData[item]).forEach((el) => {
        if (el === 'groupName') {
          if (!formData[item][el]) {
            isFilled = false;
          }
        } else {
          const { name, description } = formData[item][el];

          if (
            ((name || description) && name && !description) ||
            (!name && description)
          ) {
            isFilled = false;
          }
        }
      });
    });

    return isFilled;
  };

  const showResultModal = () => {
    if (isFieldsPairFilled()) {
      const data = isJSONForm ? JSON.parse(jsonData) : formData;

      let submitFunc = () => createAsset(data, isJSONForm);

      if (isCreateEvent) {
        submitFunc = () => createEvent(assetId, formData);
      }
      if (!isEmptyObj(bulkEventData)) {
        submitFunc = () => bulkEvents(bulkEventData.assetsIds, formData);
        submitCallback();
      }

      dispatch(
        handleModal({
          name: 'createResult',
          data: {
            submitFunc,
            isEvent: isCreateEvent || !isEmptyObj(bulkEventData),
          },
        }),
      );

      localStorage.removeItem('createAssetData');
    } else {
      setIsSubmitted(true);
    }
  };

  const processFile = (files) => {
    let filesSize = 0;

    for (let i = 0; i < files.length; i += 1) {
      filesSize += files[i].size;
    }
    handleBundleSize(filesSize + 4 * 1024 * 1024, () => {
      for (let i = 0; i < files.length; i += 1) {
        handleRaw(files[i]);
      }
    });
  };

  const handleRaw = async (blob) => {
    const reader = new FileReader();

    if (blob) {
      await reader.readAsDataURL(blob);
    }

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

      setFormData((state) => ({
        ...state,
        rows: [
          ...state.rows,
          {
            name: blob.name,
            data: reader.result,
            expansion,
            nameExpansion,
            type,
            background: FileIcon,
          },
        ],
      }));
    };
  };

  const addRow = () => {
    const value = rowUrl;

    if (value) {
      const nameExpansion = value.match(/\w[^.]*$/)[0];
      console.log(value);
      let name = value.split('/');
      name = name[name.length - 1];

      handleBundleSize(value.length, () => {
        handleSetFormData({
          rows: [
            ...formData.rows,
            {
              name: name || value,
              data: value,
              nameExpansion,
              type: 'url',
              background: FileIcon,
            },
          ],
        });
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

  const isShowLocation = isCreateEvent || !isEmptyObj(bulkEventData);

  const deleteGroup = (el) => {
    setGroupFields((state) => state.filter((idx) => el !== idx));

    delete additionalFields[`groupPropertyItems${el}`];
    setAdditionalFields(additionalFields);

    delete formData[`groupPropertyItems${el}`];
    setFormData(formData);
  };

  return (
    <div>
      <div className="create-asset">
        <div className="create-asset__scroll">
          <p className="create-asset-form__media-bundle">
            Media bundle size <span>{mediaBundle} Mb </span>
            from <span>16 Mb</span>
          </p>
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
              <div className="form-semicolon-wrapper create-asset-btns">
                <UiButton type="secondary" onclick={closeModal}>
                  Cancel
                </UiButton>
                <UiButton
                  type="primary"
                  disabled={!jsonData.length}
                  onclick={showResultModal}
                >
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
                className="create-asset-form__textarea"
                name="description"
                value={formData.description}
                onChange={handleSetFormData}
              />
              <div className="hr-line" />
              <UiInput
                placeholder="Enter an image url here"
                label={`${entityName} images`}
                imgSrc={addIcon}
                onImageClick={addImg}
                onChange={setImgUrl}
                value={imgUrl}
                onEnterPress={addImg}
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
                            formData.coverImgUrl === el &&
                              'create-asset-form__set-cover-img--selected',
                          )}
                          onClick={() =>
                            setCoverImg(el, formData.coverImgUrl === el)
                          }
                        >
                          {formData.coverImgUrl === el && <CheckboxIcon />}
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
              <p className="ui-input__label">Raws</p>
              <DragAndDrop dropped={processFile} />
              <UiInput
                placeholder="Or enter a raw file url"
                imgSrc={addIcon}
                onChange={setRowUrl}
                onImageClick={addRow}
                value={rowUrl}
                onEnterPress={addRow}
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
                        isSubmitted={isSubmitted}
                      />
                      <button
                        onClick={addProperties}
                        type="button"
                        className="add-form-item-btn"
                      >
                        <img src={addIcon} alt="add icon" />
                        Add properties
                      </button>
                      {groupFields.map((el, i) => (
                        <div key={el} className="create-asset-form__group">
                          <div className="hr-line" />
                          <button
                            type="button"
                            className="create-asset-form__group-delete"
                            onClick={() => deleteGroup(el)}
                          >
                            <DeleteIcon />
                            Delete group
                          </button>
                          <UiInput
                            label={`${i + 1}. Group name`}
                            placeholder="Group name"
                            value={
                              formData[`groupPropertyItems${el}`].groupName
                            }
                            onChange={(value) => setGroupName(value, el)}
                            errorMessage={
                              isSubmitted &&
                              !formData[`groupPropertyItems${el}`].groupName &&
                              'Field required'
                            }
                          />
                          <AddedField
                            items={additionalFields[`groupPropertyItems${el}`]}
                            deleteItem={deleteAdditionalField}
                            placeholder="Group property"
                            itemName={`groupPropertyItems${el}`}
                            fieldsData={formData[`groupPropertyItems${el}`]}
                            onChange={handleSetFormData}
                            isSubmitted={isSubmitted}
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
                        isSubmitted={isSubmitted}
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
              {isShowLocation && (
                <div className="create-asset-form__item-wrapper">
                  <div
                    className={cx(
                      'create-asset-title',
                      isLocationOpened && 'create-asset-title--opened',
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
                        <Map
                          isInCreate
                          getMarkerPosition={handleMapCoords}
                          coordinates={{
                            lat: formData.latitude,
                            lng: formData.longitude,
                          }}
                        />
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
            </form>
          )}
        </div>
      </div>
      {!isJSONForm && (
        <div className="form-semicolon-wrapper create-asset-btns">
          <UiButton type="secondary" onclick={closeModal}>
            Cancel
          </UiButton>
          <UiButton
            onclick={showResultModal}
            type="primary"
            disabled={!formData.name || !formData.customType}
          >
            {!isEmptyObj(bulkEventData) ? (
              'Bulk Event'
            ) : (
              <span>Create {isCreateEvent ? 'Event' : 'Asset'}</span>
            )}
          </UiButton>
        </div>
      )}
    </div>
  );
};

CreateAssetModal.propTypes = {
  isCreateEvent: PropTypes.bool,
  bulkEventData: PropTypes.object,
  assetId: PropTypes.string,
  modalType: PropTypes.string,
  submitCallback: PropTypes.func,
};

export default CreateAssetModal;
