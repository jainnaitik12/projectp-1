import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Download,
  CheckCircle,
  Error,
  Warning,
  Info
} from '@mui/icons-material';

export const AutomationLogs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all'
  });

  // Sample logs data
  const logs = [
    {
      id: 1,
      timestamp: '2024-03-20 10:30:45',
      type: 'workflow',
      action: 'JNF Approval',
      status: 'success',
      details: 'Successfully processed JNF for Company XYZ',
      metadata: {
        workflowId: 'wf_123',
        triggeredBy: 'system',
        company: 'XYZ Corp',
        processingTime: '2.3s'
      }
    },
    {
      id: 2,
      timestamp: '2024-03-20 10:15:22',
      type: 'email',
      action: 'Welcome Email',
      status: 'failed',
      details: 'Failed to send welcome email to student',
      metadata: {
        templateId: 'email_001',
        recipient: 'student@example.com',
        error: 'SMTP connection failed'
      }
    },
    {
      id: 3,
      timestamp: '2024-03-20 09:45:15',
      type: 'task',
      action: 'Document Verification',
      status: 'warning',
      details: 'Document verification pending review',
      metadata: {
        taskId: 'task_789',
        assignee: 'tpo_admin',
        deadline: '2024-03-21 09:45:15'
      }
    }
  ];

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLog(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle fontSize="small" />;
      case 'failed':
        return <Error fontSize="small" />;
      case 'warning':
        return <Warning fontSize="small" />;
      default:
        return <Info fontSize="small" />;
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting logs...');
  };

  const filteredLogs = logs.filter(log => {
    if (filters.type !== 'all' && log.type !== filters.type) return false;
    if (filters.status !== 'all' && log.status !== filters.status) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(searchLower) ||
        log.details.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Automation Logs</Typography>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Export Logs
            </Button>
          </Box>

          <Box display="flex" gap={2} mb={3}>
            <TextField
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                label="Type"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="workflow">Workflow</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="task">Task</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Details</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Chip label={log.type} size="small" />
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(log.status)}
                        label={log.status}
                        size="small"
                        color={getStatusColor(log.status)}
                      />
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(log)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredLogs.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Log Details</DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Timestamp
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedLog.timestamp}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Type
              </Typography>
              <Chip label={selectedLog.type} size="small" sx={{ mt: 0.5 }} />

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Action
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedLog.action}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Status
              </Typography>
              <Chip
                icon={getStatusIcon(selectedLog.status)}
                label={selectedLog.status}
                size="small"
                color={getStatusColor(selectedLog.status)}
                sx={{ mt: 0.5 }}
              />

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedLog.details}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Metadata
              </Typography>
              <Box sx={{ bgcolor: 'background.default', p: 1, borderRadius: 1, mt: 0.5 }}>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AutomationLogs; 