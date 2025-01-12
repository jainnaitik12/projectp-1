import { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Download, FilterList } from '@mui/icons-material';
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
import reportService from '../../../services/admin/reportService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StudentReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    department: 'all',
    batch: new Date().getFullYear().toString(),
    category: 'all',
    placementStatus: 'all',
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await reportService.getFilteredReports('student', filters);
      setData(response);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFilters(prev => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleApplyFilters = () => {
    fetchData();
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      await reportService.downloadReport('student', filters);
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
      {/* Filters Section */}
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
                name="department"
                label="Department"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="CSE">Computer Science</MenuItem>
                <MenuItem value="IT">Information Technology</MenuItem>
                <MenuItem value="ECE">Electronics</MenuItem>
                <MenuItem value="ME">Mechanical</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                name="batch"
                label="Batch"
                value={filters.batch}
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
                name="category"
                label="Category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="OBC">OBC</MenuItem>
                <MenuItem value="SC">SC</MenuItem>
                <MenuItem value="ST">ST</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                name="placementStatus"
                label="Placement Status"
                value={filters.placementStatus}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Students</MenuItem>
                <MenuItem value="placed">Placed</MenuItem>
                <MenuItem value="not_placed">Not Placed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownload}
                >
                  Download Report
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Department-wise Statistics */}
      {data && (
        <>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Department-wise Statistics
              </Typography>
              <BarChart
                width={500}
                height={300}
                data={data.departmentWise}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#8884d8" name="Placed" />
                <Bar dataKey="total" fill="#82ca9d" name="Total" />
              </BarChart>
            </Paper>
          </Grid>

          {/* Category-wise Statistics */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Category-wise Statistics
              </Typography>
              <PieChart width={500} height={300}>
                <Pie
                  data={data.categoryWise}
                  dataKey="placed"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {data.categoryWise.map((entry, index) => (
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

export default StudentReports;