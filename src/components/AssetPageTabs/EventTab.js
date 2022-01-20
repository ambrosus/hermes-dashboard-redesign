import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import UiButton from '../UiButton';
import EventTabItem from './EventTabItem';
import { handleModal } from '../../store/modules/modal';
import InfiniteScroll from '../InfiniteScroll';
import { fetchEventsInfo } from '../../store/modules/assets/actions';

const EventTab = ({ assetId }) => {
  const dispatch = useDispatch();

  const { eventsList, eventPagination } = useSelector((state) => state.assets);
  const { userInfo } = useSelector((state) => state.auth);

  const openCreateEventModal = () =>
    dispatch(handleModal({ name: 'createEvent' }));

  const showMore = () => {
    if (eventPagination.hasNext) {
      dispatch(fetchEventsInfo(assetId, eventPagination.next));
    }
  };
  return (
    <div className="event-tab">
      <div className="asset-tab-title-wrapper">
        <p className="asset-tab-title">All events</p>
        {userInfo.permissions && userInfo.permissions.includes('create_event') && (
          <UiButton
            styles={{ width: 200, height: 48 }}
            onclick={openCreateEventModal}
            type="primary"
          >
            Add Event
          </UiButton>
        )}
      </div>
      {eventsList.length ? (
        <InfiniteScroll handleObserver={showMore}>
          {eventsList.map((el) => (
            <EventTabItem key={el.eventId} data={el} />
          ))}
        </InfiniteScroll>
      ) : (
        <span>There are no events in this asset</span>
      )}
    </div>
  );
};

EventTab.propTypes = {
  assetId: PropTypes.object,
};

export default EventTab;
