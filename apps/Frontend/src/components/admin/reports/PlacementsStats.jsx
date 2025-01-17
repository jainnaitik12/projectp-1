import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Box, 
    Button 
  } from '@mui/material';
  import { FilterList } from '@mui/icons-material';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from 'recharts';
  import { useState } from 'react';
  
  export const PlacementStats = ({ data }) => {
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(data);

    const applyFilters = () => {
      const filtered = data.filter(item => {
        // Add your filter logic here
        return true; // Replace with actual filter conditions
      });
      setFilteredData(filtered);
    };

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Placement Statistics
          </Typography>
          <Box sx={{ height: 300 }}>
            <BarChart
              width={600}
              height={300}
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placed" fill="#8884d8" name="Placed" />
              <Bar dataKey="total" fill="#82ca9d" name="Total Students" />
            </BarChart>
          </Box>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            size="small"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    );
  };