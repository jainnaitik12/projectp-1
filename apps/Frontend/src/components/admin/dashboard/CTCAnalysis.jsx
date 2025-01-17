import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CTCAnalysis = () => {
  const [view, setView] = useState(0);

  const ctcBucketData = [
    { range: '3-5 LPA', count: 120 },
    { range: '5-8 LPA', count: 80 },
    { range: '8-12 LPA', count: 40 },
    { range: '12-15 LPA', count: 20 },
    { range: '15+ LPA', count: 10 }
  ];

  const branchCtcData = [
    { branch: 'CSE', avgCTC: 12.5 },
    { branch: 'ECE', avgCTC: 10.2 },
    { branch: 'ME', avgCTC: 8.5 },
    { branch: 'EEE', avgCTC: 9.8 },
    { branch: 'CIVIL', avgCTC: 7.5 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CTC Analysis
        </Typography>
        <Tabs value={view} onChange={(e, newValue) => setView(newValue)} sx={{ mb: 2 }}>
          <Tab label="CTC Distribution" />
          <Tab label="Branch-wise CTC" />
        </Tabs>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 0 ? (
              <PieChart>
                <Pie
                  data={ctcBucketData}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {ctcBucketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={branchCtcData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgCTC" fill="#8884d8" name="Average CTC (LPA)" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CTCAnalysis; 