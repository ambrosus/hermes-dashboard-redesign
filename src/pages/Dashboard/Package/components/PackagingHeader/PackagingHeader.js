import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import UiToggle from '../../../../../components/UiToggle';
import { ReactComponent as VisibilityIcon } from '../../../../../assets/svg/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '../../../../../assets/svg/visibility_off.svg';
import borderOuter from '../../../../../assets/svg/border_outer.svg';
import UiInput from '../../../../../components/UiInput';
import { searchAssets } from '../../../../../store/modules/assets/actions';
import { useDebouncedEffect } from '../../../../../utils/useDebounce';
import UiSelect from '../../../../../components/UiSelect';

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

const PackagingHeader = ({ handleFormData, formData, errorFields }) => {
  const dispatch = useDispatch();

  const [searchedAssetsList, setSearchedAssetsList] = useState([]);
  const [assetSearchValue, setAssetSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useDebouncedEffect(
    () => {
      if (assetSearchValue && assetSearchValue.length !== 66) {
        setIsLoading(true);

        dispatch(
          searchAssets([
            {
              field: 'content.data.name',
              operator: 'contains',
              value: assetSearchValue,
            },
          ]),
        ).then((res) => {
          setSearchedAssetsList(res);
          setIsLoading(false);
        });
      }
    },
    [assetSearchValue],
    500,
  );

  const assetNames = useMemo(
    () =>
      searchedAssetsList.map((el) => {
        const info = el.content.data.find(
          (data) => data.type === 'ambrosus.asset.info',
        );
        return {
          label: info.name,
          value: el.content.idData.assetId,
        };
      }),
    [searchedAssetsList],
  );

  const setDropdownCondition = (value) => value.length !== 66;
  const handleAssetsSearch = (value) => {
    if (!value) {
      setSearchedAssetsList([]);
    }
    setAssetSearchValue(value);
  };

  return (
    <div className="packaging-header">
      <div className="packaging-header__privacy">
        <div className="primary">
          <ReactSVG src={borderOuter} wrapper="span" />
          Asset packing
        </div>
        <div>
          <UiToggle
            options={privateToggleOptions}
            selectedValue={formData.accessLevel}
            onChange={handleFormData}
            name="accessLevel"
          />
        </div>
      </div>
      <UiSelect
        options={assetNames || []}
        placeholder="Asset name / ID"
        name="assetId"
        onChange={handleFormData}
        selectedValue={formData.assetId}
        styles={{ marginBottom: 15 }}
        conditionToOnlyDropdownSelect={setDropdownCondition}
        onSearch={handleAssetsSearch}
        rightEl={isLoading ? <div className="loader" /> : null}
      />
      {errorFields.assetName && (
        <p className="error-message">
          Select asset name from dropdown or enter asset id
        </p>
      )}
      <UiInput
        className="packaging-header__privacy--input"
        placeholder="Event name"
        name="eventName"
        value={formData.eventName}
        onChange={handleFormData}
      />
      {errorFields.eventName && (
        <p className="error-message">Enter event name</p>
      )}
      <p className="packaging-header__description">
        You can create links between assets and events to pack them together.
        Specify &quot;Asset name / ID`&quot;` and enter &quot;Event name&quot;
        to start packing assets below.
      </p>
    </div>
  );
};

PackagingHeader.propTypes = {
  handleFormData: PropTypes.func,
  formData: PropTypes.object,
  errorFields: PropTypes.object,
};

export default PackagingHeader;
