import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper } from '@mui/material';
import GeneralSettings from '../../components/admin/settings/GeneralSettings';
import UserManagement from '../../components/admin/settings/UserManagement';
import EmailSettings from '../../components/admin/settings/EmailSettings';
import SecuritySettings from '../../components/admin/settings/SecuritySettings';
import BackupSettings from '../../components/admin/settings/BackupSettings';
import { useSearchParams } from 'react-router-dom';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = parseInt(searchParams.get('tab') || '0');

  const handleTabChange = (event, newValue) => {
    setSearchParams({ tab: newValue.toString() });
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="User Management" />
          <Tab label="Email" />
          <Tab label="Security" />
          <Tab label="Backup" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <GeneralSettings />}
      {activeTab === 1 && <UserManagement />}
      {activeTab === 2 && <EmailSettings />}
      {activeTab === 3 && <SecuritySettings />}
      {activeTab === 4 && <BackupSettings />}
    </Box>
  );
};

export default Settings; 