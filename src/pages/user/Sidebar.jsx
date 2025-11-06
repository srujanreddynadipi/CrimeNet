import React from 'react';
import { Home, AlertCircle, FileText, MapPinned, MessageSquare, Users, Bell, Search, HelpCircle, Settings, Phone, Zap, User, Eye, EyeOff, AlertTriangle, BarChart3, Star } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle, highlight: true },
    { id: 'report', label: 'Report Crime', icon: AlertCircle },
    { id: 'cases', label: 'My Cases', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback & Ratings', icon: Star },
    { id: 'tips', label: 'Anonymous Tips', icon: EyeOff },
    { id: 'track-tip', label: 'Track Tip', icon: Eye },
    { id: 'track', label: 'Track Case', icon: MapPinned },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'community', label: 'Community Watch', icon: Users },
    { id: 'alerts', label: 'Safety Alerts', icon: Bell },
    { id: 'missing', label: 'Missing Persons', icon: Search },
    { id: 'resources', label: 'Help & Resources', icon: HelpCircle },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white via-blue-50 to-purple-50 shadow-xl z-40 transform transition-transform duration-300 border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } pt-20`}>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                item.highlight 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg animate-pulse'
                  : activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-200 to-purple-300 text-gray-900 shadow'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Emergency card removed per request */}
      </aside>
    </>
  );
};

export default Sidebar;
