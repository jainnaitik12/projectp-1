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
  Chip,
  Autocomplete
} from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';
import { useState } from 'react';

const NotificationComposer = () => {
  const [formData, setFormData] = useState({
    type: '',
    priority: '',
    recipients: [],
    subject: '',
    message: '',
    attachments: []
  });

  const notificationTypes = ['Alert', 'Email', 'SMS'];
  const priorities = ['High', 'Medium', 'Low'];
  
  const recipientGroups = [
    'All Students',
    'Placed Students',
    'Unplaced Students',
    'CSE Department',
    'IT Department',
    'ECE Department'
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Handle notification submission
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Compose Notification
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Notification Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Notification Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {notificationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={recipientGroups}
                value={formData.recipients}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, recipients: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Recipients" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
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
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                startIcon={<AttachFile />}
                sx={{ mr: 2 }}
              >
                Attach Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              {formData.attachments.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => {
                    const newAttachments = formData.attachments.filter((_, i) => i !== index);
                    setFormData({ ...formData, attachments: newAttachments });
                  }}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined">
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Send />}
                >
                  Send Notification
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationComposer; 