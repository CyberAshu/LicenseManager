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
  FileText,
  X,
  MapPin,
  Radio,
  Calendar,
  Shield,
  Activity
} from 'lucide-react';

const Licenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [previewLicense, setPreviewLicense] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  
  // License form state
  const [formData, setFormData] = useState({
    licensee: '',
    assignedEmployee: '',
    licenseId: '',
    callsign: '',
    licenseType: '',
    serviceCode: '',
    frequencyBand: '',
    geographicArea: '',
    issuanceDate: '',
    expirationDate: '',
    renewalTrackingEnabled: false,
    licenseStatus: 'Active',
    tags: '',
    internalNotes: '',
    licenseDocument: null
  });

  // Sample data for dropdowns
  const sampleLicensees = [
    { id: 1, name: 'John Smith', type: 'Individual' },
    { id: 2, name: 'ABC Corporation', type: 'Business' },
    { id: 3, name: 'City of Springfield', type: 'Government Entity' }
  ];

  const employees = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@company.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com' }
  ];

  const licenseTypes = [
    'Broadcast',
    'Marine',
    'Wireless',
    'Amateur',
    'Public Safety',
    'Experimental',
    'Commercial'
  ];

  const licenseStatuses = [
    'Active',
    'Expiring Soon',
    'Expired',
    'Suspended'
  ];

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

  // Form handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingLicense(null);
    // Reset form
    setFormData({
      licensee: '',
      assignedEmployee: '',
      licenseId: '',
      callsign: '',
      licenseType: '',
      serviceCode: '',
      frequencyBand: '',
      geographicArea: '',
      issuanceDate: '',
      expirationDate: '',
      renewalTrackingEnabled: false,
      licenseStatus: 'Active',
      tags: '',
      internalNotes: '',
      licenseDocument: null
    });
  };

  const handleEdit = (license) => {
    setEditingLicense(license);
    setFormData({
      licensee: license.licensee,
      assignedEmployee: '',
      licenseId: license.id,
      callsign: license.callSign,
      licenseType: license.licenseType,
      serviceCode: license.serviceCode,
      frequencyBand: license.frequencyBand,
      geographicArea: license.region,
      issuanceDate: license.issuanceDate,
      expirationDate: license.expiryDate,
      renewalTrackingEnabled: license.renewalDue,
      licenseStatus: license.status,
      tags: '',
      internalNotes: '',
      licenseDocument: null
    });
    setShowForm(true);
  };

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

  // Handle license preview
  const handlePreview = (license) => {
    setPreviewLicense(license);
    setIsPreviewOpen(true);
  };

  // Close preview modal
  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewLicense(null);
  };

  // If showing form, render the form instead of the license list
  if (showForm) {
    return (
      <div className="space-y-6">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {editingLicense ? 'Edit License' : 'Add New License'}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {editingLicense ? 'Update license information and details.' : 'Fill out the form below to add a new license to the system.'}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingLicense(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                ← Back to Licenses
              </button>
            </div>
          </div>
        </div>

        {/* License Form */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Licensee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Licensee <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.licensee}
                    onChange={(e) => setFormData({...formData, licensee: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a Licensee</option>
                    {sampleLicensees.map(licensee => (
                      <option key={licensee.id} value={licensee.name}>
                        {licensee.name} ({licensee.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assigned Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned Employee
                  </label>
                  <select
                    value={formData.assignedEmployee}
                    onChange={(e) => setFormData({...formData, assignedEmployee: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">No Employee Assigned</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name} ({employee.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* License ID / Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License ID / Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.licenseId}
                    onChange={(e) => setFormData({...formData, licenseId: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., LIC-001"
                    required
                  />
                </div>

                {/* Callsign */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Callsign
                  </label>
                  <input
                    type="text"
                    value={formData.callsign}
                    onChange={(e) => setFormData({...formData, callsign: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., KBXYZ123"
                  />
                </div>

                {/* License Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.licenseType}
                    onChange={(e) => setFormData({...formData, licenseType: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select License Type</option>
                    {licenseTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Service Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Code
                  </label>
                  <input
                    type="text"
                    value={formData.serviceCode}
                    onChange={(e) => setFormData({...formData, serviceCode: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., HA, BC, PS"
                  />
                </div>
              </div>
            </div>

            {/* Technical Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Frequency Band */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency Band
                  </label>
                  <input
                    type="text"
                    value={formData.frequencyBand}
                    onChange={(e) => setFormData({...formData, frequencyBand: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 2.4 GHz, 5.8 GHz"
                  />
                </div>

                {/* Geographic Area / Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Geographic Area / Region
                  </label>
                  <input
                    type="text"
                    value={formData.geographicArea}
                    onChange={(e) => setFormData({...formData, geographicArea: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>
            </div>

            {/* Dates and Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dates and Status</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Issuance Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Issuance Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.issuanceDate}
                    onChange={(e) => setFormData({...formData, issuanceDate: e.target.value})}
                    max={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiration Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                    min={formData.issuanceDate || new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* License Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.licenseStatus}
                    onChange={(e) => setFormData({...formData, licenseStatus: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    {licenseStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Renewal Tracking Enabled */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.renewalTrackingEnabled}
                    onChange={(e) => setFormData({...formData, renewalTrackingEnabled: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Renewal Tracking Enabled
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-6">
                {/* Tags / Labels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags / Labels
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="High Priority, Critical, etc. (comma-separated)"
                  />
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Internal Notes
                  </label>
                  <textarea
                    value={formData.internalNotes}
                    onChange={(e) => setFormData({...formData, internalNotes: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Internal remarks visible only to Office Employees/Admins..."
                  />
                </div>

                {/* Upload License Document */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload License Document
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFormData({...formData, licenseDocument: e.target.files[0]})}
                    accept=".pdf,.docx,.jpg,.png"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">Accepts PDF, DOCX, JPG, PNG files</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingLicense(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                {editingLicense ? 'Update License' : 'Add License'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
            >
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
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredLicenses.map((license) => {
          const StatusIcon = getStatusIcon(license.status);
          return (
            <div key={license.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{license.callSign}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{license.id}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${getStatusColor(license.status)} ml-2`}>
                  <StatusIcon className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                  <span className="hidden sm:inline">{license.status}</span>
                  <span className="sm:hidden">{license.status.split(' ')[0]}</span>
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
                <button 
                  onClick={() => handlePreview(license)}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button 
                  onClick={() => handleEdit(license)}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
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

      {/* Preview Modal */}
      {isPreviewOpen && previewLicense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center">
                <Radio className="h-6 w-6 text-indigo-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {previewLicense.callSign}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {previewLicense.licenseType} License • {previewLicense.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(previewLicense.status)}`}>
                  <Activity className="h-4 w-4 mr-1" />
                  {previewLicense.status}
                </span>
                <button
                  onClick={closePreview}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100"
                  title="Close Preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* License Holder Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">License Holder</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">{previewLicense.licensee}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="ml-2 text-gray-900 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {previewLicense.region}
                      </span>
                    </div>
                  </div>
                </div>

                {/* License Details */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">License Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Call Sign:</span>
                      <p className="text-lg font-semibold text-blue-600">{previewLicense.callSign}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">License Type:</span>
                      <p className="text-gray-900">{previewLicense.licenseType}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Service Code:</span>
                      <p className="text-gray-900">{previewLicense.serviceCode}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Frequency Band:</span>
                      <p className="text-gray-900">{previewLicense.frequencyBand}</p>
                    </div>
                  </div>
                </div>

                {/* Dates Information */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Important Dates</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Issue Date:
                      </span>
                      <p className="text-gray-900">{new Date(previewLicense.issuanceDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Expiry Date:
                      </span>
                      <p className="text-gray-900">{new Date(previewLicense.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {previewLicense.renewalDue && (
                    <div className="mt-3 bg-yellow-100 border border-yellow-200 rounded-md p-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">Renewal Required Soon</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        This license is due for renewal. Please initiate the renewal process.
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Additional Information</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">License ID:</span>
                      <span className="ml-2 text-gray-900 font-mono">{previewLicense.id}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Regulatory Authority:</span>
                      <span className="ml-2 text-gray-900">Federal Communications Commission (FCC)</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">License Classification:</span>
                      <span className="ml-2 text-gray-900">{previewLicense.licenseType} - {previewLicense.serviceCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit License
                </button>
                <button
                  onClick={closePreview}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Licenses;
