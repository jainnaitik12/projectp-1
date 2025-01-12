import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Chip
} from '@mui/material';
import { Event, Business, School, Group } from '@mui/icons-material';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Google Campus Drive',
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'drive',
      company: 'Google',
      location: 'Main Auditorium'
    },
    {
      id: 2,
      title: 'Microsoft Pre-placement Talk',
      date: '2024-03-18',
      time: '2:00 PM',
      type: 'presentation',
      company: 'Microsoft',
      location: 'Seminar Hall'
    },
    {
      id: 3,
      title: 'Resume Building Workshop',
      date: '2024-03-20',
      time: '11:00 AM',
      type: 'workshop',
      location: 'Training Center'
    },
    {
      id: 4,
      title: 'Amazon Technical Test',
      date: '2024-03-22',
      time: '9:00 AM',
      type: 'test',
      company: 'Amazon',
      location: 'Computer Labs'
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'drive':
        return <Business />;
      case 'presentation':
        return <School />;
      case 'workshop':
        return <Group />;
      default:
        return <Event />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'drive':
        return '#1976d2';
      case 'presentation':
        return '#2e7d32';
      case 'workshop':
        return '#ed6c02';
      default:
        return '#9c27b0';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        <List>
          {events.map((event) => (
            <ListItem key={event.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getEventColor(event.type) }}>
                  {getEventIcon(event.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={event.title}
                secondary={
                  <>
                    <Typography component="span" variant="caption" display="block" color="textSecondary">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </Typography>
                    <Typography component="span" variant="caption" display="block" color="textSecondary">
                      {event.location}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={event.type}
                size="small"
                sx={{
                  backgroundColor: `${getEventColor(event.type)}22`,
                  color: getEventColor(event.type),
                  textTransform: 'capitalize'
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;

