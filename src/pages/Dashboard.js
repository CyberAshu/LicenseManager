import React from 'react';
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Licensees',
      value: '284',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Active Licenses',
      value: '1,247',
      change: '+8%',
      changeType: 'positive',
      icon: FileText,
    },
    {
      name: 'Pending Renewals',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: Clock,
    },
    {
      name: 'Applications Under Review',
      value: '16',
      change: '+3%',
      changeType: 'positive',
      icon: AlertTriangle,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'license_approved',
      message: 'License KBXYZ123 approved for John Smith',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    {
      id: 2,
      type: 'renewal_due',
      message: 'Renewal due for ABC Corp - License expires in 7 days',
      timestamp: '4 hours ago',
      icon: Clock,
      iconColor: 'text-yellow-500',
    },
    {
      id: 3,
      type: 'application_submitted',
      message: 'New application submitted by Tech Solutions Inc.',
      timestamp: '1 day ago',
      icon: FileText,
      iconColor: 'text-blue-500',
    },
    {
      id: 4,
      type: 'document_rejected',
      message: 'Tax certificate rejected for license renewal - requires resubmission',
      timestamp: '2 days ago',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'urgent',
      title: 'Urgent Renewals',
      message: '5 licenses expire within 7 days',
      action: 'Review Renewals',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pending Documents',
      message: '12 documents awaiting validation',
      action: 'Review Documents',
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Scheduled maintenance on Sunday 3:00 AM',
      action: 'View Details',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
              Welcome back! Here's what's happening with your license management.
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <div className="text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Last updated: </span>
              <span className="sm:hidden">Updated: </span>
              {new Date().toLocaleString([], { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-lg sm:text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-xs sm:text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'positive' ? (
                            <TrendingUp className="self-center flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <TrendingUp className="self-center flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4 transform rotate-180" />
                          )}
                          <span className="sr-only">
                            {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                          </span>
                          <span className="hidden sm:inline">{stat.change}</span>
                          <span className="sm:hidden">{stat.change.replace(' from last month', '')}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Alerts */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-4 sm:px-6 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-semibold text-gray-900 mb-3 sm:mb-4">
              Active Alerts
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 sm:p-4 rounded-md ${
                  alert.type === 'urgent' ? 'bg-red-50 border border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        alert.type === 'urgent' ? 'text-red-400' :
                        alert.type === 'warning' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`} />
                    </div>
                    <div className="ml-2 sm:ml-3 flex-1">
                      <h4 className={`text-xs sm:text-sm font-medium ${
                        alert.type === 'urgent' ? 'text-red-800' :
                        alert.type === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {alert.title}
                      </h4>
                      <p className={`mt-1 text-xs sm:text-sm ${
                        alert.type === 'urgent' ? 'text-red-700' :
                        alert.type === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>
                        {alert.message}
                      </p>
                      <button className={`mt-2 text-xs sm:text-sm font-medium ${
                        alert.type === 'urgent' ? 'text-red-600 hover:text-red-500' :
                        alert.type === 'warning' ? 'text-yellow-600 hover:text-yellow-500' :
                        'text-blue-600 hover:text-blue-500'
                      }`}>
                        <span className="hidden sm:inline">{alert.action} →</span>
                        <span className="sm:hidden">View →</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-4 sm:px-6 sm:py-5">
            <h3 className="text-base sm:text-lg leading-6 font-semibold text-gray-900 mb-3 sm:mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-6 sm:-mb-8">
                {recentActivity.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <div className="relative pb-6 sm:pb-8">
                        {itemIdx !== recentActivity.length - 1 ? (
                          <span className="absolute top-3 sm:top-4 left-3 sm:left-4 -ml-px h-full w-0.5 bg-gray-200" />
                        ) : null}
                        <div className="relative flex space-x-2 sm:space-x-3">
                          <div>
                            <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-50 flex items-center justify-center ring-4 sm:ring-8 ring-white">
                              <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${item.iconColor}`} />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1 sm:pt-1.5 flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0 sm:space-x-4">
                            <div>
                              <p className="text-xs sm:text-sm text-gray-900 leading-tight">{item.message}</p>
                            </div>
                            <div className="text-left sm:text-right text-xs text-gray-500">
                              {item.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
