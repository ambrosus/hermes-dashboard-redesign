import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DashboardTab, AccountsTab } from '../components/Tabs';
import Sidebar from '../components/Sidebar';
import { ACCOUNTS_TAB, DASHBOARD_TAB } from '../../../config';
import diagramIcon from '../../../assets/svg/leaderboard.svg';
import organizationIcon from '../../../assets/svg/organization-icon.svg';
import MemberDetailsModal from '../components/Tabs/AccountsTab/components/MemberDetailsModal';

const tabMenu = [
  { tabIdentifier: DASHBOARD_TAB, name: 'Dashboard', icon: diagramIcon },
  {
    tabIdentifier: ACCOUNTS_TAB,
    name: 'Organizations',
    icon: organizationIcon,
  },
];

const Node = () => {
  const [tab, setTab] = useState(() => <DashboardTab />);
  const modalData = useSelector((state) => state.modal.openedModal.data);

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
      {modalData && <MemberDetailsModal />}
      <div className="sidebar">
        <Sidebar menuStructure={tabMenu} setActiveTab={viewActiveTab} />
      </div>
      <div className="content">{tab}</div>
    </div>
  );
};
export default Node;
