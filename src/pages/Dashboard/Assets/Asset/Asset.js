import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as VisibilitySvg } from '../../../../assets/svg/visibility.svg';
import UiButton from '../../../../components/UiButton';
import AssetItem from '../../../../components/AssetItem';
import AssetPageTabs from '../../../../components/AssetPageTabs';
import {
  createEvent,
  fetchAssetsInfo,
} from '../../../../store/modules/assets/actions';
import PageMainContent from '../../../../components/PageMainContent';
import CreateAssetModal from '../../../../components/CreateAssetModal';
import UiModal from '../../../../components/UiModal';
import CreateResultModal from '../../../../components/CreateResultModal';

const Asset = () => {
  const dispatch = useDispatch();
  const { assetId } = useParams();

  const assetsData = useSelector((state) => state.assets.assetsList);
  const assetData = assetsData.find(
    (el) => el.content.idData.assetId === assetId,
  );

  if (!assetData) {
    dispatch(fetchAssetsInfo([assetId]));
    return null;
  }

  return (
    <>
      <div className="asset-page container">
        <img
          className="page-top-img"
          src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
          alt="asset"
        />
        <div className="asset-page__top-info">
          <div className="asset-page__type">
            <VisibilitySvg />
            Public
          </div>
          <UiButton type="pale" styles={{ marginRight: 20 }}>
            Chek on amb.to
          </UiButton>
          <UiButton type="pale">View JSON</UiButton>
        </div>
        <AssetItem isOnAssetPage assetData={assetData} />
        {!!assetData && <PageMainContent data={assetData} />}
      </div>
      <AssetPageTabs assetId={assetId} />
      <UiModal modalName="createEvent">
        <CreateAssetModal isCreateEvent assetId={assetId} />
      </UiModal>
      <UiModal
        contentStyles={{ padding: 0, height: 'fit-content', marginTop: 250 }}
        modalName="createResult"
      >
        <CreateResultModal confirmCallback={createEvent} />
      </UiModal>
    </>
  );
};

export default Asset;
