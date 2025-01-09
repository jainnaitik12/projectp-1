import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Backup,
  Restore,
  Download,
  Delete,
  Schedule,
  CloudUpload,
  CloudDownload
} from '@mui/icons-material';
import { useState } from 'react';

const BackupSettings = () => {
  const [settings, setSettings] = useState({
    autoBackup: true,
    frequency: 'daily',
    time: '00:00',
    retentionPeriod: 30,
    storageType: 'local',
    compressionEnabled: true,
    encryptionEnabled: true,
    includeFiles: true,
    includeDatabase: true,
    includeSettings: true,
    cloudSettings: {
      provider: 'aws',
      bucket: 'my-backup-bucket',
      region: 'us-east-1',
      accessKey: '',
      secretKey: ''
    }
  });

  const [backups, setBackups] = useState([
    {
      id: 1,
      timestamp: '2024-03-15T10:30:00',
      size: '256 MB',
      type: 'auto',
      status: 'completed',
      location: 'local'
    },
    {
      id: 2,
      timestamp: '2024-03-14T10:30:00',
      size: '255 MB',
      type: 'manual',
      status: 'completed',
      location: 'cloud'
    }
    // Add more backup entries...
  ]);

  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
  };

  const handleCloudSettingsChange = (field) => (event) => {
    setSettings({
      ...settings,
      cloudSettings: {
        ...settings.cloudSettings,
        [field]: event.target.value
      }
    });
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
      // Add new backup to list
      const newBackup = {
        id: backups.length + 1,
        timestamp: new Date().toISOString(),
        size: '257 MB',
        type: 'manual',
        status: 'completed',
        location: settings.storageType
      };
      setBackups([newBackup, ...backups]);
    }, 3000);
  };

  return (
    <Grid container spacing={3}>
      {/* Backup Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Backup Configuration
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoBackup}
                      onChange={handleChange('autoBackup')}
                    />
                  }
                  label="Enable Automatic Backup"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Backup Frequency</InputLabel>
                  <Select
                    value={settings.frequency}
                    label="Backup Frequency"
                    onChange={handleChange('frequency')}
                  >
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Backup Time"
                  value={settings.time}
                  onChange={handleChange('time')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Retention Period (days)"
                  value={settings.retentionPeriod}
                  onChange={handleChange('retentionPeriod')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Storage Type</InputLabel>
                  <Select
                    value={settings.storageType}
                    label="Storage Type"
                    onChange={handleChange('storageType')}
                  >
                    <MenuItem value="local">Local Storage</MenuItem>
                    <MenuItem value="cloud">Cloud Storage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.compressionEnabled}
                      onChange={handleChange('compressionEnabled')}
                    />
                  }
                  label="Enable Compression"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.encryptionEnabled}
                      onChange={handleChange('encryptionEnabled')}
                    />
                  }
                  label="Enable Encryption"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Cloud Storage Settings */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cloud Storage Configuration
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Cloud Provider</InputLabel>
                  <Select
                    value={settings.cloudSettings.provider}
                    label="Cloud Provider"
                    onChange={handleCloudSettingsChange('provider')}
                  >
                    <MenuItem value="aws">Amazon S3</MenuItem>
                    <MenuItem value="gcp">Google Cloud Storage</MenuItem>
                    <MenuItem value="azure">Azure Blob Storage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bucket Name"
                  value={settings.cloudSettings.bucket}
                  onChange={handleCloudSettingsChange('bucket')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Region"
                  value={settings.cloudSettings.region}
                  onChange={handleCloudSettingsChange('region')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Access Key"
                  value={settings.cloudSettings.accessKey}
                  onChange={handleCloudSettingsChange('accessKey')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Secret Key"
                  value={settings.cloudSettings.secretKey}
                  onChange={handleCloudSettingsChange('secretKey')}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Backup History */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Backup History
              </Typography>
              <Button
                variant="contained"
                startIcon={<Backup />}
                onClick={handleBackupNow}
                disabled={isBackingUp}
              >
                Backup Now
              </Button>
            </Box>

            {isBackingUp && (
              <Box mb={3}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Backup in progress...
                </Typography>
                <LinearProgress />
              </Box>
            )}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>
                      {new Date(backup.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={backup.type}
                        color={backup.type === 'auto' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={backup.status}
                        color={backup.status === 'completed' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      {backup.location === 'cloud' ? (
                        <CloudUpload color="primary" />
                      ) : (
                        <Schedule color="secondary" />
                      )}
                      {' '}
                      {backup.location}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" title="Download">
                        <Download />
                      </IconButton>
                      <IconButton size="small" title="Restore">
                        <Restore />
                      </IconButton>
                      <IconButton size="small" title="Delete" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BackupSettings; 