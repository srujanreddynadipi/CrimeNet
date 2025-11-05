import React from 'react';
import QuickStatsAPI from './QuickStatsAPI';
import MyCasesAPI from './MyCasesAPI';
import SafetyTips from './SafetyTips';
import ReportCrimeAPI from './ReportCrimeAPI';
import ChatModuleAPI from './ChatModuleAPI';
import MissingPersonsAPI from './MissingPersonsAPI';
import SafetyAlertsAPI from './SafetyAlertsAPI';
import UserProfile from './UserProfile';
import AnonymousTips from './AnonymousTips';
import TrackTip from './TrackTip';
import NotificationsCenter from './NotificationsCenter';
import SOSAlert from './SOSAlert';
import AnalyticsDashboard from './AnalyticsDashboard';
import FeedbackSystem from './FeedbackSystem';

const Dashboard = ({ activeTab, setActiveTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <QuickStatsAPI />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MyCasesAPI />
              </div>
              <div>
                <SafetyTips />
              </div>
            </div>
          </>
        );
      case 'report':
        return <ReportCrimeAPI />;
      case 'cases':
        return <MyCasesAPI />;
      case 'chat':
        return <ChatModuleAPI />;
      case 'missing':
        return <MissingPersonsAPI />;
      case 'alerts':
        return <SafetyAlertsAPI />;
      case 'resources':
        return <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"><p className="text-gray-900">Help Resources - Coming Soon</p></div>;
      case 'tips':
        return <AnonymousTips />;
      case 'track-tip':
        return <TrackTip />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'sos':
        return <SOSAlert />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'feedback':
        return <FeedbackSystem />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <UserProfile />;
      default:
        return <QuickStatsAPI />;
    }
  };

  return <div className="flex-1 p-4 md:p-8">{renderContent()}</div>;
};

export default Dashboard;
