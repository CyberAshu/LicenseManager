import React from 'react';
import { Activity } from 'lucide-react';

const ActivityLog = () => {
  const activities = [
    {
      id: 1,
      action: 'License Updated',
      user: 'John Smith',
      target: 'KBXYZ123',
      timestamp: '2024-12-20 14:30:00',
      type: 'license'
    },
    {
      id: 2,
      action: 'Licensee Created',
      user: 'Jane Doe',
      target: 'ABC Corporation',
      timestamp: '2024-12-20 13:15:00',
      type: 'licensee'
    },
    {
      id: 3,
      action: 'Document Approved',
      user: 'Mike Johnson',
      target: 'Tax Certificate - LIC-002',
      timestamp: '2024-12-20 11:45:00',
      type: 'document'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Activity Log</h1>
      <p className="text-gray-600 mb-8">Historical logs of changes, updates, and system actions.</p>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.target} by {activity.user}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
