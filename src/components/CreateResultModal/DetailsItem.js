import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CheckedIcon } from '../../assets/svg/checkbox-green.svg';
import { ReactComponent as ErrorIcon } from '../../assets/svg/error.svg';
import { ReactComponent as ChevronIcon } from '../../assets/svg/chevron-simple.svg';

const DetailsItem = ({ itemData }) => {
  const [isJsonVisible, setIsJsonVisible] = useState(false);

  const handleJsonVisibility = () => setIsJsonVisible(!isJsonVisible);

  return (
    <div className="create-result-modal__detail-item-wrapper">
      <div className="create-result-modal__detail-item">
        {itemData.isSuccess ? <CheckedIcon /> : <ErrorIcon />}
        <span>{itemData.fetchTime}</span>
        <button type="button" onClick={handleJsonVisibility}>
          <ChevronIcon />
        </button>
      </div>
      {isJsonVisible && (
        <pre className="create-result-modal__detail-json">
          {JSON.stringify(itemData.data, null, 4)}
        </pre>
      )}
    </div>
  );
};

DetailsItem.propTypes = {
  itemData: PropTypes.object,
};

export default DetailsItem;
