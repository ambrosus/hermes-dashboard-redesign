import React, { useState } from 'react';
import { DashboardTab, AccountsTab } from '../components/Tabs';
import Sidebar from '../components/Sidebar';
import { ACCOUNTS_TAB, DASHBOARD_TAB } from '../../../config';
import diagramIcon from '../../../assets/svg/leaderboard.svg';
import accountIcon from '../../../assets/svg/people.svg';

const tabMenu = [
  { tabIdentifier: DASHBOARD_TAB, name: 'Dashboard', icon: diagramIcon },
  { tabIdentifier: ACCOUNTS_TAB, name: 'Accounts', icon: accountIcon },
];

const Node = () => {
  const [tab, setTab] = useState(() => <DashboardTab />);

  const viewActiveTab = (tabType) => {
    switch (tabType) {
      case DASHBOARD_TAB:
        return setTab(<DashboardTab />);
      case ACCOUNTS_TAB:
        return setTab(<AccountsTab />);
      default:
        return setTab(<DashboardTab />);
    }
  };

  return (
    <div className="organization-container">
      <div className="sidebar">
        <Sidebar menuStructure={tabMenu} setActiveTab={viewActiveTab} />
      </div>
      <div className="content">{tab}</div>
      <div className="sidebar" />
    </div>
  );
};
export default Node;
