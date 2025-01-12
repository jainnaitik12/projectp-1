import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper } from '@mui/material';
import PlacementProgress from '../../components/admin/monitoring/PlacementProgress';
import CompanyWiseStats from '../../components/admin/monitoring/CompanyWiseStats';
import StudentPerformance from '../../components/admin/monitoring/StudentPerformance';
import BranchWiseAnalytics from '../../components/admin/monitoring/BranchWiseAnalytics';

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Placement Progress" />
          <Tab label="Company Statistics" />
          <Tab label="Student Performance" />
          <Tab label="Branch Analytics" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <PlacementProgress />}
      {activeTab === 1 && <CompanyWiseStats />}
      {activeTab === 2 && <StudentPerformance />}
      {activeTab === 3 && <BranchWiseAnalytics />}
    </Box>
  );
};

export default Monitoring;

