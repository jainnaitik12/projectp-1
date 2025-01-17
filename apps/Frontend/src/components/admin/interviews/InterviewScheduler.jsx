import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

const InterviewScheduler = () => {
  const [formData, setFormData] = useState({
    company: null,
    interviewType: '',
    date: null,
    duration: '',
    location: '',
    rounds: [],
    requirements: [],
    description: '',
    selectedStudents: []
  });

  const companies = [
    { id: 1, name: 'Google' },
    { id: 2, name: 'Microsoft' },
    { id: 3, name: 'Amazon' }
  ];

  const students = [
    { id: 1, name: 'John Doe', branch: 'CSE' },
    { id: 2, name: 'Jane Smith', branch: 'IT' },
    // Add more students...
  ];

  const interviewTypes = ['Technical', 'HR', 'Group Discussion', 'Aptitude Test'];
  const roundTypes = ['Technical', 'HR', 'Coding', 'Machine Coding', 'System Design'];
  const requirementsList = ['Projector', 'Labs', 'Conference Room', 'Interview Rooms', 'Whiteboard'];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Schedule New Interview
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={companies}
                getOptionLabel={(option) => option.name}
                value={formData.company}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, company: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Company" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Interview Type</InputLabel>
                <Select
                  value={formData.interviewType}
                  label="Interview Type"
                  onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                >
                  {interviewTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Interview Date & Time"
                  value={formData.date}
                  onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration (in hours)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={roundTypes}
                value={formData.rounds}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, rounds: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Interview Rounds" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={requirementsList}
                value={formData.requirements}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, requirements: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Requirements" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="secondary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={students}
                getOptionLabel={(option) => `${option.name} (${option.branch})`}
                value={formData.selectedStudents}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, selectedStudents: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Students" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={`${option.name} (${option.branch})`}
                      {...getTagProps({ index })}
                      color="primary"
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Information"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Schedule Interview
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InterviewScheduler; 