import React, { useState } from 'react';
import cx from 'classnames';
import UiButton from '../UiButton';
import { ReactComponent as AddPackageSvg } from '../../assets/svg/add-icon.svg';
import { ReactComponent as DeletePackageSvg } from '../../assets/svg/delete.svg';

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
          <div
            onClick={() => handlePackageSelect(el)}
            role="presentation"
            className={cx(
              'package-tab-item',
              selectedPackages[el] && 'package-tab-item--selected',
            )}
          >
            <button type="button" className="package-tab-item__action-btn">
              {selectedPackages[el] ? <DeletePackageSvg /> : <AddPackageSvg />}
            </button>
            <div className="package-tab-item__img" />
            <p className="package-tab-item__title">
              A#12 Ready-to-eat meals and rations meals
            </p>
            <p className="package-tab-item__date">12 Aug 2021</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageTab;
