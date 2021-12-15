import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import UiButton from '../UiButton';
import EventTabItem from './EventTabItem';
import { isEmptyObj } from '../../utils/isEmptyObj';
import { handleModal } from '../../store/modules/modal';

const EventTab = ({ assetId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.assets.eventsList);

  if (isEmptyObj(events)) {
    return null;
  }

  const openCreateEventModal = () =>
    dispatch(handleModal({ name: 'createEvent' }));

  return (
    <div className="event-tab">
      <div className="asset-tab-title-wrapper">
        <p className="asset-tab-title">All events</p>
        <UiButton styles={{ width: 200 }} onclick={openCreateEventModal}>
          Add Event
        </UiButton>
      </div>
      {events[assetId] ? (
        events[assetId].map((el) => <EventTabItem key={el.eventId} data={el} />)
      ) : (
        <span>There are no events in this asset</span>
      )}
    </div>
  );
};

EventTab.propTypes = {
  assetId: PropTypes.string,
};

export default EventTab;
