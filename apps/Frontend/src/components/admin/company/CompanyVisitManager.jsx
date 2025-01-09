// components/admin/company/CompanyVisitManager.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar
} from '@mui/material';
import {
  Add,
  Business,
  Event,
  Group,
  LocationOn,
  MoreVert
} from '@mui/icons-material';
import { useState } from 'react';

const CompanyVisitManager = ({ type = 'upcoming' }) => {
  const [visits] = useState([
    {
      id: 1,
      companyName: 'Tech Corp',
      visitDate: '2024-03-15',
      purpose: 'Campus Drive',
      status: 'scheduled',
      requirements: ['Projector', 'Labs', 'Interview Rooms'],
      contactPerson: 'John Doe',
      studentsRegistered: 150,
      venue: 'Main Auditorium'
    },
    // Add more visits...
  ]);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">
            {type === 'upcoming' ? 'Upcoming Company Visits' : 'Visit History'}
          </Typography>
          {type === 'upcoming' && (
            <Button
              variant="contained"
              startIcon={<Add />}
            >
              Schedule Visit
            </Button>
          )}
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>
                      <Business />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {visit.companyName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Contact: {visit.contactPerson}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Event fontSize="small" color="action" />
                    {visit.visitDate}
                  </Box>
                </TableCell>
                <TableCell>{visit.purpose}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn fontSize="small" color="action" />
                    {visit.venue}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Group fontSize="small" color="action" />
                    {visit.studentsRegistered}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={visit.status}
                    color={visit.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompanyVisitManager;

