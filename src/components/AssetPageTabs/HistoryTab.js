import React from 'react';

const HistoryTab = () => (
  <div className="history-tab">
    <div className="asset-tab-title-wrapper asset-tab-title-wrapper--small-offset">
      <p className="asset-tab-title">History package</p>
    </div>
    <button type="button" className="asset-tab-select-btn">
      Packed
    </button>
    <button type="button" className="asset-tab-select-btn">
      Unpacked
    </button>
    <div>
      <div className="history-tab-item">
        <div className="history-tab-item__img" />
        <span className="history-tab-item__date">12 Aug 2021</span>
        <span className="history-tab-item__type">Packed</span>
        <span className="history-tab-item__title">
          A#12 Ready-to-eat meals and rations meals
        </span>
      </div>
    </div>
  </div>
);

export default HistoryTab;
