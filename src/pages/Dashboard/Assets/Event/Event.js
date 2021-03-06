import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UiButton from '../../../../components/UiButton';
import PageMainContent from '../../../../components/PageMainContent';
import { isEmptyObj } from '../../../../utils/isEmptyObj';
import AssetItem from '../../../../components/AssetItem';
import { fetchEventsInfo } from '../../../../store/modules/assets/actions';
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/svg/arrow-left.svg';
import CreateAssetModal from '../../../../components/CreateAssetModal';
import UiModal from '../../../../components/UiModal';
import assetInfoTransform from '../../../../utils/assetInfoTransform';
import { handleModal } from '../../../../store/modules/modal';
import { ReactComponent as VisibilityOffSvg } from '../../../../assets/svg/visibility_off.svg';
import { ReactComponent as VisibilitySvg } from '../../../../assets/svg/visibility.svg';

const Event = () => {
  const { assetId, eventId } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.assets.eventsList);

  useEffect(() => {
    dispatch(fetchEventsInfo(assetId));
    window.scrollTo(0, 0);
  }, []);

  if (isEmptyObj(events)) {
    return null;
  }

  const currentEvent = events.find((el) => el.eventId === eventId);

  const assetInfo =
    currentEvent.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    currentEvent.content.data[0];

  const location = currentEvent.content.data.find(
    (el) => el.type === 'ambrosus.event.location',
  );

  const handleOpenSimilarEventModal = () => {
    const dataFromStorage = localStorage.getItem('createAssetData');
    const data = dataFromStorage ? JSON.parse(dataFromStorage) : {};

    localStorage.setItem(
      'createAssetData',
      JSON.stringify({
        ...data,
        similarEvent: assetInfoTransform(currentEvent, true),
      }),
    );

    dispatch(handleModal({ name: 'similarEvent' }));
  };

  return (
    <div className="event-page">
      <Link to={`/dashboard/assets/${assetId}`} className="back-arrow-btn">
        <ArrowLeftIcon />
      </Link>
      <div className="container">
        {assetInfo.images && assetInfo.images.default && (
          <img
            className="page-top-img"
            src={assetInfo.images.default.url}
            alt="asset"
          />
        )}
        <div className="event-page__top-block">
          <div className="asset-page__type">
            {currentEvent.content.idData.accessLevel === 1 ? (
              <>
                <VisibilityOffSvg />
                Private
              </>
            ) : (
              <>
                <VisibilitySvg />
                Public
              </>
            )}
          </div>
          <UiButton
            type="secondary"
            className="event-page__similar-event"
            styles={{ width: 160, height: 48 }}
            onclick={handleOpenSimilarEventModal}
          >
            Add similar event
          </UiButton>
        </div>
        <AssetItem isOnAssetPage assetData={currentEvent} />
        <PageMainContent data={currentEvent} location={location} />
        <Link to={`/dashboard/assets/${assetId}`}>
          <UiButton styles={{ height: 40 }} type="primary">
            Back to asset
          </UiButton>
        </Link>
      </div>
      <UiModal isFullWindow modalName="similarEvent">
        <CreateAssetModal
          isCreateEvent
          modalType="similarEvent"
          assetId={assetId}
        />
      </UiModal>
    </div>
  );
};

export default Event;
