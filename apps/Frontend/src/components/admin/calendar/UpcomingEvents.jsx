import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip
} from '@mui/material';
import { Event, Business, School } from '@mui/icons-material';
import moment from 'moment';

const UpcomingEvents = ({ onEventClick }) => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Google Interview',
      type: 'interview',
      company: 'Google',
      start: new Date(2024, 3, 15, 10, 0),
      location: 'Main Campus'
    },
    {
      id: 2,
      title: 'Microsoft Pre-placement Talk',
      type: 'presentation',
      company: 'Microsoft',
      start: new Date(2024, 3, 20, 14, 0),
      location: 'Virtual'
    },
    // Add more events as needed
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'interview':
        return <Business color="primary" />;
      case 'presentation':
        return <School color="secondary" />;
      default:
        return <Event />;
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        {upcomingEvents.map((event) => (
          <ListItem
            key={event.id}
            button
            onClick={() => onEventClick(event)}
            sx={{ mb: 1 }}
          >
            <ListItemIcon>
              {getEventIcon(event.type)}
            </ListItemIcon>
            <ListItemText
              primary={event.title}
              secondary={
                <>
                  {moment(event.start).format('MMM DD, YYYY h:mm A')}
                  <br />
                  {event.location}
                </>
              }
            />
            <Chip
              label={event.type}
              size="small"
              color={event.type === 'interview' ? 'primary' : 'secondary'}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UpcomingEvents; 