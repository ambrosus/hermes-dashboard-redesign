import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DashboardTab, AccountsTab, SettingsTab } from '../components/Tabs';
import Sidebar from '../components/Sidebar';
import diagramIcon from '../../../assets/svg/leaderboard.svg';
import accountIcon from '../../../assets/svg/people.svg';
import settingsIcon from '../../../assets/svg/settings.svg';
import { ACCOUNTS_TAB, DASHBOARD_TAB, SETTINGS_TAB } from '../../../config';
import MemberDetailsModal from '../components/Tabs/AccountsTab/components/MemberDetailsModal';

const tabMenu = [
  { tabIdentifier: DASHBOARD_TAB, name: 'Dashboard', icon: diagramIcon },
  { tabIdentifier: ACCOUNTS_TAB, name: 'Accounts', icon: accountIcon },
  { tabIdentifier: SETTINGS_TAB, name: 'Settings', icon: settingsIcon },
];
const Organization = () => {
  const [tab, setTab] = useState(() => <DashboardTab />);
  const modalData = useSelector((state) => state.modal.openedModal.data);

  const viewActiveTab = (tabType) => {
    switch (tabType) {
      case DASHBOARD_TAB:
        return setTab(<DashboardTab />);
      case ACCOUNTS_TAB:
        return setTab(<AccountsTab />);
      case SETTINGS_TAB:
        return setTab(<SettingsTab />);
      default:
        return setTab(<DashboardTab />);
    }
  };

  return (
    <div className="organization-container">
      {modalData && <MemberDetailsModal />}
      <div className="sidebar">
        <Sidebar menuStructure={tabMenu} setActiveTab={viewActiveTab} />
      </div>
      <div className="content">{tab}</div>
      <div className="sidebar" />
    </div>
  );
};
export default Organization;
