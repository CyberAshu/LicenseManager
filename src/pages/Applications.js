import React from 'react';
import { Eye, Check, X } from 'lucide-react';

const Applications = () => {
  const sampleApplications = [
    {
      id: 'APP-001',
      licensee: 'Tech Solutions Inc.',
      licenseType: 'Experimental',
      status: 'Under Review',
      submissionDate: '2024-12-15',
      reviewer: 'John Smith'
    },
    {
      id: 'APP-002', 
      licensee: 'Metro Broadcasting',
      licenseType: 'Broadcast',
      status: 'Approved',
      submissionDate: '2024-12-10',
      reviewer: 'Jane Doe'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Licensee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleApplications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.licensee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.licenseType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    app.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900"><Eye className="h-4 w-4" /></button>
                  <button className="text-green-600 hover:text-green-900"><Check className="h-4 w-4" /></button>
                  <button className="text-red-600 hover:text-red-900"><X className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
