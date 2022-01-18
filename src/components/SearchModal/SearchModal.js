import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import UiInput from '../UiInput';
import searchIcon from '../../assets/svg/search.svg';
import calendarIcon from '../../assets/svg/date-picker.svg';
import AddedField from '../CreateAssetModal/AddedField';
import addIcon from '../../assets/svg/add-icon.svg';
import UiButton from '../UiButton';
import { isEmptyObj } from '../../utils/isEmptyObj';
import {
  searchAssets,
  setSearchedAssets,
} from '../../store/modules/assets/actions';
import { handleModal } from '../../store/modules/modal';

const SearchModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    dateFrom: '',
    dateTo: '',
    identifiers: {},
    city: '',
    country: '',
  });

  const [identifiersFields, setIdentifiersFields] = useState([0]);

  const handleSetFormData = (keyValue) =>
    setFormData({ ...formData, ...keyValue });

  const setFromDate = (event, picker) => {
    handleSetFormData({ dateFrom: picker.startDate });
  };

  const setToDate = (event, picker) => {
    handleSetFormData({ dateTo: picker.endDate });
  };

  const deleteIdentifiersField = (idx) => {
    const identifiers = JSON.parse(JSON.stringify(formData.identifiers));
    delete identifiers[idx];
    handleSetFormData({ identifiers });

    setIdentifiersFields(identifiersFields.filter((el) => el !== idx));
  };

  const addIdentifiersField = () => {
    setIdentifiersFields([
      ...identifiersFields,
      identifiersFields[identifiersFields.length - 1] + 1,
    ]);
  };

  const submitSearch = () => {
    const query = [];

    const { name, dateTo, dateFrom, identifiers, city, country } = formData;

    if (name) {
      query.push({
        field: 'content.data.name',
        operator: 'contains',
        value: name,
      });
    }

    if (dateTo && !dateFrom) {
      query.push({
        field: 'content.idData.timestamp',
        operator: 'less-than-equal',
        value: dateTo.unix(),
      });
    } else if (!dateTo && dateFrom) {
      query.push({
        field: 'content.idData.timestamp',
        operator: 'greater-than-equal',
        value: dateFrom.unix(),
      });
    } else if (dateTo && dateFrom) {
      query.push({
        field: 'content.idData.timestamp',
        operator: 'inrange',
        value: {
          'greater-than-equal': dateFrom.unix(),
          'less-than-equal': dateTo.unix(),
        },
      });
    }

    if (city) {
      query.push({
        field: 'content.data.city',
        operator: 'contains',
        value: city,
      });
    }
    if (country) {
      query.push({
        field: 'content.data.country',
        operator: 'contains',
        value: country,
      });
    }

    if (!isEmptyObj(identifiers)) {
      Object.keys(identifiers).forEach((el) => {
        query.push({
          field: `content.data.identifiers.${identifiers[el].name}`,
          operator: 'inrange',
          value: identifiers[el].description,
        });
      });
    }

    dispatch(searchAssets(query)).then((res) => {
      setFormData({
        name: '',
        dateFrom: '',
        dateTo: '',
        identifiers: {},
      });
      dispatch(setSearchedAssets(res));
      history.push('/dashboard/assets/search');
      closeModal();
    });
  };

  const closeModal = () => dispatch(handleModal({ name: '' }));

  return (
    <div className="search-modal">
      <h1 className="search-modal__title">Search</h1>
      <UiInput
        placeholder="Asset name / Address"
        imgSrc={searchIcon}
        name="name"
        onChange={handleSetFormData}
        value={formData.name}
      />
      <h2 className="search-modal__section-title">Date</h2>
      <div className="form-semicolon-wrapper">
        <DateRangePicker
          initialSettings={{ singleDatePicker: true }}
          onApply={setFromDate}
        >
          <div>
            <UiInput
              disabled
              className="search-modal__datepicker"
              label="From"
              placeholder="Date"
              imgSrc={calendarIcon}
              value={
                formData.dateFrom && formData.dateFrom.format('DD.MM.YYYY')
              }
            />
          </div>
        </DateRangePicker>
        <DateRangePicker
          initialSettings={{ singleDatePicker: true }}
          onApply={setToDate}
        >
          <div>
            <UiInput
              disabled
              className="search-modal__datepicker"
              label="To"
              placeholder="Date"
              imgSrc={calendarIcon}
              value={formData.dateTo && formData.dateTo.format('DD.MM.YYYY')}
            />
          </div>
        </DateRangePicker>
      </div>
      <div className="hr-line" style={{ margin: '24px 0' }} />
      <h2 className="search-modal__section-title">Identifiers</h2>
      <AddedField
        itemName="identifiers"
        deleteItem={deleteIdentifiersField}
        placeholder="Identifier"
        items={identifiersFields}
        onChange={handleSetFormData}
        fieldsData={formData.identifiers}
      />
      <button
        onClick={addIdentifiersField}
        type="button"
        className="add-form-item-btn"
      >
        <img src={addIcon} alt="add icon" />
        Add identifier
      </button>
      <div className="hr-line" style={{ margin: '24px 0' }} />
      <h2 className="search-modal__section-title">Location</h2>
      <div className="form-semicolon-wrapper">
        <UiInput
          label="City"
          name="city"
          onChange={handleSetFormData}
          placeholder="City"
          value={formData.city}
        />
        <UiInput
          label="Country"
          name="country"
          onChange={handleSetFormData}
          placeholder="Country"
          value={formData.country}
        />
      </div>
      <div className="form-semicolon-wrapper" style={{ marginTop: 40 }}>
        <UiButton
          type="secondary"
          styles={{ padding: 12 }}
          onclick={closeModal}
        >
          Cancel
        </UiButton>
        <UiButton styles={{ padding: 12 }} onclick={submitSearch}>
          Search
        </UiButton>
      </div>
    </div>
  );
};

export default SearchModal;
