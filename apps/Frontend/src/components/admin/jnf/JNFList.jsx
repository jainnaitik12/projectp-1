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
  Visibility,
  Edit,
  Delete,
  Business,
  Share
} from '@mui/icons-material';
import { useState } from 'react';

const JNFList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJNF, setSelectedJNF] = useState(null);

  const jnfs = [
    {
      id: 1,
      companyName: 'Google',
      jobTitle: 'Software Engineer',
      positions: 5,
      ctc: '25 LPA',
      status: 'active',
      lastDate: '2024-03-30',
      applicants: 150
    },
    // Add more JNFs...
  ];

  const handleMenuOpen = (event, jnf) => {
    setAnchorEl(event.currentTarget);
    setSelectedJNF(jnf);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJNF(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'closed':
        return 'error';
      case 'draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Job Notification Forms</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search JNFs..."
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
              <TableCell>Job Title</TableCell>
              <TableCell>Positions</TableCell>
              <TableCell>CTC</TableCell>
              <TableCell>Last Date</TableCell>
              <TableCell>Applicants</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jnfs.map((jnf) => (
              <TableRow key={jnf.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <Business />
                    </Avatar>
                    {jnf.companyName}
                  </Box>
                </TableCell>
                <TableCell>{jnf.jobTitle}</TableCell>
                <TableCell>{jnf.positions}</TableCell>
                <TableCell>{jnf.ctc}</TableCell>
                <TableCell>{new Date(jnf.lastDate).toLocaleDateString()}</TableCell>
                <TableCell>{jnf.applicants}</TableCell>
                <TableCell>
                  <Chip
                    label={jnf.status}
                    color={getStatusColor(jnf.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, jnf)}
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
              <Share fontSize="small" />
            </ListItemIcon>
            Share
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Delete</Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default JNFList;