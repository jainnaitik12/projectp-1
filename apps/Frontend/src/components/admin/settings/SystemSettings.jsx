import {
    Card,
    CardContent,
    Typography,
    Grid,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Divider,
  } from '@mui/material';
  import { Save } from '@mui/icons-material';
  
  export const SystemSettings = ({ settings, onSave }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Settings
          </Typography>
  
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                General Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onChange={(e) => onSave({ enableEmailNotifications: e.target.checked })}
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>
  
            <Grid item xs={12}>
              <Divider />
            </Grid>
  
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Placement Settings
              </Typography>
              <TextField
                fullWidth
                label="Maximum Applications per Student"
                type="number"
                value={settings.maxApplications}
                onChange={(e) => onSave({ maxApplications: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Minimum CGPA Requirement"
                type="number"
                value={settings.minCGPA}
                onChange={(e) => onSave({ minCGPA: e.target.value })}
              />
            </Grid>
  
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => onSave(settings)}
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  
 