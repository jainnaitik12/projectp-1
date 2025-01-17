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
  Divider,
  Slider
} from '@mui/material';
import { Save, Security } from '@mui/icons-material';
import { useState } from 'react';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    },
    loginSecurity: {
      maxAttempts: 5,
      lockoutDuration: 30,
      requireCaptcha: true,
      enable2FA: true,
      rememberMe: true
    },
    sessionSecurity: {
      sessionTimeout: 30,
      maxConcurrentSessions: 2,
      enforceIPBinding: true,
      trackDevices: true
    }
  });

  const handlePasswordPolicyChange = (field) => (event) => {
    setSettings({
      ...settings,
      passwordPolicy: {
        ...settings.passwordPolicy,
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }
    });
  };

  const handleLoginSecurityChange = (field) => (event) => {
    setSettings({
      ...settings,
      loginSecurity: {
        ...settings.loginSecurity,
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }
    });
  };

  const handleSessionSecurityChange = (field) => (event) => {
    setSettings({
      ...settings,
      sessionSecurity: {
        ...settings.sessionSecurity,
        [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }
    });
  };

  const handleSave = () => {
    console.log('Saving security settings:', settings);
    // Handle save logic
  };

  return (
    <Grid container spacing={3}>
      {/* Password Policy */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Password Policy
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Minimum Password Length: {settings.passwordPolicy.minLength}
                </Typography>
                <Slider
                  value={settings.passwordPolicy.minLength}
                  onChange={(e, newValue) => {
                    setSettings({
                      ...settings,
                      passwordPolicy: {
                        ...settings.passwordPolicy,
                        minLength: newValue
                      }
                    });
                  }}
                  min={6}
                  max={16}
                  marks
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordPolicy.requireUppercase}
                      onChange={handlePasswordPolicyChange('requireUppercase')}
                    />
                  }
                  label="Require Uppercase Letters"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordPolicy.requireLowercase}
                      onChange={handlePasswordPolicyChange('requireLowercase')}
                    />
                  }
                  label="Require Lowercase Letters"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordPolicy.requireNumbers}
                      onChange={handlePasswordPolicyChange('requireNumbers')}
                    />
                  }
                  label="Require Numbers"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.passwordPolicy.requireSpecialChars}
                      onChange={handlePasswordPolicyChange('requireSpecialChars')}
                    />
                  }
                  label="Require Special Characters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Password Expiry (days)"
                  value={settings.passwordPolicy.expiryDays}
                  onChange={handlePasswordPolicyChange('expiryDays')}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Login Security */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Login Security
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum Login Attempts"
                  value={settings.loginSecurity.maxAttempts}
                  onChange={handleLoginSecurityChange('maxAttempts')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Account Lockout Duration (minutes)"
                  value={settings.loginSecurity.lockoutDuration}
                  onChange={handleLoginSecurityChange('lockoutDuration')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loginSecurity.requireCaptcha}
                      onChange={handleLoginSecurityChange('requireCaptcha')}
                    />
                  }
                  label="Require CAPTCHA"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loginSecurity.enable2FA}
                      onChange={handleLoginSecurityChange('enable2FA')}
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.loginSecurity.rememberMe}
                      onChange={handleLoginSecurityChange('rememberMe')}
                    />
                  }
                  label="Allow Remember Me"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Session Security */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Session Security
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Session Timeout (minutes)"
                  value={settings.sessionSecurity.sessionTimeout}
                  onChange={handleSessionSecurityChange('sessionTimeout')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum Concurrent Sessions"
                  value={settings.sessionSecurity.maxConcurrentSessions}
                  onChange={handleSessionSecurityChange('maxConcurrentSessions')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.sessionSecurity.enforceIPBinding}
                      onChange={handleSessionSecurityChange('enforceIPBinding')}
                    />
                  }
                  label="Enforce IP Binding"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.sessionSecurity.trackDevices}
                      onChange={handleSessionSecurityChange('trackDevices')}
                    />
                  }
                  label="Track User Devices"
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

export default SecuritySettings; 