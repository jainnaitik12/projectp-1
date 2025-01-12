import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Download, FilterList } from '@mui/icons-material';
import reportService from '../../../services/admin/reportService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import FilterDebug from '../../common/FilterDebug';
import { logPerformance, debugFilters } from '../../../utils/debug';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PlacementReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  const [loadingStates, setLoadingStates] = useState({
    filters: false,
    charts: false,
    download: false
  });

  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    branch: 'all',
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const fetchData = async () => {
    setLoadingStates(prev => ({ ...prev, filters: true }));
    setError(null);
    
    try {
      console.time('fetchData');
      const response = await reportService.getFilteredReports('placement', filters);
      console.timeEnd('fetchData');
      
      setData(response);
      console.log('Filtered Data:', response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoadingStates(prev => ({ ...prev, filters: false }));
    }
  };

  const debouncedFetchData = useCallback(
    debounce(() => {
      fetchData();
    }, 500),
    [filters]
  );

  useEffect(() => {
    console.log('Filters changed:', filters);
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (newDate) => {
    setFilters(prev => ({
      ...prev,
      [name]: newDate,
    }));
  };

  const handleApplyFilters = () => {
    fetchData();
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      await reportService.downloadReport('placement', filters);
    } catch (error) {
      console.error('Error downloading report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                name="year"
                label="Year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                {[2022, 2023, 2024].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                name="branch"
                label="Branch"
                value={filters.branch}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Branches</MenuItem>
                <MenuItem value="CSE">Computer Science</MenuItem>
                <MenuItem value="IT">Information Technology</MenuItem>
                <MenuItem value="ECE">Electronics</MenuItem>
                <MenuItem value="ME">Mechanical</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              onChange={handleDateChange('startDate')}
              slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="End Date"
              value={filters.endDate}
              onChange={handleDateChange('endDate')}
              slotProps={{ textField: { fullWidth: true } }}
            />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowDebug(!showDebug)}
                >
                  {showDebug ? 'Hide Debug' : 'Show Debug'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={fetchData}
                  disabled={loadingStates.filters}
                >
                  {loadingStates.filters ? 'Applying...' : 'Apply Filters'}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownload}
                  disabled={loadingStates.download}
                  sx={{ ml: 1 }}
                >
                  {loadingStates.download ? 'Downloading...' : 'Download Report'}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {showDebug && <FilterDebug filters={filters} />}
          
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Grid>

      {loading && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        </Grid>
      )}

      {!loading && data && (
        <>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="h4">{data.overview.totalStudents}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Placed Students
                </Typography>
                <Typography variant="h4">{data.overview.placedStudents}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Package
                </Typography>
                <Typography variant="h4">{data.overview.averagePackage}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Highest Package
                </Typography>
                <Typography variant="h4">{data.overview.highestPackage}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Branch-wise Placements
              </Typography>
              <BarChart
                width={500}
                height={300}
                data={data.branchWise}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#8884d8" name="Placed" />
                <Bar dataKey="total" fill="#82ca9d" name="Total" />
              </BarChart>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Package Distribution
              </Typography>
              <PieChart width={500} height={300}>
                <Pie
                  data={data.packageRanges}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data.packageRanges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PlacementReports;

