import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  Divider,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../../../hooks/admin/useLayout';
import { useAuth } from '../../../hooks/useAuth';
import { useTheme as useAppTheme } from '../../../contexts/admin/AdminThemeContext';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleSidebar, pageTitle } = useLayout();
  const { user, logout } = useAuth();
  const { theme: appTheme, toggleTheme } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Placement Drive',
      message: 'Google placement drive registration open',
      timestamp: '2024-03-21 10:00 AM',
      read: false
    },
    {
      id: 2,
      title: 'Interview Schedule',
      message: 'Microsoft interviews scheduled for tomorrow',
      timestamp: '2024-03-20 11:30 AM',
      read: false
    }
    // Add more notifications as needed
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/admin/profile');
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleViewAll = () => {
    navigate('/admin/notifications');
    handleNotificationClose();
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {appTheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={handleNotificationClick}
            size="large"
            aria-label={`${unreadCount} notifications`}
            aria-controls={Boolean(anchorEl) ? 'notification-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: 1 }}
          >
            {user?.avatar ? (
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
        onClick={handleNotificationClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 480 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
          role: 'menu'
        }}
      >
        <Box sx={{ p: 2 }} role="presentation">
          <Typography variant="h6">Notifications</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            You have {unreadCount} unread notifications
          </Typography>
        </Box>
        
        <Divider />

        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            onClick={() => handleNotificationRead(notification.id)}
            sx={{
              py: 1.5,
              px: 2,
              ...(notification.read && {
                bgcolor: 'action.hover'
              })
            }}
            role="menuitem"
          >
            <Box>
              <Typography variant="subtitle2">
                {notification.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.timestamp}
              </Typography>
            </Box>
          </MenuItem>
        ))}

        <Divider />
        
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }} role="presentation">
          <Button 
            onClick={handleViewAll}
            aria-label="View all notifications"
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Header; 