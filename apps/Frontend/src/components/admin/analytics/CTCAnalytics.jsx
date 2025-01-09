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
  PieChart,
  Pie,
  Cell,
  Treemap,
} from 'recharts';
import { useState } from 'react';

const COLORS = {
  high: '#4CAF50',
  medium: '#2196F3',
  low: '#FF9800',
  gradient: ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'],
};

const CTCAnalytics = () => {
  const [view, setView] = useState(0);

  // Sample data - replace with actual data
  const ctcBucketData = [
    { range: '3-5 LPA', count: 150, percentage: 30 },
    { range: '5-8 LPA', count: 200, percentage: 40 },
    { range: '8-12 LPA', count: 100, percentage: 20 },
    { range: '12-15 LPA', count: 35, percentage: 7 },
    { range: '15+ LPA', count: 15, percentage: 3 },
  ];

  const topPayingCompanies = [
    { name: 'Google', ctc: 25, hired: 10 },
    { name: 'Microsoft', ctc: 22, hired: 15 },
    { name: 'Amazon', ctc: 20, hired: 20 },
    { name: 'Goldman Sachs', ctc: 18, hired: 12 },
    { name: 'JPMorgan', ctc: 16, hired: 18 },
  ];

  const leastPayingCompanies = [
    { name: 'Company A', ctc: 4, hired: 25 },
    { name: 'Company B', ctc: 4.5, hired: 20 },
    { name: 'Company C', ctc: 5, hired: 15 },
    { name: 'Company D', ctc: 5.5, hired: 10 },
    { name: 'Company E', ctc: 6, hired: 8 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CTC Analysis
        </Typography>

        <Tabs value={view} onChange={(e, newValue) => setView(newValue)} sx={{ mb: 2 }}>
          <Tab label="CTC Distribution" />
          <Tab label="Top Paying" />
          <Tab label="Package Overview" />
        </Tabs>

        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 0 ? (
              <BarChart data={ctcBucketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="right" dataKey="percentage" fill="#82ca9d" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : view === 1 ? (
              <Treemap
                data={topPayingCompanies}
                dataKey="ctc"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
              >
                {topPayingCompanies.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.gradient[index % COLORS.gradient.length]} />
                ))}
              </Treemap>
            ) : (
              <PieChart>
                <Pie
                  data={ctcBucketData}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {ctcBucketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.gradient[index % COLORS.gradient.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CTCAnalytics;