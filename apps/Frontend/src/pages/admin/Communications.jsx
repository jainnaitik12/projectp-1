import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper } from '@mui/material';
import { BulkCommunicationCenter } from '../../components/admin/communication/BulkCommunicationCenter';
import { MessageTrackingDashboard } from '../../components/admin/communication/MessageTrackingDashboard';
import { CommunicationLogs } from '../../components/admin/communication/CommunicationLog';

const Communications = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Bulk Communication" />
          <Tab label="Message Tracking" />
          <Tab label="Communication Logs" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && <BulkCommunicationCenter />}
        {activeTab === 1 && <MessageTrackingDashboard />}
        {activeTab === 2 && <CommunicationLogs />}
      </Box>
    </Box>
  );
};

export default Communications; 