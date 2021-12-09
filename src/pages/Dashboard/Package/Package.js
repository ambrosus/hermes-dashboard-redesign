import React, { useState } from 'react';
import PackageListItem from '../../../components/PackageListItem';
import { PackagingHeader } from './components';
import Sorting from '../../../components/Sorting';

const Assets = () => {
  const [selectedPackages, setSelectedPackages] = useState({});
  const [filteredList, setFilteredList] = useState([]);

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
              key={el}
              onclick={() => handlePackageSelect(index)}
              selected={selectedPackages[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assets;
