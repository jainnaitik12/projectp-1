import { Grid, Paper, Typography } from '@mui/material';
import AnalyticsDashboard from '../../components/admin/analytics/AnalyticsDashboard';
import BranchWiseAnalytics from '../../components/admin/analytics/BranchWiseAnalytics';
import SalaryTrendChart from '../../components/admin/analytics/SalaryTrendChart';
import PlacementStatusChart from '../../components/admin/analytics/PlacementStatusChart';

const Analytics = () => {
  return (
    <Grid container spacing={3}>
      {/* Overview Cards */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <AnalyticsDashboard />
        </Paper>
      </Grid>

      {/* Branch-wise Analytics */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Branch-wise Placements
          </Typography>
          <BranchWiseAnalytics />
        </Paper>
      </Grid>

      {/* Salary Trends */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Salary Trends
          </Typography>
          <SalaryTrendChart />
        </Paper>
      </Grid>

      {/* Placement Status */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Placement Status
          </Typography>
          <PlacementStatusChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Analytics; 