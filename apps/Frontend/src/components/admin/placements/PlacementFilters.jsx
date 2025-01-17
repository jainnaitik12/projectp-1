import { Box, TextField, MenuItem, Grid } from '@mui/material';

const PlacementFilters = ({ filters, onFilterChange }) => {
  const statuses = ['All', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'];
  const years = ['2024', '2023', '2022', '2021'];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search Company"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Year"
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlacementFilters; 