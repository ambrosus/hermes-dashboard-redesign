import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PackageListItem from '../../../components/PackageListItem';
import { PackagingHeader } from './components';
import Sorting from '../../../components/Sorting';
import UiButton from '../../../components/UiButton';
import { fetchAssets } from '../../../store/modules/assets/actions';

const Assets = () => {
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackages] = useState({});
  const [filteredList, setFilteredList] = useState([]);

  const { assetsQueryData } = useSelector((state) => state.assets);

  useEffect(() => {
    if (!assetsQueryData.data.length) {
      dispatch(fetchAssets());
    }
  }, []);

  const handlePackageSelect = (id) => {
    const clone = { ...selectedPackages };

    if (clone[id]) {
      delete clone[id];
    } else {
      clone[id] = true;
    }
    setSelectedPackages(clone);
  };

  return (
    <div className="packaging">
      <div className="dashboard-container">
        <PackagingHeader />
        <div className="space-25" />
        <h1 className="packaging-title">What to pack</h1>
        <div className="space-25" />
        <Sorting filter={setFilteredList} />
        <div className="assets-list">
          {filteredList.map((el, index) => (
            <PackageListItem
              key={el.eventId}
              onclick={() => handlePackageSelect(index)}
              selected={selectedPackages[index]}
            />
          ))}
        </div>
      </div>
      {Object.keys(selectedPackages).length > 0 && (
        <div className="bottom-fixed-pad">
          <UiButton styles={{ width: 200, height: 48 }} type="primary">
            Packaging selected
          </UiButton>
        </div>
      )}
    </div>
  );
};

export default Assets;
