import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as LocationSvg } from '../../assets/svg/location.svg';
import truckSvg from '../../assets/svg/truck.svg';
import eventLocationSvg from '../../assets/svg/eventLocation.svg';
import mediaSvg from '../../assets/svg/eventMedia.svg';
import packSvg from '../../assets/svg/eventPack.svg';
import unpackSvg from '../../assets/svg/unpack.svg';
import dateFormatter from '../../utils/dateFormatter';

const EventTabItem = ({ data }) => {
  const { location } = useHistory();
  const contentData =
    data.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    data.content.data[0];

  const locationData = data.content.data.find(
    (el) => el.type === 'ambrosus.event.location',
  );

  const { timestamp } = data.content.idData;
  const date = moment.unix(timestamp);

  let eventTypeText = contentData.type;
  let eventTypeImg = '';
  let eventTypeColor = '#c9c9c9';

  if (contentData.type === 'ambrosus.asset.info') {
    eventTypeText = 'info';
  } else if (contentData.type === 'ambrosus.event.pack') {
    eventTypeColor = '#8A8DF3';
    eventTypeImg = packSvg;
    eventTypeText = 'package';
  } else if (contentData.type === 'ambrosus.event.unpack') {
    eventTypeColor = '#545697';
    eventTypeImg = unpackSvg;
    eventTypeText = 'unpack';
  } else if (contentData.type === 'media') {
    eventTypeImg = mediaSvg;
    eventTypeColor = '#22DED5';
  } else if (contentData.type === 'location') {
    eventTypeImg = eventLocationSvg;
    eventTypeColor = '#1ACD8C';
  } else if (contentData.type === 'transfer') {
    eventTypeImg = truckSvg;
    eventTypeColor = '#FF9E57';
  }

  return (
    <div className="event-tab-item">
      <div
        className="event-tab-item__type"
        style={{ background: eventTypeColor }}
      >
        {eventTypeImg && <img src={eventTypeImg} alt={eventTypeText} />}
        <span className="event-tab-item__type-name">{eventTypeText}</span>
        <span>{date.format('DD MMM YYYY')}</span>
      </div>
      <div className="event-tab-item__info">
        <Link to={`${location.pathname}/events/${data.eventId}`}>
          <p className="event-tab-item__title">{contentData.name}</p>
        </Link>
        <div className="event-tab-item__sub-info">
          <span className="event-tab-item__when">
            {dateFormatter(date)} ago
          </span>
          {locationData && locationData.city && (
            <span className="event-tab-item__where">
              <LocationSvg />
              {locationData.city}
              {locationData.country ? `, ${locationData.country}` : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

EventTabItem.propTypes = {
  data: PropTypes.object,
};

export default EventTabItem;
