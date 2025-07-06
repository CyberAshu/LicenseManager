import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Archive, 
  Eye,
  User,
  Building,
  Shield,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Grid,
  List
} from 'lucide-react';
import LicenseeCard from '../components/LicenseeCard';

const Licensees = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingLicensee, setEditingLicensee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  const [formData, setFormData] = useState({
    licenseeType: 'Individual',
    organizationName: '',
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    fccRegistrationNumber: '',
    assignedEmployees: [],
    internalNotes: '',
    tags: ''
  });

  const employees = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@company.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com' },
  ];

  const sampleLicensees = [
    {
      id: 1,
      type: 'Individual',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      licenseCount: 3,
      status: 'Active',
      lastActivity: '2 days ago',
      fccNumber: 'FCC-001234567'
    },
    {
      id: 2,
      type: 'Business',
      name: 'ABC Corporation',
      email: 'licensing@abc-corp.com',
      phone: '(555) 987-6543',
      location: 'Los Angeles, CA',
      licenseCount: 8,
      status: 'Active',
      lastActivity: '1 week ago',
      fccNumber: 'FCC-001234568'
    },
    {
      id: 3,
      type: 'Government Entity',
      name: 'City of Springfield',
      email: 'tech@springfield.gov',
      phone: '(555) 555-0123',
      location: 'Springfield, IL',
      licenseCount: 12,
      status: 'Active',
      lastActivity: '3 days ago',
      fccNumber: 'FCC-001234569'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingLicensee(null);
    // Reset form
    setFormData({
      licenseeType: 'Individual',
      organizationName: '',
      fullName: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      fccRegistrationNumber: '',
      assignedEmployees: [],
      internalNotes: '',
      tags: ''
    });
  };

  const handleEdit = (licensee) => {
    setEditingLicensee(licensee);
    setFormData({
      licenseeType: licensee.type,
      organizationName: licensee.type !== 'Individual' ? licensee.name : '',
      fullName: licensee.type === 'Individual' ? licensee.name : '',
      email: licensee.email,
      phone: licensee.phone,
      addressLine1: '',
      addressLine2: '',
      city: licensee.location.split(', ')[0],
      state: licensee.location.split(', ')[1],
      zipCode: '',
      country: 'USA',
      fccRegistrationNumber: licensee.fccNumber,
      assignedEmployees: [],
      internalNotes: '',
      tags: ''
    });
    setShowForm(true);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Individual': return User;
      case 'Business': return Building;
      case 'Government Entity': return Shield;
      default: return User;
    }
  };

  const filteredLicensees = sampleLicensees.filter(licensee => {
    const matchesSearch = licensee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         licensee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || licensee.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (showForm) {
    return (
      <div className="space-y-6">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {editingLicensee ? 'Edit Licensee' : 'Add New Licensee'}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {editingLicensee ? 'Update licensee information and contact details.' : 'Fill out the form below to add a new licensee to the system.'}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingLicensee(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                ← Back to Licensees
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Licensee Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.licenseeType}
                    onChange={(e) => setFormData({...formData, licenseeType: e.target.value})}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                    required
                  >
                    <option value="Individual">Individual</option>
                    <option value="Business">Business</option>
                    <option value="Government Entity">Government Entity</option>
                  </select>
                </div>

                {formData.licenseeType !== 'Individual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Organization Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required={formData.licenseeType !== 'Individual'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    FCC Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.fccRegistrationNumber}
                    onChange={(e) => setFormData({...formData, fccRegistrationNumber: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    pattern="^FCC-[0-9]{9}$"
                    placeholder="FCC-123456789"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({...formData, addressLine2: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    pattern="^[A-Za-z0-9]{5,10}$"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Assignment and Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment & Notes</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned Employees
                  </label>
                  <select
                    multiple
                    value={formData.assignedEmployees}
                    onChange={(e) => setFormData({...formData, assignedEmployees: Array.from(e.target.selectedOptions, option => option.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    size={3}
                  >
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Comma-separated tags"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Internal Notes
                  </label>
                  <textarea
                    value={formData.internalNotes}
                    onChange={(e) => setFormData({...formData, internalNotes: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Internal notes about this licensee..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingLicensee(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                {editingLicensee ? 'Update Licensee' : 'Add Licensee'}
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
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Licensees</h1>
              <CheckCircle className="ml-3 h-6 w-6 text-green-500" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Manage licensee profiles, contact information, and license assignments.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Licensee
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
                placeholder="Search licensees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="all">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
                <option value="Government Entity">Government Entity</option>
              </select>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1 rounded ${viewMode === 'cards' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Licensees Content */}
      {viewMode === 'table' ? (
        /* Table View */
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Licensee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Licenses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLicensees.map((licensee) => {
              const TypeIcon = getTypeIcon(licensee.type);
              return (
                <tr key={licensee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{licensee.name}</div>
                        <div className="text-sm text-gray-500">{licensee.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {licensee.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {licensee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-gray-400" />
                      {licensee.licenseCount} licenses
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {licensee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {licensee.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(licensee)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Archive className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })})
          </tbody>
        </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLicensees.map((licensee) => (
            <LicenseeCard 
              key={licensee.id} 
              licensee={licensee} 
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Licensees;
