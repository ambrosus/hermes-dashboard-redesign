import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { ReactComponent as VisibilitySvg } from '../../../../assets/svg/visibility.svg';
import { ReactComponent as VisibilityOffSvg } from '../../../../assets/svg/visibility_off.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/svg/arrow-left.svg';
import UiButton from '../../../../components/UiButton';
import AssetItem from '../../../../components/AssetItem';
import AssetPageTabs from '../../../../components/AssetPageTabs';
import {
  fetchAssetsInfo,
  fetchEventsInfo,
  setAssetPageInfo,
} from '../../../../store/modules/assets/actions';
import PageMainContent from '../../../../components/PageMainContent';
import CreateAssetModal from '../../../../components/CreateAssetModal';
import UiModal from '../../../../components/UiModal';
import useHover from '../../../../hooks/useHover';
import { handleModal } from '../../../../store/modules/modal';
import assetInfoTransform from '../../../../utils/assetInfoTransform';

const Asset = () => {
  const dispatch = useDispatch();
  const { assetId } = useParams();
  const [qrCodeHover, isQrCodeHover] = useHover();
  const [viewJson, setViewJson] = useState(false);

  const { assetPageInfo, assetsList } = useSelector((state) => state.assets);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEventsInfo(assetId));
    dispatch(fetchAssetsInfo([assetId], true));

    return () => dispatch(setAssetPageInfo(null));
  }, []);

  const assetDataFromList = assetsList.find(
    (el) => el.content.idData.assetId === assetId,
  );

  const assetData = assetPageInfo || assetDataFromList;

  if (!assetData) {
    return null;
  }

  const assetLink = `https://test.amb.to/${assetId}`;

  const assetInfo = assetData.content.data.find(
    (el) => el.type === 'ambrosus.asset.info',
  );

  const handleEditButton = () => {
    dispatch(
      handleModal({ name: 'editAsset', data: assetInfoTransform(assetData) }),
    );
  };

  return (
    <div className="asset-page-wrapper">
      <Link to="/dashboard/assets" className="back-arrow-btn">
        <ArrowLeftIcon />
      </Link>
      <div className="asset-page container">
        {assetInfo.images && assetInfo.images.default && (
          <img
            className="page-top-img"
            src={assetInfo.images.default.url}
            alt="asset"
          />
        )}
        <div className="asset-page__top-info">
          <div className="asset-page__type">
            {assetData.content.idData.accessLevel === 1 ? (
              <>
                <VisibilityOffSvg />
                Private
              </>
            ) : (
              <>
                <VisibilitySvg />
                Public
              </>
            )}
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
              type="secondary"
              styles={{ marginRight: 20, width: 160, height: 48 }}
              onclick={() => window.open(assetLink, '_blank')}
            >
              Check on amb.to
            </UiButton>
          </div>

          <UiButton
            onclick={() => setViewJson(!viewJson)}
            type="secondary"
            styles={{ marginRight: 20, width: 160, height: 48 }}
          >
            View JSON
          </UiButton>
          {userInfo.permissions &&
            userInfo.permissions.includes('create_event') && (
              <UiButton
                type="secondary"
                styles={{ marginRight: 20, width: 160, height: 48 }}
                onclick={handleEditButton}
              >
                Edit
              </UiButton>
            )}
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

        {!!assetData && (
          <PageMainContent data={assetData} filesLoading={!assetPageInfo} />
        )}
      </div>
      <AssetPageTabs assetId={assetId} />
      <UiModal isFullWindow modalName="createEvent">
        <CreateAssetModal
          isCreateEvent
          modalType="createEvent"
          assetId={assetId}
        />
      </UiModal>
      <UiModal isFullWindow modalName="editAsset">
        <CreateAssetModal />
      </UiModal>
    </div>
  );
};

export default Asset;
