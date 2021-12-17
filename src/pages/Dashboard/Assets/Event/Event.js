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
  const location = currentEvent.content.data.find(
    (el) => el.type === 'ambrosus.event.location',
  );
  return (
    <div className="event-page">
      <div className="container">
        <img
          className="page-top-img"
          src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
          alt="asset"
        />
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
