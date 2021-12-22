import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets } from '../../../store/modules/assets/actions';
import CreateAssetModal from '../../../components/CreateAssetModal';
import AssetItem from '../../../components/AssetItem';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';
import Sorting from '../../../components/Sorting';
import UiModal from '../../../components/UiModal';
import BulkEvent from '../../../components/BulkEvent';
import InfiniteScroll from '../../../components/InfiniteScroll';
import { isEmptyObj } from '../../../utils/isEmptyObj';

const Assets = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedAssets, setSelectedAssets] = useState([]);
  const { assetsList, assetsQueryData, isAssetsLoading } = useSelector(
    (state) => state.assets,
  );

  const paginationInfo = useSelector(
    (state) => state.assets.assetsQueryData.pagination,
  );

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!assetsQueryData.data.length && !isEmptyObj(userInfo)) {
      dispatch(fetchAssets());
    }
  }, [userInfo]);

  const openCreateModal = () => dispatch(handleModal({ name: 'createAsset' }));
  const showMore = () => {
    if (paginationInfo.hasNext && !isAssetsLoading) {
      dispatch(fetchAssets(paginationInfo.next));
    }
  };

  const openPackagingHandler = () => history.push('/dashboard/package');

  const handleSelectAsset = (assetId, select) => {
    if (select) {
      setSelectedAssets([...selectedAssets, assetId]);
    } else {
      setSelectedAssets(selectedAssets.filter((el) => el !== assetId));
    }
  };

  const selectAll = () => {
    setSelectedAssets(assetsList.map((el) => el.content.idData.assetId));
  };

  const unselectAll = () => {
    setSelectedAssets([]);
  };

  const cancelSelected = () => setSelectedAssets([]);

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
      <Sorting selectAll={selectAll} unselectAll={unselectAll} />
      <div className="assets-list">
        <InfiniteScroll handleObserver={showMore}>
          {assetsList.map((el) => (
            <AssetItem
              handleSelect={handleSelectAsset}
              selected={selectedAssets.includes(el.content.idData.assetId)}
              assetData={el}
              key={el.content.idData.assetId}
            />
          ))}
        </InfiniteScroll>
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
        <CreateAssetModal modalType="createAsset" />
      </UiModal>
      <UiModal modalName="bulkEvent">
        <CreateAssetModal
          modalType="bulkEvent"
          bulkEventData={
            selectedAssets.length ? { assetsIds: selectedAssets } : {}
          }
        />
      </UiModal>
      {!!selectedAssets.length && (
        <BulkEvent assetsIds={selectedAssets} cancelSelected={cancelSelected} />
      )}
    </div>
  );
};

export default Assets;
