import React from 'react';
import { Phone, Mail, Book, MessageCircle } from 'lucide-react';

const HelpSupport = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Help & Support</h1>
      <p className="text-gray-600 mb-8">Internal FAQs, contact points, and system guidance.</p>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* FAQ Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Book className="h-6 w-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">How do I add a new licensee?</h4>
              <p className="text-sm text-gray-600 mt-1">
                Navigate to the Licensees tab and click "Add Licensee" to access the form.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">How do I track license renewals?</h4>
              <p className="text-sm text-gray-600 mt-1">
                Use the Renewals tab to view all upcoming license renewals and their status.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">How do I validate documents?</h4>
              <p className="text-sm text-gray-600 mt-1">
                Check the Documents tab for pending validations and review submitted files.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Contact Support</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@licensemanager.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-600">Available 9 AM - 5 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Version</p>
            <p className="text-sm text-gray-600">v2.1.0</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Last Updated</p>
            <p className="text-sm text-gray-600">December 15, 2024</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Status</p>
            <p className="text-sm text-green-600">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
