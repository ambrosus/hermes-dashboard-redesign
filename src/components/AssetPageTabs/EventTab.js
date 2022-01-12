import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UiButton from '../UiButton';
import EventTabItem from './EventTabItem';
import { isEmptyObj } from '../../utils/isEmptyObj';
import { handleModal } from '../../store/modules/modal';

const EventTab = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.assets.eventsList);
  const { userInfo } = useSelector((state) => state.auth);
  if (isEmptyObj(events)) {
    return null;
  }

  const openCreateEventModal = () =>
    dispatch(handleModal({ name: 'createEvent' }));

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
      {events ? (
        events.map((el) => <EventTabItem key={el.eventId} data={el} />)
      ) : (
        <span>There are no events in this asset</span>
      )}
    </div>
  );
};

export default EventTab;
