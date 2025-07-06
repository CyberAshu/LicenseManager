import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Licensees from './pages/Licensees';
import Licenses from './pages/Licenses';
import Renewals from './pages/Renewals';
import Applications from './pages/Applications';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import ActivityLog from './pages/ActivityLog';
import HelpSupport from './pages/HelpSupport';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/licensees" element={<Licensees />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/renewals" element={<Renewals />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/help-support" element={<HelpSupport />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
