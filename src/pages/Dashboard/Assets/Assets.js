import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAsset,
  fetchAssets,
} from '../../../store/modules/assets/actions';
import CreateAssetModal from '../../../components/CreateAssetModal';
import AssetItem from '../../../components/AssetItem';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';
import Sorting from '../../../components/Sorting';
import CreateResultModal from '../../../components/CreateResultModal';
import UiModal from '../../../components/UiModal';

const Assets = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const openCreateModal = () => dispatch(handleModal({ name: 'createAsset' }));
  const showMore = () => dispatch(fetchAssets(paginationInfo.next));
  const openPackagingHandler = () => history.push('/dashboard/package');

  return (
    <div className="dashboard-container">
      <div className="assets-options">
        <h1 className="assets-options__title">My Assets</h1>
        <div className="assets-options__buttons">
          <UiButton type="secondary" onclick={openPackagingHandler}>
            Packaging
          </UiButton>
          <UiButton type="primary" onclick={openCreateModal}>
            Create Asset
          </UiButton>
        </div>
      </div>
      <Sorting filter={setFilteredList} />
      <div className="assets-list">
        {!!assetsList &&
          filteredList.map((el) => (
            <AssetItem assetData={el} key={el.content.idData.assetId} />
          ))}
      </div>
      {paginationInfo.hasNext && !!assetsList.length && (
        <UiButton
          styles={{ margin: '64px auto 0' }}
          type="pale"
          onclick={showMore}
        >
          Show more
        </UiButton>
      )}
      <UiModal modalName="createAsset">
        <CreateAssetModal />
      </UiModal>
      <UiModal
        contentStyles={{ padding: 0, height: 'fit-content', marginTop: 250 }}
        modalName="createResult"
      >
        <CreateResultModal confirmCallback={createAsset} />
      </UiModal>
    </div>
  );
};

export default Assets;
