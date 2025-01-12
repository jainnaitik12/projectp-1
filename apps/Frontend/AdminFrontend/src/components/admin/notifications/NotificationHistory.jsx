import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Search,
  FilterList,
  Notifications,
  Email,
  Message
} from '@mui/icons-material';
import { useState } from 'react';

const NotificationHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'alert',
      subject: 'Placement Drive Announcement',
      recipients: 'All Students',
      sentAt: '2024-03-15T10:30:00',
      status: 'delivered',
      readRate: '85%'
    },
    // Add more notifications...
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'failed':
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Notification History</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Sent At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Read Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getNotificationIcon(notification.type)}
                    {notification.type}
                  </Box>
                </TableCell>
                <TableCell>{notification.subject}</TableCell>
                <TableCell>{notification.recipients}</TableCell>
                <TableCell>
                  {new Date(notification.sentAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={notification.status}
                    color={getStatusColor(notification.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{notification.readRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NotificationHistory; 