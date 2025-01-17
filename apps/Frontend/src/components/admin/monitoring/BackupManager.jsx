
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
  } from '@mui/material';
  import {
    Backup,
    Restore,
    Download,
    Delete,
    Schedule,
    Settings
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const BackupManager = ({ backups, onAction }) => {
    const [backupDialog, setBackupDialog] = useState(false);
    const [scheduleDialog, setScheduleDialog] = useState(false);
    const [selectedBackup, setSelectedBackup] = useState(null);
  
    const BackupProgress = ({ progress, status }) => (
      <Box sx={{ width: '100%', mt: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">{status}</Typography>
          <Typography variant="body2">{progress}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  
    return (
      <>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Backup Management</Typography>
              <Box display="flex" gap={1}>
                <Button
                  startIcon={<Schedule />}
                  onClick={() => setScheduleDialog(true)}
                >
                  Schedule
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Backup />}
                  onClick={() => setBackupDialog(true)}
                >
                  Create Backup
                </Button>
              </Box>
            </Box>
  
            <Grid container spacing={3}>
              {/* Backup Status */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Latest Backup
                    </Typography>
                    <Typography variant="h5">
                      {backups[0]?.timestamp || 'No backups'}
                    </Typography>
                    <Typography color="textSecondary">
                      Size: {backups[0]?.size || '0'} MB
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
  
              {/* Storage Usage */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Storage Usage
                    </Typography>
                    <Typography variant="h5">
                      {backups.reduce((acc, curr) => acc + curr.size, 0)} MB
                    </Typography>
                    <BackupProgress progress={70} status="Storage Space" />
                  </CardContent>
                </Card>
              </Grid>
  
              {/* Backup Schedule */}
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Next Scheduled Backup
                    </Typography>
                    <Typography variant="h5">
                      Tomorrow, 02:00 AM
                    </Typography>
                    <Button
                      startIcon={<Settings />}
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => setScheduleDialog(true)}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
  
            {/* Backup List */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Backup History
              </Typography>
              <List>
                {backups.map((backup) => (
                  <ListItem key={backup.id}>
                    <ListItemText
                      primary={backup.timestamp}
                      secondary={`Size: ${backup.size} MB | Type: ${backup.type}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => onAction('download', backup)}
                      >
                        <Download />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => onAction('restore', backup)}
                      >
                        <Restore />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => onAction('delete', backup)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
  
        {/* Create Backup Dialog */}
        <Dialog
          open={backupDialog}
          onClose={() => setBackupDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Backup</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Backup Type</InputLabel>
              <Select>
                <MenuItem value="full">Full Backup</MenuItem>
                <MenuItem value="incremental">Incremental Backup</MenuItem>
                <MenuItem value="differential">Differential Backup</MenuItem>
              </Select>
            </FormControl>
            <Alert severity="info" sx={{ mt: 2 }}>
              Full backup may take several minutes to complete
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBackupDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onAction('create');
                setBackupDialog(false);
              }}
            >
              Start Backup
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Schedule Dialog */}
        <Dialog
          open={scheduleDialog}
          onClose={() => setScheduleDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Schedule Backups</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Frequency</InputLabel>
              <Select>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setScheduleDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onAction('schedule');
                setScheduleDialog(false);
              }}
            >
              Save Schedule
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };