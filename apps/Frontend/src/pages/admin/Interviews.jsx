import { useState } from 'react';
import { Grid, Box, Tabs, Tab, Paper } from '@mui/material';
import InterviewCalendar from '../../components/admin/interviews/InterviewCalendar';
import InterviewScheduler from '../../components/admin/interviews/InterviewScheduler';
import InterviewList from '../../components/admin/interviews/InterviewList';
import InterviewFeedback from '../../components/admin/interviews/InterviewFeedback';

const Interviews = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Calendar View" />
          <Tab label="Schedule Interview" />
          <Tab label="Interview List" />
          <Tab label="Feedback" />
        </Tabs>
      </Paper>

      {activeTab === 0 && <InterviewCalendar />}
      {activeTab === 1 && <InterviewScheduler />}
      {activeTab === 2 && <InterviewList />}
      {activeTab === 3 && <InterviewFeedback />}
    </Box>
  );
};

export default Interviews; 