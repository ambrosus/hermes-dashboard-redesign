import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as DeletePackageSvg } from '../../assets/svg/delete.svg';
import { ReactComponent as AddPackageSvg } from '../../assets/svg/add-icon.svg';

const PackageListItem = ({ onclick, selected }) => (
  <div
    onClick={onclick}
    role="presentation"
    className={cx('package-tab-item', selected && 'package-tab-item--selected')}
  >
    <button type="button" className="package-tab-item__action-btn">
      {selected ? <DeletePackageSvg /> : <AddPackageSvg />}
    </button>
    <div className="package-tab-item__img" />
    <p className="package-tab-item__title">
      A#12 Ready-to-eat meals and rations meals
    </p>
    <p className="package-tab-item__date">12 Aug 2021</p>
  </div>
);

PackageListItem.propTypes = {
  onclick: PropTypes.func,
  selected: PropTypes.bool,
};
export default PackageListItem;
