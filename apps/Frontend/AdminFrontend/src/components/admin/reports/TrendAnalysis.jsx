import {
    Card,
    CardContent,
    Typography,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
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
  import { useState } from 'react';
  import { FilterList } from '@mui/icons-material';
  
  export const TrendAnalysis = ({ data }) => {
    const [timeRange, setTimeRange] = useState('yearly');
    const [metric, setMetric] = useState('placements');
    const [filteredData, setFilteredData] = useState(data);
  
    const metrics = {
      placements: 'Number of Placements',
      salary: 'Average Salary',
      companies: 'Number of Companies',
      offers: 'Number of Offers'
    };
  
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Trend Analysis</Typography>
            
            <Box display="flex" gap={2}>
              <FormControl size="small">
                <InputLabel>Metric</InputLabel>
                <Select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  label="Metric"
                >
                  {Object.entries(metrics).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={(e, value) => setTimeRange(value)}
                size="small"
              >
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="quarterly">Quarterly</ToggleButton>
                <ToggleButton value="yearly">Yearly</ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant="outlined"
                startIcon={<FilterList />}
                size="small"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
  
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };
