import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const JobProfileStats = () => {
  const [view, setView] = useState(0);

  const sectorData = [
    { name: 'IT/Software', value: 45 },
    { name: 'Finance', value: 20 },
    { name: 'Core Engineering', value: 15 },
    { name: 'Consulting', value: 12 },
    { name: 'Analytics', value: 8 }
  ];

  const profileData = [
    { profile: 'Software Developer', count: 150, avgCTC: 12 },
    { profile: 'Data Analyst', count: 80, avgCTC: 10 },
    { profile: 'Business Analyst', count: 60, avgCTC: 11 },
    { profile: 'Product Manager', count: 40, avgCTC: 14 },
    { profile: 'Research Engineer', count: 30, avgCTC: 13 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Job Profile Analysis
        </Typography>
        <Tabs value={view} onChange={(e, newValue) => setView(newValue)} sx={{ mb: 2 }}>
          <Tab label="Sector Distribution" />
          <Tab label="Profile Analysis" />
        </Tabs>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 0 ? (
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}%`}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={profileData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profile" angle={-45} textAnchor="end" height={100} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Number of Students" />
                <Bar yAxisId="right" dataKey="avgCTC" fill="#82ca9d" name="Average CTC (LPA)" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobProfileStats; 