import React, { useState } from 'react';
import { FolderOpen, FileText, Download, Eye, CheckCircle, XCircle, Clock, Folder, X } from 'lucide-react';

const Documents = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Dummy document data
  const documentFolders = [
    {
      id: 1,
      name: 'Licenses',
      icon: <Folder className="h-5 w-5 text-blue-500" />,
      count: 3,
      description: 'Issued license certificates and documentation',
      files: [
        { id: 1, name: 'medical_license_application_john_doe.pdf', type: 'PDF', size: '2.1 MB', status: 'approved', date: '2024-01-15', licensee: 'Dr. John Doe' },
        { id: 2, name: 'dental_license_certificate_jane_smith.pdf', type: 'PDF', size: '1.8 MB', status: 'approved', date: '2024-01-20', licensee: 'Dr. Jane Smith' },
        { id: 3, name: 'veterinary_license_robert_wilson.pdf', type: 'PDF', size: '1.5 MB', status: 'approved', date: '2024-03-15', licensee: 'Dr. Robert Wilson' }
      ]
    },
    {
      id: 2,
      name: 'Applications',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      count: 2,
      description: 'Pending license applications and submissions',
      files: [
        { id: 4, name: 'business_license_application_acme_corp.docx', type: 'DOC', size: '856 KB', status: 'pending', date: '2024-01-15', licensee: 'ACME Corporation' },
        { id: 5, name: 'nursing_license_application_mary_johnson.pdf', type: 'PDF', size: '1.2 MB', status: 'under_review', date: '2024-06-20', licensee: 'Mary Johnson' }
      ]
    },
    {
      id: 3,
      name: 'Renewals',
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      count: 1,
      description: 'License renewal applications and documentation',
      files: [
        { id: 6, name: 'medical_license_renewal_john_doe.pdf', type: 'PDF', size: '1.9 MB', status: 'pending', date: '2024-07-01', licensee: 'Dr. John Doe' }
      ]
    },
    {
      id: 4,
      name: 'Compliance',
      icon: <CheckCircle className="h-5 w-5 text-purple-500" />,
      count: 2,
      description: 'Audit reports and compliance documentation',
      files: [
        { id: 7, name: 'audit_report_q1_2024.pdf', type: 'PDF', size: '3.2 MB', status: 'approved', date: '2024-04-01', licensee: 'System Generated' },
        { id: 8, name: 'insurance_verification_acme_corp.pdf', type: 'PDF', size: '945 KB', status: 'approved', date: '2024-01-01', licensee: 'ACME Corporation' }
      ]
    },
    {
      id: 5,
      name: 'Templates',
      icon: <FileText className="h-5 w-5 text-gray-500" />,
      count: 2,
      description: 'Document templates and forms',
      files: [
        { id: 9, name: 'license_application_template.docx', type: 'DOC', size: '234 KB', status: 'approved', date: '2024-01-01', licensee: 'System Template' },
        { id: 10, name: 'renewal_form_template.docx', type: 'DOC', size: '198 KB', status: 'approved', date: '2024-01-01', licensee: 'System Template' }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    const statusIcons = {
      approved: <CheckCircle className="h-3 w-3 mr-1" />,
      pending: <Clock className="h-3 w-3 mr-1" />,
      under_review: <Eye className="h-3 w-3 mr-1" />,
      rejected: <XCircle className="h-3 w-3 mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const filteredFiles = selectedFolder ? 
    selectedFolder.files.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.licensee.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  // Handle file preview
  const handlePreview = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  // Handle file download
  const handleDownload = (file) => {
    // Create a dummy blob for demonstration
    const content = `Document: ${file.name}\nLicensee: ${file.licensee}\nType: ${file.type}\nSize: ${file.size}\nStatus: ${file.status}\nDate: ${file.date}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Close preview modal
  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  // Get document content for preview
  const getDocumentPreview = (file) => {
    // This would normally fetch the actual document content
    // For demo purposes, we'll show dummy content based on file type
    if (file.type === 'PDF') {
      return {
        title: file.name,
        content: `
Document Title: ${file.name.replace(/[_]/g, ' ').replace('.pdf', '')}
Licensee: ${file.licensee}
Document Type: ${file.type}
File Size: ${file.size}
Status: ${file.status.toUpperCase()}
Date Created: ${new Date(file.date).toLocaleDateString()}

--- DOCUMENT CONTENT ---

This is a preview of the ${file.type} document. In a real application, this would show the actual document content or render a PDF viewer.

License Information:
• License Type: Professional License
• Issued By: State Licensing Board
• Valid From: ${file.date}
• Expiration: 2027-12-31

For security reasons, full document content is only available through download or secure viewer applications.

--- END OF PREVIEW ---`
      };
    } else {
      return {
        title: file.name,
        content: `
Document: ${file.name}
Licensee: ${file.licensee}
Type: ${file.type} Document
Size: ${file.size}
Status: ${file.status.toUpperCase()}
Date: ${new Date(file.date).toLocaleDateString()}

--- DOCUMENT PREVIEW ---

This is a preview of the document content. The actual document may contain:

• Application forms
• Personal information
• Educational credentials
• Professional references
• Compliance certificates
• Insurance documentation

Note: This is a demo preview. In a production environment, this would display the actual document content with proper formatting and security measures.

--- END OF PREVIEW ---`
      };
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Validate, tag, and track submitted documents for licenses and applications.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {!selectedFolder ? (
        // Folder View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentFolders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setSelectedFolder(folder)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {folder.icon}
                  <h3 className="ml-2 text-lg font-semibold text-gray-900">{folder.name}</h3>
                </div>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {folder.count}
                </span>
              </div>
              <p className="text-sm text-gray-600">{folder.description}</p>
            </div>
          ))}
        </div>
      ) : (
        // File View
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4"
                >
                  ← Back to Folders
                </button>
                <div className="flex items-center">
                  {selectedFolder.icon}
                  <h2 className="ml-2 text-xl font-semibold text-gray-900">{selectedFolder.name}</h2>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredFiles.length} files
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Licensee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.licensee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(file.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(file.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handlePreview(file)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="Preview Document"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDownload(file)}
                          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                          title="Download Document"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : 'No documents in this folder yet.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getDocumentPreview(previewFile).title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {previewFile.licensee} • {previewFile.type} • {previewFile.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(previewFile)}
                  className="text-green-600 hover:text-green-800 p-2 rounded hover:bg-green-50"
                  title="Download Document"
                >
                  <Download className="h-5 w-5" />
                </button>
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
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {getDocumentPreview(previewFile).content}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Status:</span>
                  {getStatusBadge(previewFile.status)}
                </div>
                <div className="text-sm text-gray-500">
                  Last Modified: {new Date(previewFile.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDownload(previewFile)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
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

export default Documents;
