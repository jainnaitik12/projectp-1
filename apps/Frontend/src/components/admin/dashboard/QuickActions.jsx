import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
  } from '@mui/material';
  import {
    Add,
    Upload,
    Download,
    Email,
  } from '@mui/icons-material';
  
  export const QuickActions = ({ onAction }) => {
    const actions = [
      {
        title: 'Add New JNF',
        icon: <Add />,
        action: 'addJNF',
        color: '#1976d2',
      },
      {
        title: 'Upload Student Data',
        icon: <Upload />,
        action: 'uploadData',
        color: '#2e7d32',
      },
      {
        title: 'Download Reports',
        icon: <Download />,
        action: 'downloadReports',
        color: '#ed6c02',
      },
      {
        title: 'Send Notifications',
        icon: <Email />,
        action: 'sendNotifications',
        color: '#9c27b0',
      },
    ];
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {actions.map((action) => (
              <Grid item xs={12} sm={6} md={3} key={action.action}>
                <Button
                  variant="outlined"
                  startIcon={action.icon}
                  onClick={() => onAction(action.action)}
                  fullWidth
                  sx={{
                    borderColor: action.color,
                    color: action.color,
                    '&:hover': {
                      borderColor: action.color,
                      backgroundColor: `${action.color}10`,
                    },
                  }}
                >
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };