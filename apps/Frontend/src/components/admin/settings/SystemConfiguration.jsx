import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Switch,
    FormControlLabel,
    Button,
    Box,
    Divider,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails
  } from '@mui/material';
  import {
    ExpandMore,
    Save,
    Refresh,
    Email,
    Storage,
    Security,
    Notifications
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const SystemConfiguration = ({ config, onSave }) => {
    const [settings, setSettings] = useState(config);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleChange = (section, key, value) => {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [key]: value
        }
      });
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">System Configuration</Typography>
            <Box display="flex" gap={1}>
              <Button
                startIcon={<Refresh />}
                onClick={() => setSettings(config)}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => onSave(settings)}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
  
          <Alert severity="info" sx={{ mb: 3 }}>
            Some changes may require system restart to take effect.
          </Alert>
  
          {/* Email Configuration */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Email />
                <Typography>Email Configuration</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Host"
                    value={settings.email.smtpHost}
                    onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SMTP Port"
                    value={settings.email.smtpPort}
                    onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={settings.email.username}
                    onChange={(e) => handleChange('email', 'username', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={settings.email.password}
                    onChange={(e) => handleChange('email', 'password', e.target.value)}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
  
          {/* Database Configuration */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Storage />
                <Typography>Database Configuration</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Database Host"
                    value={settings.database.host}
                    onChange={(e) => handleChange('database', 'host', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Database Name"
                    value={settings.database.name}
                    onChange={(e) => handleChange('database', 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.database.enableBackup}
                        onChange={(e) => handleChange('database', 'enableBackup', e.target.checked)}
                      />
                    }
                    label="Enable Automated Backups"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
  
          {/* Security Settings */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Security />
                <Typography>Security Settings</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password Policy"
                    multiline
                    rows={4}
                    value={settings.security.passwordPolicy}
                    onChange={(e) => handleChange('security', 'passwordPolicy', e.target.value)}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
  
          {/* Notification Settings */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Notifications />
                <Typography>Notification Settings</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                      />
                    }
                    label="Enable Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => handleChange('notifications', 'smsNotifications', e.target.checked)}
                      />
                    }
                    label="Enable SMS Notifications"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    );
  };