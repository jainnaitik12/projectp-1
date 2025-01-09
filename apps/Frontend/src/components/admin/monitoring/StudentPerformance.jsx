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
  Avatar,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Person,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { useState } from 'react';

const StudentPerformance = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const studentStats = [
    {
      id: 1,
      name: 'John Doe',
      branch: 'CSE',
      testsAttended: 5,
      interviewsAttended: 3,
      offers: 2,
      highestPackage: '25 LPA',
      status: 'placed'
    },
    // Add more students...
  ];

  const performanceMetrics = [
    {
      metric: 'Average Test Score',
      value: '75%',
      trend: 'up',
      change: '+5%'
    },
    {
      metric: 'Interview Success Rate',
      value: '65%',
      trend: 'up',
      change: '+8%'
    },
    {
      metric: 'Multiple Offer Rate',
      value: '30%',
      trend: 'down',
      change: '-2%'
    },
    {
      metric: 'Average Package',
      value: '12.5 LPA',
      trend: 'up',
      change: '+1.5 LPA'
    }
  ];

  return (
    <Grid container spacing={3}>
      {/* Performance Metrics */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {performanceMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.metric}>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {metric.metric}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                      {metric.value}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {metric.trend === 'up' ? (
                        <TrendingUp color="success" />
                      ) : (
                        <TrendingDown color="error" />
                      )}
                      <Typography
                        variant="body2"
                        color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Student Performance Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Student Performance</Typography>
              <TextField
                size="small"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Tests Attended</TableCell>
                  <TableCell>Interviews</TableCell>
                  <TableCell>Offers</TableCell>
                  <TableCell>Highest Package</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentStats.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar>
                          <Person />
                        </Avatar>
                        {student.name}
                      </Box>
                    </TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.testsAttended}</TableCell>
                    <TableCell>{student.interviewsAttended}</TableCell>
                    <TableCell>{student.offers}</TableCell>
                    <TableCell>{student.highestPackage}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={student.status === 'placed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentPerformance; 