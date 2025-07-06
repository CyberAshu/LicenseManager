import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  RefreshCw, 
  ClipboardList, 
  FolderOpen, 
  BarChart3, 
  MessageSquare, 
  Activity, 
  HelpCircle,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Licensees', href: '/licensees', icon: Users, completed: true },
    { name: 'Licenses', href: '/licenses', icon: FileText },
    { name: 'Renewals', href: '/renewals', icon: RefreshCw },
    { name: 'Applications', href: '/applications', icon: ClipboardList },
    { name: 'Documents', href: '/documents', icon: FolderOpen },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Activity Log', href: '/activity-log', icon: Activity },
    { name: 'Help & Support', href: '/help-support', icon: HelpCircle },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          {/* Close button inside sidebar */}
          <div className="flex-1 h-0 pt-4 pb-4 overflow-y-auto">
            {/* Header with close button */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 pb-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-900">License Manager</h1>
              </div>
              <button
                type="button"
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-4 h-6 w-6" />
                    {item.name}
                    {item.completed && (
                      <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">License Manager</h1>
                </div>
              </div>
              <nav className="mt-8 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                      {item.completed && (
                        <CheckCircle className="ml-auto h-4 w-4 text-green-500" />
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center mr-2">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">License Manager</h1>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
