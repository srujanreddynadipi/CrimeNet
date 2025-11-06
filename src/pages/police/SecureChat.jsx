import React, { useState } from 'react';
import { User, Phone, Video, Camera, Mic, FileText, Send } from 'lucide-react';
// import { mockMessages } from './delete/mockData';

const mockMessages = [
  { id: 1, user: 'Officer John', message: 'Case update', time: '2m ago', unread: true },
  { id: 2, user: 'Station Head', message: 'Shift details', time: '1h ago', unread: false },
  { id: 3, user: 'Evidence Team', message: 'Evidence logged', time: '3h ago', unread: false },
];

const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(mockMessages[0]?.user || 'Officer');

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Messages</h3>
        <div className="space-y-2">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedUser(msg.user)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedUser === msg.user ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${selectedUser === msg.user ? 'text-white' : 'text-gray-900'}`}>{msg.user}</span>
                {msg.unread && <span className="w-2 h-2 bg-red-500 rounded-full" />}
              </div>
              <p className={`text-sm truncate ${selectedUser === msg.user ? 'text-gray-200' : 'text-gray-700'}`}>{msg.message}</p>
              <p className={`text-xs mt-1 ${selectedUser === msg.user ? 'text-gray-300' : 'text-gray-500'}`}>{msg.time}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 shadow-xl flex flex-col h-[600px]">
        <div className="p-4 border-b border-indigo-200 bg-white/30 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-900 font-bold">{selectedUser}</p>
              <p className="text-green-600 text-xs flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Online</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
              <Phone className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
              <Video className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white/20 backdrop-blur-sm">
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl rounded-tl-none p-3 max-w-xs">
              <p className="text-gray-900 text-sm">Officer, any update on my theft case?</p>
              <p className="text-gray-500 text-xs mt-1">2 mins ago</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-2xl rounded-tr-none p-3 max-w-xs">
              <p className="text-white text-sm">Yes, we have assigned an investigating officer. You'll receive updates shortly.</p>
              <p className="text-blue-100 text-xs mt-1">1 min ago</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl rounded-tl-none p-3 max-w-xs">
              <p className="text-gray-900 text-sm">Thank you so much! I really appreciate the quick response.</p>
              <p className="text-gray-500 text-xs mt-1">Just now</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-indigo-200 bg-white/30 backdrop-blur-sm">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            <button className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
              <FileText className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;
