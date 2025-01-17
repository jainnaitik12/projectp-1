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
  Chip
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Business } from '@mui/icons-material';

const CompanyWiseStats = () => {
  const companyStats = [
    {
      id: 1,
      name: 'Google',
      offers: 25,
      avgPackage: '25 LPA',
      highestPackage: '45 LPA',
      selectionRate: 85,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Microsoft',
      offers: 20,
      avgPackage: '20 LPA',
      highestPackage: '35 LPA',
      selectionRate: 75,
      status: 'ongoing'
    },
    // Add more companies...
  ];

  const industryDistribution = [
    { name: 'Technology', value: 45 },
    { name: 'Finance', value: 25 },
    { name: 'Consulting', value: 15 },
    { name: 'Manufacturing', value: 10 },
    { name: 'Others', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Grid container spacing={3}>
      {/* Industry Distribution */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Industry Distribution
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {industryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              {industryDistribution.map((item, index) => (
                <Box
                  key={item.name}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      width={12}
                      height={12}
                      bgcolor={COLORS[index % COLORS.length]}
                      borderRadius="50%"
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                  <Typography variant="body2">{item.value}%</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Company-wise Statistics */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Company-wise Statistics
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Offers</TableCell>
                  <TableCell>Avg. Package</TableCell>
                  <TableCell>Highest Package</TableCell>
                  <TableCell>Selection Rate</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyStats.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <Business />
                        </Avatar>
                        {company.name}
                      </Box>
                    </TableCell>
                    <TableCell>{company.offers}</TableCell>
                    <TableCell>{company.avgPackage}</TableCell>
                    <TableCell>{company.highestPackage}</TableCell>
                    <TableCell>{company.selectionRate}%</TableCell>
                    <TableCell>
                      <Chip
                        label={company.status}
                        color={company.status === 'completed' ? 'success' : 'warning'}
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

export default CompanyWiseStats; 