import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar
} from '@mui/material';
import {
  Business,
  LocationOn,
  Phone,
  Email,
  Language,
  Work,
  Timeline,
  Group
} from '@mui/icons-material';
import { useState } from 'react';

const CompanyDetails = ({ company, open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const CompanyOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" mb={3}>
          <Avatar
            src={company.logo}
            sx={{ width: 120, height: 120, margin: 'auto' }}
          >
            <Business sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h6" mt={2}>
            {company.name}
          </Typography>
          <Typography color="textSecondary">
            {company.industry}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Contact Information
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{company.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">{company.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">{company.phone}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Language fontSize="small" color="action" />
            <Typography variant="body2">{company.website}</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="subtitle2" gutterBottom>
          Company Overview
        </Typography>
        <Typography variant="body2" paragraph>
          {company.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">Hiring Since</Typography>
            <Typography variant="body2">2020</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">Total Hired</Typography>
            <Typography variant="body2">125 students</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">Avg Package</Typography>
            <Typography variant="body2">12 LPA</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">Highest Package</Typography>
            <Typography variant="body2">25 LPA</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const VisitHistory = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Visit Date</TableCell>
          <TableCell>Purpose</TableCell>
          <TableCell>Students Attended</TableCell>
          <TableCell>Offers Made</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {company.visits?.map((visit) => (
          <TableRow key={visit.id}>
            <TableCell>{visit.date}</TableCell>
            <TableCell>{visit.purpose}</TableCell>
            <TableCell>{visit.studentsAttended}</TableCell>
            <TableCell>{visit.offersMade}</TableCell>
            <TableCell>
              <Chip 
                label={visit.status} 
                color={visit.status === 'completed' ? 'success' : 'warning'}
                size="small"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Company Details
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            <Tab icon={<Business />} label="Overview" />
            <Tab icon={<Timeline />} label="Visit History" />
            <Tab icon={<Work />} label="Job Profiles" />
            <Tab icon={<Group />} label="Placed Students" />
          </Tabs>
        </Box>

        {activeTab === 0 && <CompanyOverview />}
        {activeTab === 1 && <VisitHistory />}
        {/* Add other tabs content */}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDetails; 