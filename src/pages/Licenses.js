import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

const Licenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const sampleLicenses = [
    {
      id: 'LIC-001',
      callSign: 'KBXYZ123',
      licensee: 'John Smith',
      licenseType: 'Amateur',
      serviceCode: 'HA',
      status: 'Active',
      issuanceDate: '2023-01-15',
      expiryDate: '2025-01-15',
      frequencyBand: '2.4 GHz',
      region: 'New York, NY',
      renewalDue: false
    },
    {
      id: 'LIC-002',
      callSign: 'WABC456',
      licensee: 'ABC Corporation',
      licenseType: 'Broadcast',
      serviceCode: 'BC',
      status: 'Expiring Soon',
      issuanceDate: '2022-03-10',
      expiryDate: '2025-03-10',
      frequencyBand: '88.5 FM',
      region: 'Los Angeles, CA',
      renewalDue: true
    },
    {
      id: 'LIC-003',
      callSign: 'KGOV789',
      licensee: 'City of Springfield',
      licenseType: 'Public Safety',
      serviceCode: 'PS',
      status: 'Active',
      issuanceDate: '2023-06-20',
      expiryDate: '2026-06-20',
      frequencyBand: '450 MHz',
      region: 'Springfield, IL',
      renewalDue: false
    },
    {
      id: 'LIC-004',
      callSign: 'WEXP999',
      licensee: 'Tech Solutions Inc.',
      licenseType: 'Experimental',
      serviceCode: 'EX',
      status: 'Suspended',
      issuanceDate: '2022-09-05',
      expiryDate: '2024-09-05',
      frequencyBand: '5.8 GHz',
      region: 'Austin, TX',
      renewalDue: false
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return CheckCircle;
      case 'Expiring Soon': return Clock;
      case 'Expired': return AlertTriangle;
      case 'Suspended': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLicenses = sampleLicenses.filter(license => {
    const matchesSearch = 
      license.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licensee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || license.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Licenses</h1>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all FCC licenses assigned to licensees.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add License
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Licenses Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredLicenses.map((license) => {
          const StatusIcon = getStatusIcon(license.status);
          return (
            <div key={license.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-indigo-500 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{license.callSign}</h3>
                    <p className="text-sm text-gray-500">{license.id}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(license.status)}`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {license.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Licensee:</span>
                  <p className="text-sm text-gray-900">{license.licensee}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <p className="text-sm text-gray-900">{license.licenseType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Service:</span>
                    <p className="text-sm text-gray-900">{license.serviceCode}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Frequency Band:</span>
                  <p className="text-sm text-gray-900">{license.frequencyBand}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Region:</span>
                  <p className="text-sm text-gray-900">{license.region}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Issued:</span>
                    <p className="text-sm text-gray-900">{new Date(license.issuanceDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Expires:</span>
                    <p className="text-sm text-gray-900">{new Date(license.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {license.renewalDue && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-yellow-800">Renewal Due</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLicenses.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No licenses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No licenses match your current search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Licenses;
