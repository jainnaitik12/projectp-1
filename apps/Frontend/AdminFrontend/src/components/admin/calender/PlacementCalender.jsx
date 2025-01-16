import {
    Card,
    CardContent,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
  } from '@mui/material';
  import {
    Event,
    Business,
    Group,
    Assessment
  } from '@mui/icons-material';
  import { Calendar, momentLocalizer } from 'react-big-calendar';
  import moment from 'moment';
  
  const localizer = momentLocalizer(moment);
  
  export const PlacementCalendar = ({ events }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Placement Calendar
          </Typography>
          <Box sx={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };