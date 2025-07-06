import React from 'react';
import { FolderOpen } from 'lucide-react';

const Documents = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Documents</h1>
      <p className="text-gray-600 mb-8">Validate, tag, and track submitted documents for licenses and applications.</p>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Document validation queue</h3>
          <p className="mt-1 text-sm text-gray-500">
            Documents submitted by licensees will appear here for review and validation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documents;
