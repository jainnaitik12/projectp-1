import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  TextField,
  IconButton,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Circle as CircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const dummyJNFs = [
  {
    _id: "JNF001",
    companyDetails: {
      name: "Tech Corp",
      domain: "IT"
    },
    jobProfiles: [{
      designation: "Software Engineer",
      ctc: 1500000,
      placeOfPosting: "Bangalore"
    }],
    status: "active",
    analytics: {
      applications: 45,
      shortlisted: 15,
      selected: 5
    },
    createdAt: "2024-01-15T10:00:00.000Z",
    applicationDeadline: "2024-02-15T00:00:00.000Z"
  },
  {
    _id: "JNF002",
    companyDetails: {
      name: "Tech Corp",
      domain: "IT"
    },
    jobProfiles: [{
      designation: "Product Manager",
      ctc: 2000000,
      placeOfPosting: "Mumbai"
    }],
    status: "closed",
    analytics: {
      applications: 60,
      shortlisted: 20,
      selected: 8
    },
    createdAt: "2024-01-10T10:00:00.000Z",
    applicationDeadline: "2024-02-10T00:00:00.000Z"
  },
  {
    _id: "JNF003",
    companyDetails: {
      name: "Tech Corp",
      domain: "IT"
    },
    jobProfiles: [{
      designation: "Data Scientist",
      ctc: 1800000,
      placeOfPosting: "Hyderabad"
    }],
    status: "pending",
    analytics: {
      applications: 0,
      shortlisted: 0,
      selected: 0
    },
    createdAt: "2024-01-20T10:00:00.000Z",
    applicationDeadline: "2024-02-20T00:00:00.000Z"
  },
  {
    _id: "JNF004",
    companyDetails: {
      name: "Tech Corp",
      domain: "IT"
    },
    jobProfiles: [{
      designation: "Frontend Developer",
      ctc: 1200000,
      placeOfPosting: "Pune"
    }],
    status: "active",
    analytics: {
      applications: 30,
      shortlisted: 10,
      selected: 3
    },
    createdAt: "2024-01-18T10:00:00.000Z",
    applicationDeadline: "2024-02-18T00:00:00.000Z"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'success';
    case 'closed': return 'error';
    case 'pending': return 'warning';
    default: return 'default';
  }
};

const JNFView = () => {
  const [jnfs, setJnfs] = useState(dummyJNFs);
  const [selectedJnf, setSelectedJnf] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogTab, setDialogTab] = useState(0);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredJNFs = jnfs.filter(jnf => {
    const matchesSearch = jnf.jobProfiles[0].designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || jnf.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search JNFs..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={handleStatusFilter}>
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredJNFs.map((jnf) => (
          <Grid item xs={12} md={6} key={jnf._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {jnf.jobProfiles[0].designation}
                  </Typography>
                  <Chip
                    label={jnf.status.toUpperCase()}
                    color={getStatusColor(jnf.status)}
                    size="small"
                  />
                </Box>
                
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    JNF ID: {jnf._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {jnf.jobProfiles[0].placeOfPosting}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CTC: ₹{(jnf.jobProfiles[0].ctc / 100000).toFixed(2)} LPA
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="caption" display="block" textAlign="center">
                      Applications
                    </Typography>
                    <Typography variant="h6" textAlign="center">
                      {jnf.analytics.applications}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" display="block" textAlign="center">
                      Shortlisted
                    </Typography>
                    <Typography variant="h6" textAlign="center">
                      {jnf.analytics.shortlisted}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" display="block" textAlign="center">
                      Selected
                    </Typography>
                    <Typography variant="h6" textAlign="center">
                      {jnf.analytics.selected}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setSelectedJnf(jnf);
                      setOpenDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedJnf && (
          <>
            <DialogTitle>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={dialogTab} onChange={(e, newValue) => setDialogTab(newValue)}>
                  <Tab label="Details" />
                  <Tab label="Analytics" />
                  <Tab label="Timeline" />
                </Tabs>
              </Box>
            </DialogTitle>
            <DialogContent>
              {dialogTab === 0 && (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{selectedJnf.jobProfiles[0].designation}</Typography>
                    <Chip
                      label={selectedJnf.status.toUpperCase()}
                      color={getStatusColor(selectedJnf.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Company Details</Typography>
                    <Typography>Domain: {selectedJnf.companyDetails.domain}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Job Details</Typography>
                    <Typography>Location: {selectedJnf.jobProfiles[0].placeOfPosting}</Typography>
                    <Typography>CTC: ₹{(selectedJnf.jobProfiles[0].ctc / 100000).toFixed(2)} LPA</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Important Dates</Typography>
                    <Typography>Posted: {new Date(selectedJnf.createdAt).toLocaleDateString()}</Typography>
                    <Typography>Deadline: {new Date(selectedJnf.applicationDeadline).toLocaleDateString()}</Typography>
                  </Grid>
                </Grid>
              )}
              {dialogTab === 1 && (
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Application Statistics</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">{selectedJnf.analytics.applications}</Typography>
                        <Typography variant="body2">Total Applications</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">{selectedJnf.analytics.shortlisted}</Typography>
                        <Typography variant="body2">Shortlisted</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">{selectedJnf.analytics.selected}</Typography>
                        <Typography variant="body2">Selected</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default JNFView;