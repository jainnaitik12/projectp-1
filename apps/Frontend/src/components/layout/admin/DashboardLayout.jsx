import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Assessment,
  Business,
  Event,
  CalendarMonth,
  Poll,
  Description,
  ExpandLess,
  ExpandMore,
  Assignment,
  Group,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Companies', icon: <Business />, path: '/companies' },
  { text: 'Events', icon: <Event />, path: '/events' },
  { text: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
  { text: 'Surveys', icon: <Poll />, path: '/surveys' },
  { text: 'Documents', icon: <Description />, path: '/documents' },
  { text: 'Students', icon: <Group />, path: '/students' },
];

// Reports submenu items
const reportItems = [
  { text: 'Placement Reports', path: '/reports/placements' },
  { text: 'Company Reports', path: '/reports/companies' },
  { text: 'Student Reports', path: '/reports/students' },
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Placement Cell Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}

            {/* Reports Section with Submenu */}
            <ListItem button onClick={handleReportsClick}>
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {reportsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {reportItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    sx={{ pl: 4 }}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
} 