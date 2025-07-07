import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  Paperclip, 
  MoreVertical,
  Reply,
  Forward,
  Archive,
  User,
  Building,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  X
} from 'lucide-react';

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMessageDetail, setShowMessageDetail] = useState(false);

  // Dummy messages data
  const messages = [
    {
      id: 1,
      from: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        type: 'Individual',
        avatar: 'JS'
      },
      subject: 'License Renewal Question',
      content: 'Hi, I have a question about my upcoming license renewal. My current amateur radio license expires on January 15, 2025. What documents do I need to prepare for the renewal process? Also, are there any continuing education requirements I need to fulfill?',
      timestamp: '2024-07-07T10:30:00Z',
      status: 'unread',
      priority: 'normal',
      category: 'renewal',
      hasAttachment: false,
      replies: [
        {
          id: 101,
          from: {
            name: 'Admin Support',
            email: 'support@licensemanager.com',
            type: 'Admin',
            avatar: 'AS'
          },
          content: 'Thank you for your inquiry. For amateur radio license renewal, you will need: 1) Completed renewal form, 2) Current FCC registration, 3) Payment of renewal fee. There are no continuing education requirements for amateur radio licenses.',
          timestamp: '2024-07-07T11:15:00Z'
        }
      ]
    },
    {
      id: 2,
      from: {
        name: 'ABC Corporation',
        email: 'licensing@abc-corp.com',
        type: 'Business',
        avatar: 'AC'
      },
      subject: 'New License Application Status',
      content: 'Dear License Manager Team, We submitted our broadcast license application (Reference: APP-2024-0456) three weeks ago. Could you please provide an update on the review status? We are planning to launch our new radio station and need to know the expected timeline for approval.',
      timestamp: '2024-07-06T14:20:00Z',
      status: 'read',
      priority: 'high',
      category: 'application',
      hasAttachment: true,
      replies: []
    },
    {
      id: 3,
      from: {
        name: 'City of Springfield',
        email: 'tech@springfield.gov',
        type: 'Government',
        avatar: 'CS'
      },
      subject: 'Emergency Communications License Update',
      content: 'We need to update our public safety radio system configuration. Our current license covers frequencies 450-460 MHz, but we need to add 460-470 MHz band for our new equipment. Please advise on the modification process.',
      timestamp: '2024-07-05T09:45:00Z',
      status: 'read',
      priority: 'urgent',
      category: 'modification',
      hasAttachment: false,
      replies: [
        {
          id: 102,
          from: {
            name: 'Tech Specialist',
            email: 'tech@licensemanager.com',
            type: 'Admin',
            avatar: 'TS'
          },
          content: 'For frequency band modification, please submit Form 601 with technical specifications. The process typically takes 2-3 weeks for public safety applications.',
          timestamp: '2024-07-05T15:30:00Z'
        }
      ]
    },
    {
      id: 4,
      from: {
        name: 'Mary Johnson',
        email: 'mary.johnson@hospital.com',
        type: 'Individual',
        avatar: 'MJ'
      },
      subject: 'License Transfer Request',
      content: 'I am retiring and need to transfer my medical facility radio license to the new facility manager. What is the process for license ownership transfer? The new manager is Dr. Sarah Wilson.',
      timestamp: '2024-07-04T16:10:00Z',
      status: 'read',
      priority: 'normal',
      category: 'transfer',
      hasAttachment: true,
      replies: []
    },
    {
      id: 5,
      from: {
        name: 'Tech Solutions Inc.',
        email: 'support@techsolutions.com',
        type: 'Business',
        avatar: 'TS'
      },
      subject: 'Experimental License Extension',
      content: 'Our experimental license for 5G testing (License: EX-2024-001) expires next month. We would like to extend it for another 6 months to complete our research project. The testing has been going well and we have preliminary results to share.',
      timestamp: '2024-07-03T11:25:00Z',
      status: 'read',
      priority: 'normal',
      category: 'extension',
      hasAttachment: true,
      replies: [
        {
          id: 103,
          from: {
            name: 'Research Coordinator',
            email: 'research@licensemanager.com',
            type: 'Admin',
            avatar: 'RC'
          },
          content: 'Please submit extension request with progress report and updated timeline. We can process 6-month extensions for active research projects.',
          timestamp: '2024-07-03T13:45:00Z'
        }
      ]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Individual': return User;
      case 'Business': return Building;
      case 'Government': return Shield;
      case 'Admin': return CheckCircle;
      default: return User;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryBadge = (category) => {
    const styles = {
      renewal: 'bg-blue-100 text-blue-800',
      application: 'bg-green-100 text-green-800',
      modification: 'bg-yellow-100 text-yellow-800',
      transfer: 'bg-purple-100 text-purple-800',
      extension: 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[category] || 'bg-gray-100 text-gray-800'}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'unread' && message.status === 'unread') ||
      (filterType === 'urgent' && message.priority === 'urgent') ||
      (filterType === 'attachments' && message.hasAttachment);
    
    return matchesSearch && matchesFilter;
  });

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Here you would normally send the reply to backend
      console.log('Reply sent:', replyText);
      setReplyText('');
      // Update message status to replied
      const updatedMessage = { ...selectedMessage };
      updatedMessage.replies.push({
          id: Date.now(),
          from: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@licensemanager.com',
            type: 'Admin',
            avatar: 'SJ'
          },
        content: replyText,
        timestamp: new Date().toISOString()
      });
      setSelectedMessage(updatedMessage);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.abs(now - date) / 36e5;
    
    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    if (isMobileView) {
      setShowMessageDetail(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Messages List - Hide on mobile when message detail is shown */}
      {(!isMobileView || !showMessageDetail) && (
        <div className={`${isMobileView ? 'w-full' : 'w-1/3'} bg-white border-r border-gray-200 flex flex-col`}>
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Messages</h1>
              <button 
                onClick={() => setShowCompose(true)}
                className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Compose</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            
            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="urgent">Urgent</option>
              <option value="attachments">With Attachments</option>
            </select>
          </div>
          
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => {
              const TypeIcon = getTypeIcon(message.from.type);
              return (
                <div
                  key={message.id}
                  onClick={() => handleMessageSelect(message)}
                  className={`p-3 sm:p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                  } ${
                    message.status === 'unread' ? 'bg-blue-25' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <TypeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium text-gray-900 truncate ${
                          message.status === 'unread' ? 'font-semibold' : ''
                        }`}>
                          {message.from.name}
                        </p>
                        <div className="flex items-center space-x-1 ml-2">
                          {message.hasAttachment && (
                            <Paperclip className="h-3 w-3 text-gray-400" />
                          )}
                          {message.priority === 'urgent' && (
                            <AlertCircle className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm text-gray-900 truncate ${
                        message.status === 'unread' ? 'font-medium' : 'font-normal'
                      }`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {message.content.substring(0, isMobileView ? 40 : 60)}...
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryBadge(message.category)}
                          {message.status === 'unread' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Message Detail - Hide on mobile when not viewing detail */}
      {(!isMobileView || showMessageDetail) && (
        <div className={`${isMobileView ? 'w-full' : 'flex-1'} flex flex-col`}>
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Back button for mobile */}
                    {isMobileView && (
                      <button
                        onClick={() => setShowMessageDetail(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 mr-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {(() => {
                        const TypeIcon = getTypeIcon(selectedMessage.from.type);
                        return <TypeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />;
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        From: {selectedMessage.from.name}
                        <span className="hidden sm:inline"> ({selectedMessage.from.email})</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="hidden sm:block">
                      {getCategoryBadge(selectedMessage.category)}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${getPriorityColor(selectedMessage.priority)} hidden sm:inline`}>
                      {selectedMessage.priority.charAt(0).toUpperCase() + selectedMessage.priority.slice(1)}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
                {/* Mobile category and priority */}
                <div className="flex items-center justify-between mt-3 sm:hidden">
                  {getCategoryBadge(selectedMessage.category)}
                  <span className={`text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority.charAt(0).toUpperCase() + selectedMessage.priority.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Message Content */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="p-4 sm:p-6">
                  {/* Original Message */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {selectedMessage.from.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(selectedMessage.timestamp).toLocaleDateString()}
                          <span className="hidden sm:inline"> {new Date(selectedMessage.timestamp).toLocaleTimeString()}</span>
                        </span>
                      </div>
                      {selectedMessage.hasAttachment && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="hidden sm:inline">Attachment</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>
                  
                  {/* Replies */}
                  {selectedMessage.replies.map((reply, index) => (
                    <div key={reply.id} className="border-l-4 border-blue-200 pl-3 sm:pl-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {reply.from.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.timestamp).toLocaleDateString()}
                            <span className="hidden sm:inline"> {new Date(reply.timestamp).toLocaleTimeString()}</span>
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reply Section */}
              <div className="bg-white border-t border-gray-200 p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={isMobileView ? 2 : 3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                          Save Draft
                        </button>
                        <button 
                          onClick={handleReply}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center"
                        >
                          <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Send Reply</span>
                          <span className="sm:hidden">Send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No Message Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-4">
                <MessageSquare className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Choose a message from the list to view its contents.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
