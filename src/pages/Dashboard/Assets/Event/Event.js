import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UiButton from '../../../../components/UiButton';
import PageMainContent from '../../../../components/PageMainContent';
import { isEmptyObj } from '../../../../utils/isEmptyObj';
import AssetItem from '../../../../components/AssetItem';

const Event = () => {
  const { assetId, eventId } = useParams();
  const events = useSelector((state) => state.assets.eventsList);

  if (isEmptyObj(events)) {
    return null;
  }

  const currentEvent = events[assetId].find((el) => el.eventId === eventId);

  const assetInfo =
    currentEvent.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    currentEvent.content.data[0];

  const location = currentEvent.content.data.find(
    (el) => el.type === 'ambrosus.event.location',
  );
  return (
    <div className="event-page">
      <div className="container">
        {assetInfo.images && assetInfo.images.default && (
          <img
            className="page-top-img"
            src={assetInfo.images.default.url}
            alt="asset"
          />
        )}
        <UiButton className="event-page__similar-event">
          Add similar event
        </UiButton>
        <AssetItem isOnAssetPage assetData={currentEvent} />
        <PageMainContent data={currentEvent} location={location} />
        <Link to={`/dashboard/assets/${assetId}`}>
          <UiButton className="event-page__back">Back to asset</UiButton>
        </Link>
      </div>
    </div>
  );
};

export default Event;
