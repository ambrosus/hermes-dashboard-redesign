import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import copyIcon from '../../assets/svg/copy-icon.svg';
import UiButton from '../UiButton';
import { ReactComponent as ChevronSvg } from '../../assets/svg/chevron.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { ReactComponent as DeletePackageSvg } from '../../assets/svg/delete.svg';
import { ReactComponent as AddPackageSvg } from '../../assets/svg/add-icon.svg';
import assetPlaceholderImage from '../../assets/raster/aset-image-placeholder.png';
import boxImage from '../../assets/svg/delivery-box.svg';
import containerImage from '../../assets/svg/container.svg';
import palleteImage from '../../assets/svg/pallet.svg';

const AssetItem = ({ isOnAssetPage, assetData, selected, handleSelect }) => {
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

  let img;

  if (assetContentInfo.images && assetContentInfo.images.default.url) {
    img = assetContentInfo.images.default.url;
  } else if (assetContentInfo.assetType === 'box') {
    img = boxImage;
  } else if (assetContentInfo.assetType === 'pallet') {
    img = palleteImage;
  } else if (assetContentInfo.assetType === 'container') {
    img = containerImage;
  } else {
    img = assetPlaceholderImage;
  }

  return (
    <div
      className={cx(
        'asset-item',
        isOnAssetPage && 'asset-item--asset-page',
        selected && 'asset-item--selected',
      )}
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
        <div
          role="presentation"
          onClick={handleSelect ? select : null}
          className={cx(
            'asset-item__img',
            ['box', 'pallet', 'container'].includes(
              assetContentInfo.assetType,
            ) &&
              !assetContentInfo.images?.default.url &&
              'asset-item__img--svg',
          )}
        >
          <img src={img} alt="asset" />
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
