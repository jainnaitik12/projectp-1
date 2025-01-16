import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Box,
  } from '@mui/material';
  
  export const RecentApplications = ({ applications }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'selected':
          return 'success';
        case 'rejected':
          return 'error';
        case 'pending':
          return 'warning';
        default:
          return 'default';
      }
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Applications
          </Typography>
          <List>
            {applications.map((application) => (
              <ListItem key={application.id}>
                <ListItemAvatar>
                  <Avatar>{application.studentName[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={application.studentName}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {application.branch} - {application.rollNo}
                      </Typography>
                      <br />
                      Applied for: {application.position}
                    </>
                  }
                />
                <Box>
                  <Chip
                    label={application.status}
                    color={getStatusColor(application.status)}
                    size="small"
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };