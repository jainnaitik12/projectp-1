import { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import WorkFlowAutomation from '../../components/admin/automation/WorkFlowAutomation';
import { EmailAutomation } from '../../components/admin/automation/EmailAutomation';
import { TaskAutomation } from '../../components/admin/automation/TaskAutomation';
import { AutomationLogs } from '../../components/admin/automation/AutomationLogs';

const Automation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = parseInt(searchParams.get('tab') || '0');

  const handleTabChange = (event, newValue) => {
    setSearchParams({ tab: newValue.toString() });
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Workflows" />
          <Tab label="Email Rules" />
          <Tab label="Tasks" />
          <Tab label="Logs" />
        </Tabs>
      </Paper>

      {currentTab === 0 && <WorkFlowAutomation />}
      {currentTab === 1 && <EmailAutomation />}
      {currentTab === 2 && <TaskAutomation />}
      {currentTab === 3 && <AutomationLogs />}
    </Box>
  );
};

export default Automation; 