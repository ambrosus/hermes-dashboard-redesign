import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import borderOutlet from '../../../assets/svg/border_outer.svg';
import datePickerIcon from '../../../assets/svg/date-picker.svg';
import placePickerIcon from '../../../assets/svg/place-picker.svg';
import { fetchAssets } from '../../../store/modules/assets/actions';
import CreateAssetModal from '../../../components/CreateAssetModal';
import AssetItem from '../../../components/AssetItem';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';

const timeFilter = ['Day', 'Week', 'Month', 'Year'];

const Assets = () => {
  const dispatch = useDispatch();

  const [currentTimeFilter, setCurrentTimeFilter] = useState('Year');
  const [filteredList, setFilteredList] = useState([]);

  const { assetsList, assetsQueryData } = useSelector((state) => state.assets);

  const paginationInfo = useSelector(
    (state) => state.assets.assetsQueryData.pagination,
  );

  useEffect(() => {
    if (!assetsQueryData.data.length) {
      dispatch(fetchAssets());
    }
  }, []);

  useEffect(() => {
    const newList = assetsList.filter((el) =>
      moment(moment.unix(el.content.idData.timestamp)).isAfter(
        moment().subtract(1, currentTimeFilter.toLowerCase()),
      ),
    );
    setFilteredList(newList);
  }, [currentTimeFilter, assetsList]);

  const openCreateModal = () => dispatch(handleModal('createAsset'));

  const showMore = () => dispatch(fetchAssets(paginationInfo.next));

  return (
    <div className="dashboard-container">
      <div className="assets-options">
        <h1 className="assets-options__title">My Assets</h1>
        <div className="assets-options__buttons">
          <UiButton type="secondary">Packaging</UiButton>
          <UiButton type="primary" onclick={openCreateModal}>
            Create Asset
          </UiButton>
        </div>
      </div>
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
      <div className="assets-list">
        {!!assetsList &&
          filteredList.map((el) => (
            <AssetItem assetData={el} key={el.content.idData.assetId} />
          ))}
      </div>
      <CreateAssetModal />
      {paginationInfo.hasNext && !!assetsList.length && (
        <UiButton
          styles={{ margin: '64px auto 0' }}
          type="pale"
          onclick={showMore}
        >
          Show more
        </UiButton>
      )}
    </div>
  );
};

export default Assets;
