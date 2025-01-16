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
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import { useState } from 'react';

const EmailSettings = () => {
  const [settings, setSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'notifications@abcinstitute.edu',
    smtpPassword: '',
    senderName: 'ABC Institute Placements',
    senderEmail: 'placements@abcinstitute.edu',
    encryption: 'tls',
    authentication: true,
    enableQueue: true,
    retryAttempts: 3,
    batchSize: 50,
    defaultTemplate: 'default',
    footerText: 'This is an automated message from ABC Institute Placement Cell.'
  });

  const [testEmail, setTestEmail] = useState({
    recipient: '',
    subject: 'Test Email',
    message: 'This is a test email from the placement system.'
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  };

  const handleTestEmailChange = (field) => (event) => {
    setTestEmail({
      ...testEmail,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    console.log('Saving email settings:', settings);
    // Handle save logic
  };

  const handleSendTest = () => {
    console.log('Sending test email:', testEmail);
    // Handle test email sending
  };

  return (
    <Grid container spacing={3}>
      {/* SMTP Settings */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              SMTP Configuration
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Server"
                  value={settings.smtpServer}
                  onChange={handleChange('smtpServer')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Port"
                  value={settings.smtpPort}
                  onChange={handleChange('smtpPort')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Username"
                  value={settings.smtpUsername}
                  onChange={handleChange('smtpUsername')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="SMTP Password"
                  value={settings.smtpPassword}
                  onChange={handleChange('smtpPassword')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Encryption</InputLabel>
                  <Select
                    value={settings.encryption}
                    label="Encryption"
                    onChange={handleChange('encryption')}
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="ssl">SSL</MenuItem>
                    <MenuItem value="tls">TLS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.authentication}
                      onChange={handleChange('authentication')}
                    />
                  }
                  label="Require Authentication"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Test Email */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Send Test Email
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Recipient Email"
                  value={testEmail.recipient}
                  onChange={handleTestEmailChange('recipient')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={testEmail.subject}
                  onChange={handleTestEmailChange('subject')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  value={testEmail.message}
                  onChange={handleTestEmailChange('message')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleSendTest}
                >
                  Send Test Email
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Email Settings */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Email Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sender Name"
                  value={settings.senderName}
                  onChange={handleChange('senderName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sender Email"
                  value={settings.senderEmail}
                  onChange={handleChange('senderEmail')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Default Template</InputLabel>
                  <Select
                    value={settings.defaultTemplate}
                    label="Default Template"
                    onChange={handleChange('defaultTemplate')}
                  >
                    <MenuItem value="default">Default Template</MenuItem>
                    <MenuItem value="minimal">Minimal Template</MenuItem>
                    <MenuItem value="formal">Formal Template</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Footer Text"
                  value={settings.footerText}
                  onChange={handleChange('footerText')}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Queue Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableQueue}
                      onChange={handleChange('enableQueue')}
                    />
                  }
                  label="Enable Email Queue"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Retry Attempts"
                  value={settings.retryAttempts}
                  onChange={handleChange('retryAttempts')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Batch Size"
                  value={settings.batchSize}
                  onChange={handleChange('batchSize')}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Save Button */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmailSettings; 