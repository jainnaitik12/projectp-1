import { Box, Typography } from '@mui/material';
import { AuditLogViewer } from '../../components/admin/audit/AuditLogViewer';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

const Audit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [logs, setLogs] = useState([
    // Temporary mock data
    {
      id: 1,
      timestamp: '2024-03-20 10:30:45',
      user: 'admin@example.com',
      action: 'create',
      resource: 'Student',
      details: 'Created new student record',
      ipAddress: '192.168.1.1'
    },
    {
      id: 2,
      timestamp: '2024-03-20 11:15:22',
      user: 'coordinator@example.com',
      action: 'update',
      resource: 'Job',
      details: 'Updated job requirements',
      ipAddress: '192.168.1.2'
    }
  ]);

  const handleAuditAction = (action, data) => {
    switch (action) {
      case 'refresh':
        // Will be replaced with actual API call
        enqueueSnackbar('Logs refreshed', { variant: 'success' });
        break;
      case 'export':
        // Will be replaced with actual export functionality
        enqueueSnackbar('Exporting logs...', { variant: 'info' });
        break;
      case 'viewDetails':
        // Will be replaced with modal or drawer to show details
        console.log('View details:', data);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Typography 
        variant="h5" 
        sx={{ mb: 3, color: theme => theme.palette.text.primary }}
      >
        Audit Logs
      </Typography>
      <AuditLogViewer logs={logs} onAction={handleAuditAction} />
    </Box>
  );
};

export default Audit; 