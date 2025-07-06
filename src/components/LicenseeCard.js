import React from 'react';
import { User, Building, Shield, Phone, Mail, FileText, Edit, Eye, Archive } from 'lucide-react';

const LicenseeCard = ({ licensee, onEdit }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Individual': return User;
      case 'Business': return Building;
      case 'Government Entity': return Shield;
      default: return User;
    }
  };

  const TypeIcon = getTypeIcon(licensee.type);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <TypeIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{licensee.name}</h3>
            <p className="text-xs text-gray-500">{licensee.type}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {licensee.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-gray-400" />
          <span className="truncate">{licensee.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          <span>{licensee.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FileText className="h-4 w-4 mr-2 text-gray-400" />
          <span>{licensee.licenseCount} licenses</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        Last activity: {licensee.lastActivity}
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Eye className="h-3 w-3 mr-1" />
          View
        </button>
        <button 
          onClick={() => onEdit(licensee)}
          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </button>
        <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
          <Archive className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default LicenseeCard;
