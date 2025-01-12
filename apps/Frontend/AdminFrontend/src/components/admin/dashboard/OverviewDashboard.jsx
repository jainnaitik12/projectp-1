import { Grid, Box } from '@mui/material';
import { 
  People, 
  Business, 
  TrendingUp, 
  EventNote 
} from '@mui/icons-material';

export const OverviewDashboard = ({ stats }) => {
  const dashboardCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: <People />,
      color: '#1976d2',
      change: '+5%'
    },
    {
      title: 'Companies Visiting',
      value: stats.companiesVisiting,
      icon: <Business />,
      color: '#2e7d32',
      change: '+12%'
    },
    {
      title: 'Average Package',
      value: `₹${stats.averagePackage}L`,
      icon: <TrendingUp />,
      color: '#ed6c02',
      change: '+8%'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: <EventNote />,
      color: '#9c27b0',
      change: '0'
    }
  ];

  return (
    <Grid container spacing={3}>
      {dashboardCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <DashboardCard {...card} />
        </Grid>
      ))}
      
      <Grid item xs={12} md={8}>
        <PlacementProgress stats={stats.placementProgress} />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <UpcomingActivities activities={stats.activities} />
      </Grid>
    </Grid>
  );
};