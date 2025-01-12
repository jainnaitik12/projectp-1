import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const JNFFilters = ({ filters, onFilterChange }) => {
  const handleChange = (field) => (event) => {
    onFilterChange(field, event.target.value);
  };

  const handleReset = () => {
    onFilterChange('reset', {
      search: '',
      company: 'All',
      status: 'All',
      type: 'All',
    });
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Search"
        value={filters.search}
        onChange={handleChange('search')}
        size="small"
      />
      <TextField
        label="Company"
        value={filters.company}
        onChange={handleChange('company')}
        size="small"
        select
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Tech Corp">Tech Corp</MenuItem>
        <MenuItem value="Data Systems">Data Systems</MenuItem>
        {/* Add more companies as needed */}
      </TextField>
      <TextField
        label="Status"
        value={filters.status}
        onChange={handleChange('status')}
        size="small"
        select
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="Closed">Closed</MenuItem>
        {/* Add more statuses as needed */}
      </TextField>
      <TextField
        label="Type"
        value={filters.type}
        onChange={handleChange('type')}
        size="small"
        select
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
        {/* Add more types as needed */}
      </TextField>
      <Button variant="contained" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
};

export default JNFFilters;