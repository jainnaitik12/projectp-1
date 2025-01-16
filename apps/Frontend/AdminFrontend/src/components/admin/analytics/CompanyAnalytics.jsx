import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useState } from 'react';

const COLORS = {
  primary: '#8884d8',
  secondary: '#82ca9d',
  tertiary: '#ffc658',
};

const CompanyAnalytics = () => {
  const [view, setView] = useState(0);

  // Sample data - replace with actual data
  const topHiringCompanies = [
    { name: 'TCS', students: 50, departments: ['CSE', 'ECE', 'EEE'] },
    { name: 'Infosys', students: 45, departments: ['CSE', 'ECE'] },
    { name: 'Wipro', students: 40, departments: ['CSE', 'ME'] },
    { name: 'Accenture', students: 35, departments: ['CSE', 'ECE', 'ME'] },
    { name: 'Cognizant', students: 30, departments: ['CSE', 'ECE'] },
  ];

  const companyTrends = [
    { year: '2019', visits: 45, selections: 120, offers: 100 },
    { year: '2020', visits: 40, selections: 110, offers: 90 },
    { year: '2021', visits: 50, selections: 140, offers: 120 },
    { year: '2022', visits: 55, selections: 150, offers: 130 },
    { year: '2023', visits: 60, selections: 160, offers: 140 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Company Analytics
        </Typography>

        <Tabs value={view} onChange={(e, newValue) => setView(newValue)} sx={{ mb: 2 }}>
          <Tab label="Top Hiring" />
          <Tab label="Trends" />
          <Tab label="Overview" />
        </Tabs>

        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 0 ? (
              <BarChart data={topHiringCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar dataKey="students" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : view === 1 ? (
              <LineChart data={companyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke={COLORS.primary}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="selections"
                  stroke={COLORS.secondary}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="offers"
                  stroke={COLORS.tertiary}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            ) : (
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topHiringCompanies}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  name="Students Hired"
                  dataKey="students"
                  stroke={COLORS.primary}
                  fill={COLORS.primary}
                  fillOpacity={0.6}
                />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyAnalytics;