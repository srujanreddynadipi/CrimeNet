import React from 'react';
import { Users, Shield, AlertTriangle } from 'lucide-react';

const CommunityWatch = () => {
  const items = [
    { id: 1, title: 'Neighborhood Patrol', desc: 'Volunteer patrol scheduled for Sector 7', status: 'Scheduled' },
    { id: 2, title: 'Suspicious Activity', desc: 'Reported loitering near Central Park', status: 'Reviewing' },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" /> Community Watch
        </h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium">New Initiative</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white/60 backdrop-blur-sm border border-green-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">{item.status}</span>
            </div>
            <p className="text-gray-700 mt-2">{item.desc}</p>
          </div>
        ))}
        <div className="bg-white/40 backdrop-blur-sm border border-dashed border-green-300 rounded-xl p-6 text-center hover:bg-white/60 transition-all">
          <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-gray-700">Connect citizens and officers to share updates and alerts.</p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
        <p className="text-amber-800 text-sm">This is a basic placeholder. Hook this to your backend when ready.</p>
      </div>
    </div>
  );
};

export default CommunityWatch;
