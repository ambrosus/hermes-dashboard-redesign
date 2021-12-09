import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as LocationSvg } from '../../assets/svg/location.svg';
import { ReactComponent as TruckSvg } from '../../assets/svg/truck.svg';

const EventTabItem = ({ data }) => {
  const { location } = useHistory();
  const contentData =
    data.content.data.find((el) => el.type === 'ambrosus.asset.info') ||
    data.content.data[0];

  const { timestamp } = data.content.idData;
  const date = moment.unix(timestamp);

  return (
    <div className="event-tab-item">
      <div className="event-tab-item__type event-tab-item__type--transfer">
        <TruckSvg />
        <span className="event-tab-item__type-name">Transfer</span>
        <span>{date.format('DD.MM.YYYY')}</span>
      </div>
      <div className="event-tab-item__info">
        <Link to={`${location.pathname}/events/${data.eventId}`}>
          <p className="event-tab-item__title">{contentData.name}</p>
        </Link>
        <div className="event-tab-item__sub-info">
          <span className="event-tab-item__when">
            {moment().add(1, 'day').diff(date, 'days')} days ago
          </span>
          <span className="event-tab-item__where">
            <LocationSvg />
            Odessa, Ukraine
          </span>
        </div>
      </div>
    </div>
  );
};

EventTabItem.propTypes = {
  data: PropTypes.object,
};

export default EventTabItem;
