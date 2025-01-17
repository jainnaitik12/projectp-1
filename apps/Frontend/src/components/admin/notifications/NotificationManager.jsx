import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Box,
    Chip,
    Divider,
    Menu,
    MenuItem
  } from '@mui/material';
  import {
    Notifications,
    MoreVert,
    Delete,
    Done,
    Schedule
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const NotificationManager = ({ notifications, onAction }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
  
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
          return <Notifications color="error" />;
        case 'scheduled':
          return <Schedule color="primary" />;
        default:
          return <Notifications color="action" />;
      }
    };
  
    const getStatusChip = (status) => {
      const statusConfig = {
        pending: { color: 'warning', label: 'Pending' },
        sent: { color: 'success', label: 'Sent' },
        scheduled: { color: 'info', label: 'Scheduled' },
        failed: { color: 'error', label: 'Failed' }
      };
  
      const config = statusConfig[status] || statusConfig.pending;
  
      return <Chip size="small" {...config} />;
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Notification Manager
            </Typography>
            <Button
              variant="contained"
              startIcon={<Notifications />}
              onClick={() => onAction('create')}
            >
              Create Notification
            </Button>
          </Box>
  
          <List>
            {notifications.map((notification) => (
              <Box key={notification.id}>
                <ListItem>
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="body2">
                          {notification.message}
                        </Typography>
                        <Box display="flex" gap={1}>
                          {getStatusChip(notification.status)}
                          <Typography variant="caption" color="textSecondary">
                            {notification.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => handleMenuOpen(e, notification)}
                    >
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
  
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              onAction('resend', selectedNotification);
              handleMenuClose();
            }}>
              <ListItemIcon>
                <Done fontSize="small" />
              </ListItemIcon>
              <ListItemText>Resend</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
              onAction('delete', selectedNotification);
              handleMenuClose();
            }}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>
    );
  };