import { Box, Typography, Paper } from '@mui/material';

const FilterDebug = ({ filters }) => {
  return (
    <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
      <Typography variant="subtitle2" gutterBottom>Active Filters:</Typography>
      <pre style={{ margin: 0 }}>
        {JSON.stringify(filters, null, 2)}
      </pre>
    </Paper>
  );
};

export default FilterDebug; 