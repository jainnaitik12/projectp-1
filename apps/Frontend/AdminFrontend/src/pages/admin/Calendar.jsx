import { useState } from 'react';
import { Grid, Paper, Box, Tabs, Tab } from '@mui/material';
import CalendarView from '../../components/admin/calendar/CalendarView';
import EventScheduler from '../../components/admin/calendar/EventScheduler';
import UpcomingEvents from '../../components/admin/calendar/UpcomingEvents';
import EventDetails from '../../components/admin/calendar/EventDetails';

const Calendar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Grid container spacing={3}>
      {/* Calendar Tabs */}
      <Grid item xs={12}>
        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Calendar View" />
              <Tab label="Schedule Event" />
            </Tabs>
          </Box>
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, height: '70vh' }}>
          {selectedTab === 0 ? (
            <CalendarView onEventClick={handleEventClick} />
          ) : (
            <EventScheduler />
          )}
        </Paper>
      </Grid>

      {/* Sidebar */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              {selectedEvent ? (
                <EventDetails event={selectedEvent} />
              ) : (
                <UpcomingEvents onEventClick={handleEventClick} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calendar; 