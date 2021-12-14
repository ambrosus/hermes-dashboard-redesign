import React, { useEffect, useState } from 'react';
import moment from 'moment';
import cx from 'classnames';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import UiButton from '../UiButton';
import borderOutlet from '../../assets/svg/border_outer.svg';
import { ReactComponent as DatePickerIcon } from '../../assets/svg/date-picker.svg';
import placePickerIcon from '../../assets/svg/place-picker.svg';

const timeFilter = ['Day', 'Week', 'Month', 'Year'];

const Sorting = ({ filter }) => {
  const [currentTimeFilter, setCurrentTimeFilter] = useState('Year');
  const [dateRangeFilterValue, setDateRangeFilterValue] = useState(null);

  const { assetsList } = useSelector((state) => state.assets);

  useEffect(() => {
    const newList = assetsList.filter((el) =>
      moment(moment.unix(el.content.idData.timestamp)).isAfter(
        moment().subtract(1, currentTimeFilter.toLowerCase()),
      ),
    );
    filter(newList);
  }, [currentTimeFilter, assetsList]);

  useEffect(() => {
    if (dateRangeFilterValue) {
      const { dateFrom, dateTo } = dateRangeFilterValue;

      const newList = assetsList.filter((el) =>
        moment(moment.unix(el.content.idData.timestamp)).isBetween(
          dateFrom,
          dateTo,
        ),
      );
      filter(newList);
    } else {
      filter(assetsList);
    }
  }, [dateRangeFilterValue, assetsList]);

  const handleDateRange = (event, picker) => {
    const { startDate, endDate } = picker;
    setDateRangeFilterValue({ dateFrom: startDate, dateTo: endDate });
  };

  const cancelDateRangeFilter = () => setDateRangeFilterValue(null);

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
        <DateRangePicker
          onApply={handleDateRange}
          onCancel={cancelDateRangeFilter}
        >
          <button
            type="button"
            className={cx(
              'btn plain',
              dateRangeFilterValue && 'plain-selected',
            )}
          >
            <DatePickerIcon />
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
