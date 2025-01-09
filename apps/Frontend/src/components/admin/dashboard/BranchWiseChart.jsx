import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BranchWiseChart = () => {
  const data = [
    { branch: 'CSE', total: 180, placed: 150 },
    { branch: 'ECE', total: 160, placed: 120 },
    { branch: 'ME', total: 140, placed: 95 },
    { branch: 'EEE', total: 130, placed: 85 },
    { branch: 'CIVIL', total: 120, placed: 70 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Branch-wise Placement Status
        </Typography>
        <Box height={350}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total Students" fill="#1976d2" />
              <Bar dataKey="placed" name="Placed Students" fill="#2e7d32" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BranchWiseChart; 