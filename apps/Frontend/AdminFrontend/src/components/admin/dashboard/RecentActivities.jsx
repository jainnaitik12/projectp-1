import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
import {
  Business,
  Person,
  Event,
  Description
} from '@mui/icons-material';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'company',
      title: 'Google scheduled campus drive',
      description: 'Campus drive scheduled for CSE and IT students',
      timestamp: '2 hours ago',
      icon: <Business />,
      color: '#1976d2'
    },
    {
      id: 2,
      type: 'placement',
      title: 'John Doe got placed at Microsoft',
      description: 'Package: 25 LPA',
      timestamp: '5 hours ago',
      icon: <Person />,
      color: '#2e7d32'
    },
    {
      id: 3,
      type: 'event',
      title: 'Pre-placement talk by Amazon',
      description: 'Scheduled for tomorrow at 10 AM',
      timestamp: '1 day ago',
      icon: <Event />,
      color: '#ed6c02'
    },
    {
      id: 4,
      type: 'document',
      title: 'New placement policy uploaded',
      description: 'Updated guidelines for 2024 batch',
      timestamp: '2 days ago',
      icon: <Description />,
      color: '#9c27b0'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: activity.color }}>
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.title}
                secondary={
                  <>
                    {activity.description}
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {activity.timestamp}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={activity.type}
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;