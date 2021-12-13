import React from 'react';
import UiButton from '../../../../components/UiButton';
import { debugLog } from '../../../../utils/debugLog';

const Event = () => {
  debugLog(1);
  return (
    <div className="event-page">
      <div className="container">
        <img
          className="page-top-img"
          src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
          alt="asset"
        />
        <UiButton className="event-page__similar-event">
          Add similar event
        </UiButton>
        <UiButton className="event-page__back">Back to asset</UiButton>
      </div>
    </div>
  );
};

export default Event;
