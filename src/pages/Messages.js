import React from 'react';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h1>
      <p className="text-gray-600 mb-8">Send and receive communications between licensees and admins.</p>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Message Center</h3>
          <p className="mt-1 text-sm text-gray-500">
            Communication interface for licensee and admin correspondence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
