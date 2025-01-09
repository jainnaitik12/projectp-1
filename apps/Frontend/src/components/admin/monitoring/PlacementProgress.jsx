import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const PlacementProgress = () => {
  const overallStats = {
    totalStudents: 1200,
    placedStudents: 850,
    averagePackage: "12.5 LPA",
    highestPackage: "45 LPA",
    companiesVisited: 45,
    ongoingProcesses: 8
  };

  const monthlyProgress = [
    { month: 'Jul', placed: 50, target: 60 },
    { month: 'Aug', placed: 120, target: 100 },
    { month: 'Sep', placed: 200, target: 180 },
    { month: 'Oct', placed: 350, target: 300 },
    { month: 'Nov', placed: 500, target: 450 },
    { month: 'Dec', placed: 650, target: 600 }
  ];

  const packageDistribution = [
    { range: '> 20 LPA', count: 75 },
    { range: '15-20 LPA', count: 150 },
    { range: '10-15 LPA', count: 300 },
    { range: '5-10 LPA', count: 250 },
    { range: '< 5 LPA', count: 75 }
  ];

  return (
    <Grid container spacing={3}>
      {/* Overall Statistics */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Overall Placement Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    Placement Progress
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box flexGrow={1}>
                      <LinearProgress
                        variant="determinate"
                        value={(overallStats.placedStudents / overallStats.totalStudents) * 100}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2">
                      {Math.round((overallStats.placedStudents / overallStats.totalStudents) * 100)}%
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {overallStats.placedStudents} out of {overallStats.totalStudents} students placed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="h6">{overallStats.averagePackage}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Average Package
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="h6">{overallStats.highestPackage}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Highest Package
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="h6">{overallStats.companiesVisited}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Companies Visited
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="h6">{overallStats.ongoingProcesses}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ongoing Processes
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Progress Chart */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Progress
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgress}>
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
      </Grid>

      {/* Package Distribution */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Package Distribution
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={packageDistribution}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="range" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PlacementProgress; 