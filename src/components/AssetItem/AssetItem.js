import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import copyIcon from '../../assets/svg/copy-icon.svg';
import UiButton from '../UiButton';
import { ReactComponent as ChevronSvg } from '../../assets/svg/chevron.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';

const AssetItem = ({ isOnAssetPage, assetData }) => {
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

  const assetName = assetData.content.data.find(
    (el) => el.type === 'ambrosus.asset.info',
  ).name;

  const date = moment
    .unix(assetData.content.idData.timestamp)
    .format('DD.MM.YYYY');

  const copyId = () => copyToClipboard(assetId);

  return (
    <div
      className={cx('asset-item', isOnAssetPage && 'asset-item--asset-page')}
    >
      {!isOnAssetPage && (
        <div className="asset-item__img">
          <img
            src="https://external-preview.redd.it/8xLKpKY3n1bB6E7LhtuK6fw9ETa3bj5nZ0sdQF_ZsjA.jpg?width=640&crop=smart&auto=webp&s=ceafbfdc02ccaae9a416e24c4893bc560c89cca3"
            alt=""
          />
        </div>
      )}
      <div
        className={cx(
          'asset-item__content',
          isOnAssetPage && 'asset-item__content--asset-page',
        )}
      >
        <Link to={`/dashboard/assets/${assetId}`} className="asset-item__title">
          {assetName}
        </Link>
        <div className="asset-item-info">
          <div className="asset-item-info__events">1434 Events</div>
          <span className="asset-item-info__address-label">Asset address</span>
          <span className="asset-item-info__address">{assetId}</span>
          <button type="button" onClick={copyId}>
            <img src={copyIcon} alt="copy" className="asset-item-info__copy" />
          </button>
          <span className="asset-item-info__date">{date}</span>
        </div>
        {isOnAssetPage && (
          <UiButton className="asset-item__show-details" type="icon">
            <ChevronSvg />
          </UiButton>
        )}
      </div>
      {isOnAssetPage && (
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
  assetData: PropTypes.object,
};

export default AssetItem;
