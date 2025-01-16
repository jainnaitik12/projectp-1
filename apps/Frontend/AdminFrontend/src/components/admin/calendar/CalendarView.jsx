import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Paper } from '@mui/material';

const localizer = momentLocalizer(moment);

const CalendarView = ({ onEventClick }) => {
  const events = [
    {
      id: 1,
      title: 'Company A Interview',
      start: new Date(2024, 3, 15),
      end: new Date(2024, 3, 15),
      type: 'interview',
    },
    {
      id: 2,
      title: 'Pre-placement Talk',
      start: new Date(2024, 3, 20),
      end: new Date(2024, 3, 20),
      type: 'presentation',
    },
    // Add more events as needed
  ];

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#1976d2',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };

    if (event.type === 'interview') {
      style.backgroundColor = '#2e7d32';
    } else if (event.type === 'presentation') {
      style.backgroundColor = '#ed6c02';
    }

    return { style };
  };

  return (
    <Paper sx={{ height: '100%', p: 2 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onEventClick}
      />
    </Paper>
  );
};

export default CalendarView; 
 frontend/src/components/admin/students 