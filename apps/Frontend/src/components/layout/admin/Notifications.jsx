import { useState } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const notifications = [
  {
    id: 1,
    type: 'jnf',
    title: 'New JNF Received',
    description: 'Google has submitted a new Job Notification Form',
    time: '5 mins ago',
    icon: <DescriptionIcon />,
    color: '#1976d2',
  },
  {
    id: 2,
    type: 'company',
    title: 'Company Registration',
    description: 'Microsoft completed their registration',
    time: '2 hours ago',
    icon: <BusinessIcon />,
    color: '#2e7d32',
  },
  {
    id: 3,
    type: 'student',
    title: 'Student Updates',
    description: '15 new students completed their profiles',
    time: '1 day ago',
    icon: <PersonIcon />,
    color: '#ed6c02',
  },
];

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? 'notifications-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
            overflow: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <ListItem alignItems="flex-start" disablePadding>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: notification.color }}>
                    {notification.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.description}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block' }}
                      >
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </MenuItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            component="button"
            variant="button"
            sx={{
              color: 'primary.main',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={handleClose}
          >
            View All Notifications
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default Notifications; 