import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User,
  Calendar,
  Search
} from 'lucide-react';

const Renewals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sampleRenewals = [
    {
      id: 'REN-001',
      licenseId: 'LIC-002',
      licensee: 'ABC Corporation',
      callSign: 'WABC456',
      expiryDate: '2025-03-10',
      renewalStatus: 'In Progress',
      reminderStatus: 'Sent',
      assignedEmployee: 'John Smith',
      daysUntilExpiry: 65,
      priority: 'Medium'
    },
    {
      id: 'REN-002',
      licenseId: 'LIC-005',
      licensee: 'Emergency Services',
      callSign: 'KEMER911',
      expiryDate: '2025-01-25',
      renewalStatus: 'Not Started',
      reminderStatus: 'Not Sent',
      assignedEmployee: 'Jane Doe',
      daysUntilExpiry: 20,
      priority: 'High'
    },
    {
      id: 'REN-003',
      licenseId: 'LIC-007',
      licensee: 'Mountain Radio Club',
      callSign: 'W1MRC',
      expiryDate: '2025-02-15',
      renewalStatus: 'Ready for Submission',
      reminderStatus: 'Follow-up Sent',
      assignedEmployee: 'Mike Johnson',
      daysUntilExpiry: 41,
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Ready for Submission': return 'bg-green-100 text-green-800';
      case 'Submitted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority, days) => {
    if (days <= 30) return 'bg-red-100 text-red-800';
    if (days <= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const filteredRenewals = sampleRenewals.filter(renewal =>
    renewal.licensee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    renewal.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    renewal.licenseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Renewals</h1>
        <p className="mt-2 text-sm text-gray-700">
          Track and process upcoming license renewals to ensure timely compliance.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search renewals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Renewals List */}
      <div className="space-y-4">
        {filteredRenewals.map((renewal) => (
          <div key={renewal.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {renewal.callSign} - {renewal.licensee}
                  </h3>
                  <p className="text-sm text-gray-500">License ID: {renewal.licenseId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(renewal.priority, renewal.daysUntilExpiry)}`}>
                  {renewal.daysUntilExpiry} days until expiry
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(renewal.renewalStatus)}`}>
                  {renewal.renewalStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">License Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Expires: {new Date(renewal.expiryDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Assigned: {renewal.assignedEmployee}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Renewal Status</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Process Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(renewal.renewalStatus)}`}>
                      {renewal.renewalStatus}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Reminder Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      renewal.reminderStatus === 'Not Sent' ? 'bg-red-100 text-red-800' :
                      renewal.reminderStatus === 'Sent' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {renewal.reminderStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Required Documents</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Application Form
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Technical Report
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Fee Payment
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRenewals.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No renewals found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No renewals match your current search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Renewals;
