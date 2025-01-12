import { Card, CardContent, Typography, Box, Tabs, Tab } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useState } from 'react';

const COLORS = {
  topPaying: ['#00C49F', '#00A087', '#008975', '#006B66', '#004D4D'],
  topHiring: ['#0088FE', '#0070D1', '#0059A3', '#004175', '#002947'],
  lowPaying: ['#FF8042', '#FF6B3F', '#FF533C', '#FF3939', '#FF2020']
};

const TopCompanies = () => {
  const [view, setView] = useState(0);

  const topPayingCompanies = [
    { name: 'Google', ctc: 25, hired: 10 },
    { name: 'Microsoft', ctc: 22, hired: 15 },
    { name: 'Amazon', ctc: 20, hired: 20 },
    { name: 'Goldman Sachs', ctc: 18, hired: 12 },
    { name: 'JPMorgan', ctc: 16, hired: 18 }
  ];

  const topHiringCompanies = [
    { name: 'TCS', hired: 50, avgCTC: 5 },
    { name: 'Infosys', hired: 45, avgCTC: 4.5 },
    { name: 'Wipro', hired: 40, avgCTC: 4.8 },
    { name: 'Accenture', hired: 35, avgCTC: 5.2 },
    { name: 'Cognizant', hired: 30, avgCTC: 4.6 }
  ];

  const leastPayingCompanies = [
    { name: 'Company A', ctc: 4.0, hired: 25 },
    { name: 'Company B', ctc: 4.2, hired: 20 },
    { name: 'Company C', ctc: 4.5, hired: 15 },
    { name: 'Company D', ctc: 4.8, hired: 10 },
    { name: 'Company E', ctc: 5.0, hired: 8 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Company Analysis
        </Typography>
        <Tabs 
          value={view} 
          onChange={(e, newValue) => setView(newValue)} 
          sx={{ mb: 2 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Top Paying" />
          <Tab label="Top Hiring" />
          <Tab label="Least Paying" />
        </Tabs>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 0 ? (
              <BarChart data={topPayingCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke={COLORS.topPaying[0]} />
                <YAxis yAxisId="right" orientation="right" stroke={COLORS.topPaying[1]} />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="ctc" 
                  fill={COLORS.topPaying[0]} 
                  name="CTC (LPA)"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="ctc" position="top" />
                </Bar>
                <Bar 
                  yAxisId="right" 
                  dataKey="hired" 
                  fill={COLORS.topPaying[1]} 
                  name="Students Hired"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="hired" position="top" />
                </Bar>
              </BarChart>
            ) : view === 1 ? (
              <BarChart data={topHiringCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke={COLORS.topHiring[0]} />
                <YAxis yAxisId="right" orientation="right" stroke={COLORS.topHiring[1]} />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="hired" 
                  fill={COLORS.topHiring[0]} 
                  name="Students Hired"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="hired" position="top" />
                </Bar>
                <Bar 
                  yAxisId="right" 
                  dataKey="avgCTC" 
                  fill={COLORS.topHiring[1]} 
                  name="Avg CTC (LPA)"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="avgCTC" position="top" />
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={leastPayingCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke={COLORS.lowPaying[0]} />
                <YAxis yAxisId="right" orientation="right" stroke={COLORS.lowPaying[1]} />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="ctc" 
                  fill={COLORS.lowPaying[0]} 
                  name="CTC (LPA)"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="ctc" position="top" />
                </Bar>
                <Bar 
                  yAxisId="right" 
                  dataKey="hired" 
                  fill={COLORS.lowPaying[1]} 
                  name="Students Hired"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="hired" position="top" />
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopCompanies; 