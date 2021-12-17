import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import copyIcon from '../../assets/svg/copy-icon.svg';
import UiButton from '../UiButton';
import { ReactComponent as ChevronSvg } from '../../assets/svg/chevron.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { ReactComponent as DeletePackageSvg } from '../../assets/svg/delete.svg';
import { ReactComponent as AddPackageSvg } from '../../assets/svg/add-icon.svg';

const AssetItem = ({ isOnAssetPage, assetData, selected, handleSelect }) => {
  const events = useSelector((state) => state.assets.eventsList);
  const [showDetails, setShowDetails] = useState(false);

  const { assetId, createdBy, timestamp, sequenceNumber } =
    assetData.content.idData;

  const {
    bundleId,
    bundleTransactionHash,
    bundleUploadTimestamp,
    bundleProofBlock,
  } = assetData.metadata;

  const assetInfo = [
    { label: 'Asset ID', value: assetId },
    { label: 'Bundle ID', value: bundleId },
    { label: 'Created by', value: createdBy },
    { label: 'Bundle transaction hash', value: bundleTransactionHash },
    { label: 'Timestamp', value: timestamp },
    { label: 'Bundle upload time stamp', value: bundleUploadTimestamp },
    { label: 'Sequence number', value: sequenceNumber || 'No value' },
    { label: 'Bundle proof block', value: bundleProofBlock },
  ];

  const assetContentInfo =
    assetData.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    assetData.content.data[0];

  const date = moment
    .unix(assetData.content.idData.timestamp)
    .format('DD.MM.YYYY');

  const copyId = () => copyToClipboard(assetId);

  const select = () => handleSelect(assetId, !selected);

  const handleShowDetails = () => setShowDetails(!showDetails);

  return (
    <div
      role="presentation"
      className={cx(
        'asset-item',
        isOnAssetPage && 'asset-item--asset-page',
        selected && 'asset-item--selected',
      )}
      onClick={handleSelect ? select : null}
    >
      {handleSelect && (
        <button
          type="button"
          className={cx(
            'asset-item__handle-select',
            selected && 'asset-item__handle-select--selected',
          )}
        >
          {selected ? <DeletePackageSvg /> : <AddPackageSvg />}
        </button>
      )}
      {!isOnAssetPage && (
        <div className="asset-item__img">
          <img src={assetContentInfo.images?.default.url} alt="asset" />
        </div>
      )}
      <div
        className={cx(
          'asset-item__content',
          isOnAssetPage && 'asset-item__content--asset-page',
        )}
      >
        <Link to={`/dashboard/assets/${assetId}`} className="asset-item__title">
          {assetContentInfo.name.toString()}
        </Link>
        <div className="asset-item-info">
          {events[assetId] && (
            <div className="asset-item-info__events">
              {Object.keys(events[assetId]).length} Events
            </div>
          )}
          <span className="asset-item-info__address-label">Asset address</span>
          <span className="asset-item-info__address">{assetId}</span>
          <button type="button" onClick={copyId}>
            <img src={copyIcon} alt="copy" className="asset-item-info__copy" />
          </button>
          <span className="asset-item-info__date">{date}</span>
        </div>
        {isOnAssetPage && (
          <UiButton
            className={cx(
              'asset-item__show-details',
              showDetails && 'asset-item__show-details--active',
            )}
            type="icon"
            onclick={handleShowDetails}
          >
            <ChevronSvg />
          </UiButton>
        )}
      </div>
      {isOnAssetPage && showDetails && (
        <div className="asset-item-details">
          {assetInfo.map((el) => (
            <div key={el.label} className="asset-item-details__item">
              <p className="asset-item-details__title">{el.label}</p>
              <p className="asset-item-details__description">{el.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

AssetItem.propTypes = {
  isOnAssetPage: PropTypes.bool,
  selected: PropTypes.bool,
  assetData: PropTypes.object,
  handleSelect: PropTypes.func,
};

export default AssetItem;
