import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const StudentAnalytics = () => {
  const analyticsData = [
    {
      title: "Total Students",
      count: "1234",
      Icon: PeopleIcon,
      color: "#1976d2",
      trend: "+8% from last month"
    },
    {
      title: "Placed Students",
      count: "789",
      Icon: CheckCircleIcon,
      color: "#2e7d32",
      trend: "+12% from last month"
    },
    {
      title: "Average CGPA",
      count: "8.5",
      Icon: SchoolIcon,
      color: "#ed6c02",
      trend: "+5% from last batch"
    },
    {
      title: "Placement Rate",
      count: "64%",
      Icon: TrendingUpIcon,
      color: "#9c27b0",
      trend: "+10% from last year"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {analyticsData.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <div style={{
                      backgroundColor: `${item.color}15`,
                      borderRadius: '12px',
                      padding: '12px',
                    }}>
                      <IconComponent sx={{ color: item.color }} />
                    </div>
                  </Grid>
                  <Grid item xs>
                    <Typography color="textSecondary" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h5">
                      {item.count}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      {item.trend}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StudentAnalytics; 