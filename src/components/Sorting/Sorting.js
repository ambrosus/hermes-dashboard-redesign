import React, { useEffect, useMemo, useState } from 'react';
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
  const { isAssetsLoading, assetsSearchParams } = useSelector(
    (state) => state.assets,
  );

  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
  const [currentTimeFilter, setCurrentTimeFilter] = useState('');
  const [pickerRefresher, setPickerRefresher] = useState(true);

  useEffect(() => {
    if (assetsSearchParams.length === 1) {
      if (assetsSearchParams[0].operator === 'greater-than-equal') {
        let prevTimeFilter = '';

        timeFilter.forEach((el) => {
          const checkDate = moment().subtract(1, el.toLowerCase()).unix();

          if (assetsSearchParams[0].value < checkDate) {
            prevTimeFilter = el;
          }
        });

        setCurrentTimeFilter(prevTimeFilter);
      }
    }
  }, []);

  useEffect(() => {
    if (!pickerRefresher) {
      setPickerRefresher(true);
    }
  }, [pickerRefresher]);

  const initRangeDates = useMemo(() => {
    if (assetsSearchParams[0] && assetsSearchParams[0].operator === 'inrange') {
      setIsDateRangeSelected(true);

      return {
        endDate: moment
          .unix(assetsSearchParams[0].value['less-than-equal'])
          .format('MM/DD/YYYY'),
        startDate: moment
          .unix(assetsSearchParams[0].value['greater-than-equal'])
          .format('MM/DD/YYYY'),
      };
    }
    return {};
  }, [assetsSearchParams]);

  const handleCurrentTimeFilter = (time) => {
    const filterTime = time === currentTimeFilter ? '' : time;

    setCurrentTimeFilter(filterTime);

    setPickerRefresher(false);
    setIsDateRangeSelected(false);

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
    setCurrentTimeFilter('');

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
    if (isDateRangeSelected) {
      setIsDateRangeSelected(false);
      dispatch(handleAssetsListSearch([]));
    }
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
        {pickerRefresher && (
          <DateRangePicker
            onApply={handleDateRange}
            onCancel={cancelDateRangeFilter}
            initialSettings={initRangeDates || {}}
          >
            <button
              type="button"
              className={cx(
                'btn plain',
                isDateRangeSelected && 'plain-selected',
              )}
            >
              <DatePickerIcon />
            </button>
          </DateRangePicker>
        )}
      </div>
    </div>
  );
};

Sorting.propTypes = {
  selectAll: PropTypes.func,
  unselectAll: PropTypes.func,
};

export default Sorting;
