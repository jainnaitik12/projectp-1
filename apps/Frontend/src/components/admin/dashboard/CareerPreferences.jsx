import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CareerPreferences = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const careerData = [
    { name: 'Higher Studies', value: 35, details: { 'MS': 20, 'MBA': 10, 'PhD': 5 } },
    { name: 'Startup', value: 25, details: { 'Tech': 15, 'Non-Tech': 10 } },
    { name: 'Civil Services', value: 15, details: { 'IAS': 8, 'Other Services': 7 } },
    { name: 'Research', value: 15, details: { 'Academic': 8, 'Industry': 7 } },
    { name: 'Family Business', value: 10, details: { 'Manufacturing': 6, 'Services': 4 } }
  ];

  const branchWisePreferences = [
    { branch: 'CSE', higherStudies: 40, startup: 30, research: 20, civilServices: 10 },
    { branch: 'ECE', higherStudies: 35, startup: 25, research: 25, civilServices: 15 },
    { branch: 'ME', higherStudies: 30, startup: 20, research: 30, civilServices: 20 },
    { branch: 'EEE', higherStudies: 35, startup: 15, research: 35, civilServices: 15 },
    { branch: 'CIVIL', higherStudies: 25, startup: 15, research: 30, civilServices: 30 }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Career Preferences (Non-Enrolled Students)
        </Typography>
        <Box sx={{ display: 'flex', height: 300 }}>
          <Box sx={{ width: '50%', height: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={careerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {careerData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke={index === activeIndex ? '#fff' : 'none'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: '50%', height: '100%' }}>
            <ResponsiveContainer>
              <RadarChart data={branchWisePreferences}>
                <PolarGrid />
                <PolarAngleAxis dataKey="branch" />
                <PolarRadiusAxis />
                <Radar
                  name="Higher Studies"
                  dataKey="higherStudies"
                  stroke={COLORS[0]}
                  fill={COLORS[0]}
                  fillOpacity={0.6}
                />
                <Radar
                  name="Startup"
                  dataKey="startup"
                  stroke={COLORS[1]}
                  fill={COLORS[1]}
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CareerPreferences; 