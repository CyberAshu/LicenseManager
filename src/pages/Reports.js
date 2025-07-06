import React, { useState } from 'react';
import { Download } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('licenses');
  const [dateRange, setDateRange] = useState('30');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-2 text-sm text-gray-700">
          Generate and export operational and compliance-related reports in various formats.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Generate Report</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="licenses">Licenses</option>
              <option value="renewals">Renewals</option>
              <option value="applications">Applications</option>
              <option value="documents">Documents</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Generate
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Reports</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-900">License Status Report</p>
                <p className="text-sm text-gray-500">Generated on Dec 20, 2024</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-900">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-900">Renewal Summary</p>
                <p className="text-sm text-gray-500">Generated on Dec 18, 2024</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-900">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
