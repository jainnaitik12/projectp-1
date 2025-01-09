import {
    Card,
    CardContent,
    Typography,
    Box,
  } from '@mui/material';
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  export const SalaryTrendChart = ({ data }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Salary Trends
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="averageCTC" stroke="#8884d8" name="Average CTC" />
                <Line type="monotone" dataKey="highestCTC" stroke="#82ca9d" name="Highest CTC" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };