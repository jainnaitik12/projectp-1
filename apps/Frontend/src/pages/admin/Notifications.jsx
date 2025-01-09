import { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import NotificationCenter from '../../components/admin/notifications/NotificationCenter';
import NotificationComposer from '../../components/admin/notifications/NotificationComposer';
import NotificationHistory from '../../components/admin/notifications/NotificationHistory';
import { NotificationManager } from '../../components/admin/notifications/NotificationManager';
import { NotificationTemplates } from '../../components/admin/notifications/NotificationTemplates';

const Notifications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = parseInt(searchParams.get('tab') || '0');

  // Sample data for templates
  const templates = [
    {
      id: 1,
      name: 'Placement Drive Announcement',
      description: 'Template for announcing new placement drives',
      type: 'Email',
      variables: ['companyName', 'date', 'venue'],
      content: 'Dear Students,\n\nWe are pleased to announce that {{companyName}} will be conducting...'
    },
    // Add more templates...
  ];

  // Sample data for notification manager
  const managedNotifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Placement Drive Tomorrow',
      message: 'Google placement drive starts at 10 AM',
      status: 'scheduled',
      timestamp: '2024-03-21 10:00 AM'
    },
    // Add more notifications...
  ];

  const handleTabChange = (event, newValue) => {
    setSearchParams({ tab: newValue.toString() });
  };

  const handleNotificationAction = (action, data) => {
    console.log('Notification action:', action, data);
    // Handle different actions (create, delete, update, etc.)
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Notification Center" />
          <Tab label="Compose" />
          <Tab label="History" />
          <Tab label="Templates" />
          <Tab label="Manager" />
        </Tabs>
      </Paper>

      {currentTab === 0 && (
        <NotificationCenter />
      )}

      {currentTab === 1 && (
        <NotificationComposer />
      )}

      {currentTab === 2 && (
        <NotificationHistory />
      )}

      {currentTab === 3 && (
        <NotificationTemplates 
          templates={templates}
          onAction={handleNotificationAction}
        />
      )}

      {currentTab === 4 && (
        <NotificationManager 
          notifications={managedNotifications}
          onAction={handleNotificationAction}
        />
      )}
    </Box>
  );
};

export default Notifications; 