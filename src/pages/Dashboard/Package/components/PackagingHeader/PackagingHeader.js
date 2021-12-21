import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import UiToggle from '../../../../../components/UiToggle';
import visibilityIcon from '../../../../../assets/svg/visibility.svg';
import visibilityOffIcon from '../../../../../assets/svg/visibility_off.svg';
import borderOuter from '../../../../../assets/svg/border_outer.svg';
import UiInput from '../../../../../components/UiInput';

const privateToggleOptions = [
  {
    value: 1,
    label: (
      <span>
        <img src={visibilityIcon} alt="public-img" />
        Public
      </span>
    ),
  },
  {
    value: 2,
    label: (
      <span>
        <img src={visibilityOffIcon} alt="private-img" />
        Public
      </span>
    ),
  },
];
const PackagingHeader = ({ handleFormData, formData }) => (
  <div className="packaging-header">
    <div className="packaging-header__privacy">
      <div className="primary">
        <ReactSVG src={borderOuter} wrapper="span" />
        Asset packing
      </div>
      <div>
        <UiToggle options={privateToggleOptions} />
      </div>
    </div>
    <UiInput
      className="packaging-header__privacy--input"
      placeholder="Asset name / ID"
      name="assetId"
      value={formData.assetId}
      onChange={handleFormData}
    />
    <UiInput
      className="packaging-header__privacy--input"
      placeholder="Event name"
      name="eventName"
      value={formData.eventName}
      onChange={handleFormData}
    />
    <p className="packaging-header__description">
      By clicking on the account icon in the top right corner, you can navigate
      to “Settings” to revew or update your personal details. By clicking on the
      account icon in the top right corner, you can navigate to “Settings” to
      revew or update your personal details.
    </p>
  </div>
);

PackagingHeader.propTypes = {
  handleFormData: PropTypes.func,
  formData: PropTypes.object,
};

export default PackagingHeader;
