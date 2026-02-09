import React, { useState } from 'react';
import { Plus, Mic, Send } from 'lucide-react';

const Home = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      console.log('Message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-semibold">ChatGPT</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="border-t border-gray-700 p-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        {/* Header */}
        <div className="absolute top-0 right-0 p-4 flex items-center gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Get Plus
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
          <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
        </div>

        {/* Center Content */}
        <div className="w-full max-w-3xl px-4">
          <h1 className="text-4xl font-normal text-gray-800 text-center mb-8">
            What's on the agenda today?
          </h1>

          {/* Input Box */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <Plus className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
              
              <button type="button" className="text-gray-500 hover:text-gray-700">
                <Mic className="w-5 h-5" />
              </button>
              
              <button 
                type="submit"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <Send className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
