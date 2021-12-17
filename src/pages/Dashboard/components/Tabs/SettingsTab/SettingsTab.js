import React from 'react';
import { ReactSVG } from 'react-svg';

import UiInput from '../../../../../components/UiInput';
import UiSelect from '../../../../../components/UiSelect';
import lockIcon from '../../../../../assets/svg/lock.svg';
import personIcon from '../../../../../assets/svg/person.svg';

const SettingsTab = () => (
  <div className="settings-tab">
    <div className="organization-container__heading">My account settings</div>
    <div className="settings-tab__secondary">
      <ReactSVG src={personIcon} /> Account random name{' '}
    </div>
    <div className="space-25" />
    <div className="settings-tab__switch">
      <div className="buttons">
        <button type="button" className="active">
          <p>Active</p>
        </button>
        <button type="button" className="disable">
          <p>Disable</p>
        </button>
      </div>
      <div className="timestamp">Created 11 Aug 2021</div>
    </div>
    <div className="space-25" />
    <form className="create-asset-form">
      <UiInput
        imgSrc={lockIcon}
        label="Owner"
        placeholder="0x9B8c4E354aE59699246864aCbe1e4963C5d9A26B"
      />
      <UiInput label="Title" placeholder="Account random name " />
      <UiInput label="Legal address" placeholder="Account random name " />
      <div className="bottom-label">
        <UiSelect
          options={[
            { value: 1, label: 'Box' },
            { value: 2, label: 'Pallet' },
            { value: 3, label: 'Container' },
          ]}
          placeholder="Asset type"
          label="Time zone"
        />
        <div className="save-account" type="submit">
          <p>Save</p>
        </div>
      </div>
    </form>
  </div>
);

export default SettingsTab;
