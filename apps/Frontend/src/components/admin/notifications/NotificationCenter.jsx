// components/admin/notifications/NotificationCenter.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Badge,
  Divider
} from '@mui/material';
import {
  Notifications,
  Email,
  Message,
  MoreVert,
  Delete,
  Archive,
  Flag,
  CheckCircle
} from '@mui/icons-material';
import { useState } from 'react';

const NotificationCenter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'New Company Registration',
      message: 'Google has registered for campus placements',
      timestamp: '2024-03-15T10:30:00',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 2,
      type: 'email',
      title: 'Interview Schedule Update',
      message: 'Microsoft technical interviews rescheduled to next week',
      timestamp: '2024-03-15T09:15:00',
      status: 'read',
      priority: 'medium'
    },
    // Add more notifications...
  ];

  const notificationStats = [
    {
      type: 'Alerts',
      count: 15,
      icon: <Notifications />,
      color: '#1976d2'
    },
    {
      type: 'Emails',
      count: 28,
      icon: <Email />,
      color: '#2e7d32'
    },
    {
      type: 'Messages',
      count: 42,
      icon: <Message />,
      color: '#ed6c02'
    }
  ];

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <Notifications color="primary" />;
      case 'email':
        return <Email color="success" />;
      case 'message':
        return <Message color="warning" />;
      default:
        return <Notifications />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Notification Stats */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {notificationStats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.type}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: stat.color }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {stat.count}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {stat.type}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Notifications List */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>

            {notifications.map((notification) => (
              <Box key={notification.id} mb={2}>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Badge
                    color="error"
                    variant="dot"
                    invisible={notification.status === 'read'}
                  >
                    {getNotificationIcon(notification.type)}
                  </Badge>
                  <Box flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="subtitle1">
                        {notification.title}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={notification.priority}
                          size="small"
                          color={getPriorityColor(notification.priority)}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, notification)}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(notification.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <CheckCircle fontSize="small" />
          </ListItemIcon>
          Mark as Read
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Flag fontSize="small" />
          </ListItemIcon>
          Flag Important
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Archive fontSize="small" />
          </ListItemIcon>
          Archive
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default NotificationCenter;