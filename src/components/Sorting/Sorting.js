import React, { useEffect, useState } from 'react';
/*eslint-disable*/
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import UiButton from '../../components/UiButton';
import borderOutlet from '../../assets/svg/border_outer.svg';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import datePickerIcon from '../../assets/svg/date-picker.svg';
import placePickerIcon from '../../assets/svg/place-picker.svg';
import moment from 'moment';
const timeFilter = ['Day', 'Week', 'Month', 'Year'];

const Sorting = ({ filter }) => {
  const [currentTimeFilter, setCurrentTimeFilter] = useState('Year');
  const { assetsList } = useSelector((state) => state.assets);

  useEffect(() => {
    const newList = assetsList.filter((el) =>
      moment(moment.unix(el.content.idData.timestamp)).isAfter(
        moment().subtract(1, currentTimeFilter.toLowerCase()),
      ),
    );
    filter(newList);
  }, [currentTimeFilter, assetsList]);

  return (
    <div className="assets-sorting">
      <div className="assets-sorting__selects">
        <div>Select all</div>
        <div>Unselect all</div>
      </div>
      <div className="assets-sorting__period-pick">
        {timeFilter.map((el) => (
          <UiButton
            key={el}
            type="plain"
            selected={el === currentTimeFilter}
            onclick={() => setCurrentTimeFilter(el)}
          >
            {el}
          </UiButton>
        ))}
      </div>
      <div className="assets-sorting__advanced-sorting">
        <UiButton type="plain">
          <img src={borderOutlet} alt="border-outlet" />
        </UiButton>
        <DateRangePicker>
          <button type="button" className="btn plain">
            <img src={datePickerIcon} alt="place-picker" />
          </button>
        </DateRangePicker>
        <UiButton type="plain">
          <img src={placePickerIcon} alt="place-picker" />
        </UiButton>
      </div>
    </div>
  );
};

Sorting.propTypes = {
  filter: PropTypes.func,
};
export default Sorting;
