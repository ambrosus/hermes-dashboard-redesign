import React from 'react';
import { useSelector } from 'react-redux';
import UiButton from '../UiButton';
import EventTabItem from './EventTabItem';

const EventTab = () => {
  const events = useSelector((state) => state.assets.eventsList);

  return (
    <div className="event-tab">
      <div className="asset-tab-title-wrapper">
        <p className="asset-tab-title">All events</p>
        <UiButton styles={{ width: 200 }}>Add Event</UiButton>
      </div>
      {events.map((el) => (
        <EventTabItem key={el.eventId} data={el} />
      ))}
    </div>
  );
};

export default EventTab;
