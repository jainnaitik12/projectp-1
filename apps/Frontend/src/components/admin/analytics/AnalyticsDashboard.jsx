// components/admin/analytics/AnalyticsDashboard.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel
  } from '@mui/material';
  import {
    BarChart,
    LineChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  import {
    TrendingUp,
    Business,
    People,
    WorkOutline,
    Download,
    FilterList
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const AnalyticsDashboard = () => {
    const [timeRange, setTimeRange] = useState('yearly');
    const [department, setDepartment] = useState('all');
  
    // Sample data - replace with actual data
    const placementStats = {
      totalStudents: 500,
      placedStudents: 425,
      averagePackage: 12.5,
      highestPackage: 45,
      companies: 50,
      ongoingDrives: 8
    };
  
    const placementTrends = [
      { month: 'Jan', placements: 45, offers: 52 },
      { month: 'Feb', placements: 55, offers: 65 },
      { month: 'Mar', placements: 40, offers: 45 },
      // Add more months...
    ];
  
    const departmentWiseData = [
      { name: 'CSE', placed: 95, total: 100 },
      { name: 'ECE', placed: 85, total: 90 },
      { name: 'ME', placed: 75, total: 85 },
      // Add more departments...
    ];
  
    const recentPlacements = [
      {
        id: 1,
        student: 'John Doe',
        company: 'Tech Corp',
        package: 15,
        position: 'Software Engineer',
        date: '2024-02-20'
      },
      // Add more placements...
    ];
  
    const StatCard = ({ title, value, icon, trend }) => (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4">
                {value}
              </Typography>
              {trend && (
                <Typography 
                  variant="body2" 
                  color={trend > 0 ? 'success.main' : 'error.main'}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <TrendingUp fontSize="small" />
                  {trend}% from last year
                </Typography>
              )}
            </Box>
            <Box 
              sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: 'primary.light' 
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">Placement Analytics</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="cse">CSE</MenuItem>
                <MenuItem value="ece">ECE</MenuItem>
                <MenuItem value="me">ME</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>
  
        {/* Stats Overview */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Placement Rate"
              value={`${Math.round((placementStats.placedStudents / placementStats.totalStudents) * 100)}%`}
              icon={<People color="primary" />}
              trend={5.2}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Average Package (LPA)"
              value={placementStats.averagePackage}
              icon={<WorkOutline color="primary" />}
              trend={8.5}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Participating Companies"
              value={placementStats.companies}
              icon={<Business color="primary" />}
              trend={12.3}
            />
          </Grid>
        </Grid>
  
        {/* Placement Trends */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Placement Trends
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="placements" 
                    stroke="#8884d8" 
                    name="Placements"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="offers" 
                    stroke="#82ca9d" 
                    name="Offers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
  
        {/* Department-wise Stats */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Department-wise Placement Status
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentWiseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="placed" fill="#8884d8" name="Placed" />
                      <Bar dataKey="total" fill="#82ca9d" name="Total Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Placements
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell align="right">Package</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentPlacements.map((placement) => (
                      <TableRow key={placement.id}>
                        <TableCell>{placement.student}</TableCell>
                        <TableCell>{placement.company}</TableCell>
                        <TableCell align="right">
                          {placement.package} LPA
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        {/* Package Distribution */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Package Distribution
              </Typography>
              <IconButton>
                <FilterList />
              </IconButton>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Package Range</TableCell>
                  <TableCell>Number of Students</TableCell>
                  <TableCell>Top Companies</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Above 20 LPA</TableCell>
                  <TableCell>45</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Chip label="Google" size="small" />
                      <Chip label="Microsoft" size="small" />
                    </Box>
                  </TableCell>
                  <TableCell align="right">15%</TableCell>
                </TableRow>
                {/* Add more rows */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    );
  };