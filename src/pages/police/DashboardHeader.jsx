import React, { useState } from 'react';
import { Menu, Shield, Activity, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ officer, onMenuToggle }) => {
  const [notifications, setNotifications] = useState(5);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
      <header className="fixed w-full top-0 z-50 bg-linear-to-r from-indigo-50 via-purple-50 to-blue-50 shadow-md border-b border-indigo-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button onClick={onMenuToggle} className="text-gray-700 lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <Shield className="w-10 h-10 text-indigo-600" strokeWidth={2.5} />
            <div>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">CrimeNet Police</span>
                <span className="text-xs text-indigo-600 font-semibold">Officer Dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-linear-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 border border-green-300 shadow-sm">
                <Activity className="w-5 h-5 text-green-700" />
              <span className="text-green-800 font-semibold">Active</span>
            </div>

            <button className="relative p-2 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full border border-indigo-200 hover:shadow-md transition-all">
              <Bell className="w-6 h-6 text-indigo-700" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>

              <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full px-4 py-2 border border-indigo-200 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-gray-900 font-bold text-sm">{officer.name}</p>
                  <p className="text-indigo-600 text-xs font-semibold">{officer.badge}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-indigo-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg shadow-xl border border-indigo-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-indigo-100">
                    <p className="font-semibold text-gray-900 text-sm">{officer.name}</p>
                    <p className="text-xs text-indigo-600 mt-1 font-semibold">{officer.badge}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left border-t border-indigo-100 mt-1"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
