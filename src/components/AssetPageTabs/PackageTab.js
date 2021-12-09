import React, { useState } from 'react';
import UiButton from '../UiButton';
import PackageListItem from '../PackageListItem';

const test = [1, 2, 3, 4];

const PackageTab = () => {
  const [selectedPackages, setSelectedPackages] = useState({});

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
    <div className="package-tab">
      <div className="asset-tab-title-wrapper asset-tab-title-wrapper--small-offset">
        <p className="asset-tab-title">Assets in this pack</p>
        <UiButton styles={{ width: 200, background: '#9198BB' }}>
          Unpack
        </UiButton>
      </div>
      <button type="button" className="asset-tab-select-btn">
        Select all
      </button>
      <button type="button" className="asset-tab-select-btn">
        Unselect all
      </button>
      <div className="package-tab__list">
        {test.map((el) => (
          <PackageListItem
            key={el}
            onclick={() => handlePackageSelect(el)}
            selected={selectedPackages[el]}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageTab;
