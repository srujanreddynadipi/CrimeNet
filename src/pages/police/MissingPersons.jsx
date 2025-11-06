import React from 'react';
import { Search, User, Calendar, MapPin } from 'lucide-react';

const MissingPersons = () => {
  const records = [
    { id: 'MP-001', name: 'Rahul Sharma', age: 17, lastSeen: '2025-11-01', location: 'Indiranagar' },
    { id: 'MP-002', name: 'Aisha Khan', age: 22, lastSeen: '2025-10-28', location: 'Koramangala' },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="w-6 h-6 text-amber-600" /> Missing Persons
        </h3>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Search by name or ID" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-amber-200">
              <th className="text-left text-gray-700 font-semibold py-3 px-4">ID</th>
              <th className="text-left text-gray-700 font-semibold py-3 px-4">Name</th>
              <th className="text-left text-gray-700 font-semibold py-3 px-4">Age</th>
              <th className="text-left text-gray-700 font-semibold py-3 px-4">Last Seen</th>
              <th className="text-left text-gray-700 font-semibold py-3 px-4">Location</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} className="border-b border-amber-100 hover:bg-white/70 transition-all">
                <td className="py-3 px-4 text-gray-900 font-semibold">{r.id}</td>
                <td className="py-3 px-4 text-gray-800 flex items-center gap-2"><User className="w-4 h-4 text-indigo-600" /> {r.name}</td>
                <td className="py-3 px-4 text-gray-700">{r.age}</td>
                <td className="py-3 px-4 text-gray-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {r.lastSeen}</td>
                <td className="py-3 px-4 text-gray-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600" /> {r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissingPersons;
