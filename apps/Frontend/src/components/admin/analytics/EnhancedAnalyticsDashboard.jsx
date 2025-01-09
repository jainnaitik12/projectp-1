import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    LinearProgress
} from '@mui/material';
import {
    BarChart,
    LineChart,
    PieChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Download, FilterList, Refresh } from '@mui/icons-material';
import { useState } from 'react';

export const EnhancedAnalyticsDashboard = () => {
    const [timeRange, setTimeRange] = useState('yearly');
    const [department, setDepartment] = useState('all');

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
        { month: 'Mar', placements: 40, offers: 45 }
    ];

    const departmentWiseData = [
        { name: 'CSE', placed: 95, total: 100 },
        { name: 'ECE', placed: 85, total: 90 },
        { name: 'ME', placed: 75, total: 85 }
    ];

    const recentPlacements = [
        {
            id: 1,
            student: 'John Doe',
            company: 'Tech Corp',
            package: 15,
            position: 'Software Engineer',
            date: '2024-02-20'
        }
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">Enhanced Placement Analytics</Typography>
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
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Placement Rate</Typography>
                            <Typography variant="h4">
                                {Math.round((placementStats.placedStudents / placementStats.totalStudents) * 100)}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(placementStats.placedStudents / placementStats.totalStudents) * 100}
                                color="primary"
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Average Package (LPA)</Typography>
                            <Typography variant="h4">{placementStats.averagePackage}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">Participating Companies</Typography>
                            <Typography variant="h4">{placementStats.companies}</Typography>
                        </CardContent>
                    </Card>
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
                                <Line type="monotone" dataKey="placements" stroke="#8884d8" name="Placements" />
                                <Line type="monotone" dataKey="offers" stroke="#82ca9d" name="Offers" />
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
                                        <Bar dataKey="total" fill="#82ca9d" name="Total" />
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
                                            <TableCell align="right">{placement.package} LPA</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
