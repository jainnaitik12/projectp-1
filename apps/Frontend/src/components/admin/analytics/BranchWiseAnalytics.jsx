import {
    Card,
    CardContent,
    Typography,
    Box,
  } from '@mui/material';
  import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer
  } from 'recharts';
  import { useEffect, useState } from 'react';
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  export const BranchWiseAnalytics = ({ data =[] }) => {
    // const [data, setData] = useState([]);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Branch-wise Placements
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="branch"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };