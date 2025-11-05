import React from 'react';
import StatsCards from './StatsCards';
import ActiveCasesTable from './ActiveCasesTable';
import LiveCrimeMap from './LiveCrimeMap';
import SecureChat from './SecureChat';
// import MissingPersons from './MissingPersons';
// import CommunityWatch from './CommunityWatch';
// import ReportsModule from './ReportsModule';
import SOSMonitoring from './SOSMonitoring';
import CaseAssignment from './CaseAssignment';
import ReportManagementAPI from './ReportManagementAPI';
import EvidenceVaultAPI from './EvidenceVaultAPI';
import AnalyticsDashboardAPI from './AnalyticsDashboardAPI';

const Dashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <StatsCards />
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ActiveCasesTable />
              <LiveCrimeMap />
            </div>
            <AnalyticsDashboardAPI />
          </>
        );
      case 'sos':
        return <SOSMonitoring />;
      case 'assignment':
        return <CaseAssignment />;
      case 'report-management':
        return <ReportManagementAPI />;
      case 'cases':
        return <ActiveCasesTable />;
      case 'map':
        return <LiveCrimeMap />;
      case 'messages':
        return <SecureChat />;
      case 'analytics':
        return <AnalyticsDashboardAPI />;
      case 'community':
        return <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"><p className="text-gray-900">Community Watch - Coming Soon</p></div>;
      case 'missing':
        return <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"><p className="text-gray-900">Missing Persons - Coming Soon</p></div>;
      case 'evidence':
        return <EvidenceVaultAPI />;
      case 'reports':
        return <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"><p className="text-gray-900">Reports Module - Coming Soon</p></div>;
      default:
        return <StatsCards />;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
