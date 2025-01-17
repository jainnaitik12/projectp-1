// components/admin/dashboard/PlacementProgress.jsx
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlacementProgress = () => {
  const monthlyData = [
    { month: 'Jul', placed: 20, target: 25 },
    { month: 'Aug', placed: 45, target: 50 },
    { month: 'Sep', placed: 85, target: 75 },
    { month: 'Oct', placed: 150, target: 125 },
    { month: 'Nov', placed: 220, target: 200 },
    { month: 'Dec', placed: 310, target: 300 }
  ];

  const totalStudents = 1200;
  const placedStudents = 850;
  const placementPercentage = (placedStudents / totalStudents) * 100;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Placement Progress
        </Typography>

        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2">Overall Progress</Typography>
            <Typography variant="body2" color="textSecondary">
              {placedStudents} / {totalStudents} students
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={placementPercentage}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="textSecondary" mt={0.5}>
            {Math.round(placementPercentage)}% placed
          </Typography>
        </Box>

        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="placed" 
                name="Placed Students" 
                stroke="#2e7d32" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                name="Target" 
                stroke="#1976d2" 
                strokeWidth={2} 
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlacementProgress;