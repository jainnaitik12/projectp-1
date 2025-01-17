import {
    Card,
    CardContent,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Button,
    Box,
    Chip,
    Divider
  } from '@mui/material';
  import {
    TableChart,
    PieChart,
    BarChart,
    Download,
    Add,
    FilterList
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const CustomReportGenerator = ({ onGenerate }) => {
    const [reportConfig, setReportConfig] = useState({
      type: '',
      metrics: [],
      filters: [],
      groupBy: '',
      format: 'pdf'
    });
  
    const metrics = [
      'Total Students',
      'Placed Students',
      'Average Package',
      'Highest Package',
      'Company Count',
      'Branch-wise Statistics'
    ];
  
    const applyFilters = () => {
      // Add your filter logic here
      console.log('Filters applied:', reportConfig.filters);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Custom Report Generator
          </Typography>
  
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportConfig.type}
                  onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
                >
                  <MenuItem value="placement">Placement Report</MenuItem>
                  <MenuItem value="company">Company-wise Report</MenuItem>
                  <MenuItem value="branch">Branch-wise Report</MenuItem>
                  <MenuItem value="trend">Trend Analysis</MenuItem>
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Metrics</InputLabel>
                <Select
                  multiple
                  value={reportConfig.metrics}
                  onChange={(e) => setReportConfig({ ...reportConfig, metrics: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {metrics.map((metric) => (
                    <MenuItem key={metric} value={metric}>
                      <Checkbox checked={reportConfig.metrics.indexOf(metric) > -1} />
                      <ListItemText primary={metric} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12}>
              <Divider>Visualization</Divider>
            </Grid>
  
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="center">
                <Button
                  variant={reportConfig.format === 'table' ? 'contained' : 'outlined'}
                  startIcon={<TableChart />}
                  onClick={() => setReportConfig({ ...reportConfig, format: 'table' })}
                >
                  Table
                </Button>
                <Button
                  variant={reportConfig.format === 'pie' ? 'contained' : 'outlined'}
                  startIcon={<PieChart />}
                  onClick={() => setReportConfig({ ...reportConfig, format: 'pie' })}
                >
                  Pie Chart
                </Button>
                <Button
                  variant={reportConfig.format === 'bar' ? 'contained' : 'outlined'}
                  startIcon={<BarChart />}
                  onClick={() => setReportConfig({ ...reportConfig, format: 'bar' })}
                >
                  Bar Chart
                </Button>
              </Box>
            </Grid>
  
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  size="small"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setReportConfig({ ...reportConfig })}
                >
                  Save Template
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={() => onGenerate(reportConfig)}
                >
                  Generate Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
