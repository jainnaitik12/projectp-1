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
import { Save } from '@mui/icons-material';
import { useState } from 'react';
import { useAudit } from '../../../hooks/admin/useAudit';

const GeneralSettings = () => {
  const { logEvent } = useAudit();
  const [settings, setSettings] = useState({
    instituteName: 'ABC Institute of Technology',
    address: '123 College Road, City',
    contactEmail: 'info@abcinstitute.edu',
    contactPhone: '+1234567890',
    website: 'www.abcinstitute.edu',
    academicYear: '2023-24',
    timezone: 'UTC+5:30',
    dateFormat: 'DD/MM/YYYY',
    language: 'en',
    enableNotifications: true,
    enableEmails: true,
    enableSMS: false,
    maintenanceMode: false
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Handle save logic
  };

  const handleSettingChange = async (setting, value) => {
    try {
      await updateSetting(setting, value);
      logEvent('update', 'Settings', `Updated ${setting} to ${value}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Institute Information */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Institute Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Institute Name"
                  value={settings.instituteName}
                  onChange={handleChange('instituteName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={settings.website}
                  onChange={handleChange('website')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  value={settings.address}
                  onChange={handleChange('address')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  value={settings.contactEmail}
                  onChange={handleChange('contactEmail')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={settings.contactPhone}
                  onChange={handleChange('contactPhone')}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* System Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Academic Year</InputLabel>
                  <Select
                    value={settings.academicYear}
                    label="Academic Year"
                    onChange={handleChange('academicYear')}
                  >
                    <MenuItem value="2023-24">2023-24</MenuItem>
                    <MenuItem value="2024-25">2024-25</MenuItem>
                    <MenuItem value="2025-26">2025-26</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={settings.timezone}
                    label="Timezone"
                    onChange={handleChange('timezone')}
                  >
                    <MenuItem value="UTC+5:30">IST (UTC+5:30)</MenuItem>
                    <MenuItem value="UTC+0">UTC</MenuItem>
                    <MenuItem value="UTC-5">EST (UTC-5)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={settings.dateFormat}
                    label="Date Format"
                    onChange={handleChange('dateFormat')}
                  >
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    label="Language"
                    onChange={handleChange('language')}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Notification Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={handleChange('enableNotifications')}
                  />
                }
                label="Enable In-App Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableEmails}
                    onChange={handleChange('enableEmails')}
                  />
                }
                label="Enable Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableSMS}
                    onChange={handleChange('enableSMS')}
                  />
                }
                label="Enable SMS Notifications"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Maintenance
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={handleChange('maintenanceMode')}
                />
              }
              label="Enable Maintenance Mode"
            />
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

export default GeneralSettings; 