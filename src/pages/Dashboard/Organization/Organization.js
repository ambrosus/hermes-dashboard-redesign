import React, { useState } from 'react';
import { DashboardTab, AccountsTab, SettingsTab } from './components/Tabs';
import Sidebar from './components/Sidebar';
import { ACCOUNTS_TAB, DASHBOARD_TAB, SETTINGS_TAB } from '../../../config';

const Organization = () => {
  const [tab, setTab] = useState(() => <SettingsTab />);

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
      <div className="sidebar">
        <Sidebar setActiveTab={viewActiveTab} />
      </div>
      <div className="content">{tab}</div>
      <div className="sidebar" />
    </div>
  );
};
export default Organization;
