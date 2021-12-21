import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PackageListItem from '../../../components/PackageListItem';
import { PackagingHeader } from './components';
import Sorting from '../../../components/Sorting';
import UiButton from '../../../components/UiButton';
import { bulkEvents, fetchAssets } from '../../../store/modules/assets/actions';
import InfiniteScroll from '../../../components/InfiniteScroll';

const Assets = () => {
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackages] = useState({});
  const [formData, setFormData] = useState({ assetId: '', eventName: '' });

  const { assetsQueryData, assetsList, isAssetsLoading } = useSelector(
    (state) => state.assets,
  );

  const paginationInfo = useSelector(
    (state) => state.assets.assetsQueryData.pagination,
  );

  useEffect(() => {
    if (!assetsQueryData.data.length) {
      dispatch(fetchAssets());
    }
  }, []);

  const handleSetFormData = (keyValue) =>
    setFormData({ ...formData, ...keyValue });

  const handlePackageSelect = (id) => {
    const clone = { ...selectedPackages };

    if (clone[id]) {
      delete clone[id];
    } else {
      clone[id] = true;
    }
    setSelectedPackages(clone);
  };

  const showMore = () => {
    if (paginationInfo.hasNext && !isAssetsLoading) {
      dispatch(fetchAssets(paginationInfo.next));
    }
  };

  const createPackage = () => {
    const packageData = {
      name: formData.eventName,
      propertiesItems: { 0: { name: 'target', description: formData.assetId } },
      customType: 'ambrosus.event.pack',
    };

    dispatch(bulkEvents(Object.keys(selectedPackages), packageData));
  };

  return (
    <div className="packaging">
      <div className="dashboard-container">
        <PackagingHeader
          handleFormData={handleSetFormData}
          formData={formData}
        />
        <div className="space-25" />
        <h1 className="packaging-title">What to pack</h1>
        <div className="space-25" />
        <Sorting />
        <div className="assets-list">
          <InfiniteScroll handleObserver={showMore}>
            {assetsList.map((el) => (
              <PackageListItem
                assetData={el}
                key={el.eventId}
                onclick={() => handlePackageSelect(el.content.idData.assetId)}
                selected={selectedPackages[el.content.idData.assetId]}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {Object.keys(selectedPackages).length > 0 && (
        <div className="bottom-fixed-pad">
          <UiButton
            styles={{ width: 200, height: 48 }}
            onclick={createPackage}
            type="primary"
          >
            Packaging selected
          </UiButton>
        </div>
      )}
    </div>
  );
};

export default Assets;
