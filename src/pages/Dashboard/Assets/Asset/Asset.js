import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
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
import useHover from '../../../../hooks/useHover';

const Asset = () => {
  const dispatch = useDispatch();
  const { assetId } = useParams();
  const [qrCodeHover, isQrCodeHover] = useHover();
  const [viewJson, setViewJson] = useState(false);
  const assetsData = useSelector((state) => state.assets.assetsList);
  const assetData = assetsData.find(
    (el) => el.content.idData.assetId === assetId,
  );
  const assetLink = `https://test.amb.to/${assetId}`;
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
          <div ref={qrCodeHover} className="qr-code-container">
            {isQrCodeHover && (
              <div className="qr-code-container__qr-code">
                <QRCode
                  id="qr-gen"
                  value={assetLink}
                  size={160}
                  level="H"
                  includeMargin
                />
              </div>
            )}
            <UiButton
              type="pale"
              styles={{ marginRight: 20 }}
              onclick={() => window.open(assetLink, '_blank')}
            >
              Chek on amb.to
            </UiButton>
          </div>

          <UiButton onclick={() => setViewJson(!viewJson)} type="pale">
            View JSON
          </UiButton>
        </div>
        <div className="space-25" />
        {viewJson ? (
          <pre
            className="asset__detail-json"
            style={{ borderBottom: '1px solid #BFC9E0', paddingBottom: 10 }}
          >
            {JSON.stringify(assetData, null, 4)}
          </pre>
        ) : (
          <AssetItem isOnAssetPage assetData={assetData} />
        )}

        {!!assetData && <PageMainContent data={assetData} />}
      </div>
      <AssetPageTabs assetId={assetId} />
      <UiModal modalName="createEvent">
        <CreateAssetModal isCreateEvent />
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
