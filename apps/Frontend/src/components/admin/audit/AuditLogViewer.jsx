import { useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import {
  Visibility,
  Download,
  Search,
  FilterList
} from '@mui/icons-material';
import { AuditDetailsDialog } from './AuditDetailsDialog';

export const AuditLogViewer = ({ logs, onAction }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLog, setSelectedLog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLog(null);
  };

  const getActionColor = (action) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'success';
      case 'update':
        return 'info';
      case 'delete':
        return 'error';
      case 'auth':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
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
        <Button
          variant="outlined"
          startIcon={<FilterList />}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => onAction('export')}
        >
          Export
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Resource</TableCell>
            <TableCell>IP Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>
                  <Chip 
                    label={log.action}
                    size="small"
                    color={getActionColor(log.action)}
                  />
                </TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell>{log.ipAddress}</TableCell>
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
        count={logs.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      <AuditDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        logData={selectedLog}
      />
    </Card>
  );
};
  