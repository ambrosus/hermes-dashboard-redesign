import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { useDispatch, useSelector } from 'react-redux';
import UiButton from '../UiButton';
import { ReactComponent as DatePickerIcon } from '../../assets/svg/date-picker.svg';
import { handleAssetsListSearch } from '../../store/modules/assets/actions';

const timeFilter = ['Day', 'Week', 'Month', 'Year'];

const Sorting = ({ selectAll, unselectAll }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { isAssetsLoading } = useSelector((state) => state.assets);

  const [currentTimeFilter, setCurrentTimeFilter] = useState('');
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

  const handleCurrentTimeFilter = (time) => {
    const filterTime = time === currentTimeFilter ? '' : time;

    setCurrentTimeFilter(filterTime);
    if (filterTime) {
      const timestamp = moment().subtract(1, time.toLowerCase()).unix();
      dispatch(
        handleAssetsListSearch([
          {
            operator: 'greater-than-equal',
            field: 'content.idData.timestamp',
            value: timestamp,
          },
        ]),
      );
    } else {
      dispatch(handleAssetsListSearch([]));
    }
  };

  const handleDateRange = (event, picker) => {
    setIsDateRangeSelected(true);

    const { startDate, endDate } = picker;
    dispatch(
      handleAssetsListSearch([
        {
          operator: 'inrange',
          field: 'content.idData.timestamp',
          value: {
            'greater-than-equal': startDate.unix(),
            'less-than-equal': endDate.unix(),
          },
        },
      ]),
    );
  };

  const cancelDateRangeFilter = () => {
    setIsDateRangeSelected(false);
    dispatch(handleAssetsListSearch([]));
  };

  return (
    <div className="assets-sorting">
      {userInfo.permissions && userInfo.permissions.includes('create_event') && (
        <div className="assets-sorting__selects">
          <button type="button" onClick={selectAll} className="select-all-btn">
            Select all
          </button>
          <button
            type="button"
            onClick={unselectAll}
            className="select-all-btn"
          >
            Unselect all
          </button>
        </div>
      )}
      <div className="assets-sorting__period-pick">
        {timeFilter.map((el) => (
          <UiButton
            key={el}
            type="plain"
            selected={el === currentTimeFilter}
            disabled={isAssetsLoading}
            onclick={() => handleCurrentTimeFilter(el)}
          >
            {el}
          </UiButton>
        ))}
      </div>
      <div className="assets-sorting__advanced-sorting">
        <DateRangePicker
          onApply={handleDateRange}
          onCancel={cancelDateRangeFilter}
        >
          <button
            type="button"
            className={cx('btn plain', isDateRangeSelected && 'plain-selected')}
          >
            <DatePickerIcon />
          </button>
        </DateRangePicker>
      </div>
    </div>
  );
};

Sorting.propTypes = {
  selectAll: PropTypes.func,
  unselectAll: PropTypes.func,
};

export default Sorting;
