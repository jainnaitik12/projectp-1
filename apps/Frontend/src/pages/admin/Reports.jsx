import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper, Typography, useTheme } from '@mui/material';
import PlacementReports from '../../components/admin/reports/PlacementReports';
import CompanyReports from '../../components/admin/reports/CompanyReports';
import StudentReports from '../../components/admin/reports/StudentReports';
import CustomReports from '../../components/admin/reports/CustomReports';

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          color: theme.palette.text.primary,
          mb: 3 
        }}
      >
        Reports Dashboard
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Placement Reports" />
          <Tab label="Company Reports" />
          <Tab label="Student Reports" />
          <Tab label="Custom Reports" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <PlacementReports />}
        {activeTab === 1 && <CompanyReports />}
        {activeTab === 2 && <StudentReports />}
        {activeTab === 3 && <CustomReports />}
      </Box>
    </Box>
  );
};

export default Reports; 