import { Grid } from '@mui/material';
import { StatusCard } from '../../common/ui/Card/StatusCard';
import { 
  People, 
  Business, 
  Description, 
  CheckCircle 
} from '@mui/icons-material';

export const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Companies',
      value: stats.totalCompanies,
      icon: <Business fontSize="large" />,
      color: '#1976d2'
    },
    {
      title: 'Active JNFs',
      value: stats.activeJnfs,
      icon: <Description fontSize="large" />,
      color: '#2e7d32'
    },
    {
      title: 'Placed Students',
      value: stats.placedStudents,
      icon: <CheckCircle fontSize="large" />,
      color: '#ed6c02'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: <People fontSize="large" />,
      color: '#9c27b0'
    }
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatusCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};