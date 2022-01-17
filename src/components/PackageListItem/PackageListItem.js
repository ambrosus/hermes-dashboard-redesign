import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ReactComponent as DeletePackageSvg } from '../../assets/svg/delete.svg';
import { ReactComponent as AddPackageSvg } from '../../assets/svg/add-icon.svg';
import boxImage from '../../assets/svg/delivery-box.svg';
import palleteImage from '../../assets/svg/pallet.svg';
import containerImage from '../../assets/svg/container.svg';
import assetPlaceholderImage from '../../assets/raster/aset-image-placeholder.png';

const PackageListItem = ({ onclick, selected, assetData }) => {
  const info = assetData.content.data.find(
    (el) => el.type === 'ambrosus.asset.info',
  );

  let img;

  if (info.images?.default?.url) {
    img = info.images.default.url;
  } else if (info.assetType === 'box') {
    img = boxImage;
  } else if (info.assetType === 'pallet') {
    img = palleteImage;
  } else if (info.assetType === 'container') {
    img = containerImage;
  } else {
    img = assetPlaceholderImage;
  }

  const date = moment
    .unix(assetData.content.idData.timestamp)
    .format('DD MMM YYYY');

  return (
    <div
      onClick={onclick}
      role="presentation"
      className={cx(
        'package-tab-item',
        selected && 'package-tab-item--selected',
      )}
    >
      <button type="button" className="package-tab-item__action-btn">
        {selected ? <DeletePackageSvg /> : <AddPackageSvg />}
      </button>
      <div
        className={cx(
          'package-tab-item__img',
          ['box', 'pallet', 'container'].includes(info.assetType) &&
            'package-tab-item__img--svg',
        )}
      >
        <img src={img} alt="asset" />
      </div>
      <p className="package-tab-item__title">{info.name.toString()}</p>
      <p className="package-tab-item__date">{date}</p>
    </div>
  );
};

PackageListItem.propTypes = {
  onclick: PropTypes.func,
  selected: PropTypes.bool,
  assetData: PropTypes.object,
};
export default PackageListItem;
