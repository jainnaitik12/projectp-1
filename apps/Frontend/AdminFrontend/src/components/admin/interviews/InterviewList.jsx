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
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Business
} from '@mui/icons-material';
import { useState } from 'react';

const InterviewList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const interviews = [
    {
      id: 1,
      company: 'Google',
      type: 'Technical',
      date: '2024-03-15T10:00:00',
      location: 'Main Campus',
      status: 'scheduled',
      students: 25
    },
    // Add more interviews...
  ];

  const handleMenuOpen = (event, interview) => {
    setAnchorEl(event.currentTarget);
    setSelectedInterview(interview);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInterview(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Interview List</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search interviews..."
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
              <TableCell>Company</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Business />
                    </Avatar>
                    {interview.company}
                  </Box>
                </TableCell>
                <TableCell>{interview.type}</TableCell>
                <TableCell>
                  {new Date(interview.date).toLocaleString()}
                </TableCell>
                <TableCell>{interview.location}</TableCell>
                <TableCell>{interview.students}</TableCell>
                <TableCell>
                  <Chip
                    label={interview.status}
                    color={getStatusColor(interview.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, interview)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Cancel</Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default InterviewList; 