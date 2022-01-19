import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PackageListItem from '../../../components/PackageListItem';
import { PackagingHeader } from './components';
import Sorting from '../../../components/Sorting';
import UiButton from '../../../components/UiButton';
import { bulkEvents, fetchAssets } from '../../../store/modules/assets/actions';
import InfiniteScroll from '../../../components/InfiniteScroll';
import { handleModal } from '../../../store/modules/modal';
import { isEmptyObj } from '../../../utils/isEmptyObj';

const Assets = () => {
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [formData, setFormData] = useState({
    assetId: '',
    eventName: '',
    accessLevel: 0,
  });
  const [errorFields, setErrorFields] = useState({
    assetName: false,
    eventName: false,
  });
  const { userInfo } = useSelector((state) => state.auth);

  const { assetsQueryData, assetsList, isAssetsLoading } = useSelector(
    (state) => state.assets,
  );

  const paginationInfo = useSelector(
    (state) => state.assets.assetsQueryData.pagination,
  );

  useEffect(() => {
    if (!assetsQueryData.data.length && !isEmptyObj(userInfo)) {
      dispatch(fetchAssets());
    }
  }, [userInfo]);

  const handleSetFormData = (keyValue) => {
    setFormData({ ...formData, ...keyValue });
    setErrorFields({
      assetName: false,
      eventName: false,
    });
  };
  const handlePackageSelect = (assetId) => {
    const select = !selectedPackages.includes(assetId);

    if (select) {
      setSelectedPackages([...selectedPackages, assetId]);
    } else {
      setSelectedPackages(selectedPackages.filter((el) => el !== assetId));
    }
  };

  const selectAll = () => {
    setSelectedPackages(assetsList.map((el) => el.content.idData.assetId));
  };

  const unselectAll = () => {
    setSelectedPackages([]);
  };

  const showMore = () => {
    if (paginationInfo.hasNext && !isAssetsLoading) {
      dispatch(fetchAssets(paginationInfo.next));
    }
  };

  const createPackage = () => {
    const { eventName, assetId, accessLevel } = formData;

    setErrorFields({ assetName: !assetId, eventName: !eventName });

    if (assetId && eventName) {
      const packageData = {
        name: eventName,
        propertiesItems: { 0: { name: 'target', description: assetId } },
        customType: 'ambrosus.event.pack',
        accessLevel,
      };
      dispatch(
        handleModal({
          name: 'createResult',
          data: () => bulkEvents(selectedPackages, packageData),
        }),
      );

      unselectAll();
      setFormData({
        assetId: '',
        eventName: '',
        accessLevel: 0,
      });
    }
  };

  return (
    <div className="packaging">
      <div className="dashboard-container">
        <PackagingHeader
          handleFormData={handleSetFormData}
          formData={formData}
          errorFields={errorFields}
        />
        <div className="space-25" />
        <h1 className="packaging-title">What to pack</h1>
        <div className="space-25" />
        <Sorting selectAll={selectAll} unselectAll={unselectAll} />
        <div className="assets-list">
          <InfiniteScroll handleObserver={showMore}>
            {assetsList.map((el) => (
              <PackageListItem
                assetData={el}
                key={el.eventId}
                onclick={() => handlePackageSelect(el.content.idData.assetId)}
                selected={selectedPackages.includes(el.content.idData.assetId)}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {Object.keys(selectedPackages).length > 0 && (
        <div className="bottom-fixed-pad">
          <UiButton
            styles={{ height: 48, width: 'fit-content' }}
            onclick={createPackage}
            type="primary"
          >
            Add selected items to the pack
          </UiButton>
        </div>
      )}
    </div>
  );
};

export default Assets;
