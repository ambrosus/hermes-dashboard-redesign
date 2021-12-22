import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import UiInput from '../../../../components/UiInput';
import searchIcon from '../../../../assets/svg/search.svg';
import AddedField from '../../../../components/CreateAssetModal/AddedField';
import calendarIcon from '../../../../assets/svg/date-picker.svg';
import addIcon from '../../../../assets/svg/add-icon.svg';
import UiButton from '../../../../components/UiButton';
import { isEmptyObj } from '../../../../utils/isEmptyObj';
import AssetItem from '../../../../components/AssetItem';
import { searchAssets } from '../../../../store/modules/assets/actions';
import { useDebouncedEffect } from '../../../../utils/useDebounce';

const Search = () => {
  const dispatch = useDispatch();

  const [isListPage, setIsListPage] = useState(false);
  const [searchedAssets, setSearchedAssets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dateFrom: '',
    dateTo: '',
    identifiers: {},
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

    const { name, dateTo, dateFrom, identifiers } = formData;

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

    if (!isEmptyObj(identifiers)) {
      Object.keys(identifiers).forEach((el) => {
        query.push({
          field: `content.data.identifiers.${el.name}`,
          operator: 'inrange',
          value: el.description,
        });
      });
    }

    dispatch(searchAssets(query)).then((res) => {
      if (!searchedAssets.length) {
        setFormData({
          name: '',
          dateFrom: '',
          dateTo: '',
          identifiers: {},
        });
      }
      setSearchedAssets(res);
      setIsListPage(true);
    });
  };

  useDebouncedEffect(
    () => {
      if (formData.name && isListPage) {
        dispatch(
          searchAssets([
            {
              field: 'content.data.name',
              operator: 'contains',
              value: formData.name,
            },
          ]),
        ).then((res) => setSearchedAssets(res));
      }
    },
    [formData.name],
    500,
  );

  const setName = (value) => {
    setFormData({ ...formData, name: value });
  };

  return isListPage ? (
    <div className="search-result-page search-page">
      <h1 className="search-page__title">Search Results</h1>
      <UiInput
        placeholder="Name"
        className="search-result-page__input"
        imgSrc={searchIcon}
        onChange={setName}
        value={formData.name}
      />
      <p className="search-result-page__count">
        Found {searchedAssets.length} results
      </p>
      <div>
        {searchedAssets.map((el) => (
          <AssetItem assetData={el} key={el.content.idData.assetId} />
        ))}
      </div>
    </div>
  ) : (
    <div className="search-page">
      <h1 className="search-page__title">Search</h1>
      <UiInput
        placeholder="Asset name / Address"
        imgSrc={searchIcon}
        name="name"
        onChange={handleSetFormData}
        value={formData.name}
      />
      <h2 className="search-page__section-title">Date</h2>
      <div className="form-semicolon-wrapper">
        <DateRangePicker
          initialSettings={{ singleDatePicker: true }}
          onApply={setFromDate}
        >
          <div>
            <UiInput
              disabled
              className="search-page__datepicker"
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
              className="search-page__datepicker"
              label="To"
              placeholder="Date"
              imgSrc={calendarIcon}
              value={formData.dateTo && formData.dateTo.format('DD.MM.YYYY')}
            />
          </div>
        </DateRangePicker>
      </div>
      <hr style={{ margin: '24px 0' }} />
      <h2 className="search-page__section-title">Identifiers</h2>
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
      <div className="form-semicolon-wrapper" style={{ marginTop: 40 }}>
        <UiButton styles={{ background: '#9198BB', padding: 12 }}>
          Cancel
        </UiButton>
        <UiButton styles={{ padding: 12 }} onclick={submitSearch}>
          Search
        </UiButton>
      </div>
    </div>
  );
};

export default Search;
