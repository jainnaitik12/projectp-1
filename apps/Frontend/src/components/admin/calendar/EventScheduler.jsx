import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const EventScheduler = () => {
  const [eventData, setEventData] = useState({
    title: '',
    type: '',
    start: null,
    end: null,
    description: '',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic here
    console.log('Event Data:', eventData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Schedule New Event
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event Title"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Event Type</InputLabel>
            <Select
              value={eventData.type}
              label="Event Type"
              onChange={(e) => setEventData({ ...eventData, type: e.target.value })}
              required
            >
              <MenuItem value="interview">Interview</MenuItem>
              <MenuItem value="presentation">Pre-placement Talk</MenuItem>
              <MenuItem value="workshop">Workshop</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Start Date & Time"
              value={eventData.start}
              onChange={(newValue) => setEventData({ ...eventData, start: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="End Date & Time"
              value={eventData.end}
              onChange={(newValue) => setEventData({ ...eventData, end: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={eventData.description}
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Schedule Event
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventScheduler; 