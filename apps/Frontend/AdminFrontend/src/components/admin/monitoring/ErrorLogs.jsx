import {
    Card,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    Menu,
    MenuItem
  } from '@mui/material';
  import {
    Error,
    Warning,
    Info,
    Search,
    FilterList,
    Download,
    MoreVert
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const ErrorLogs = ({ logs, onAction }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLog, setSelectedLog] = useState(null);
    const [filters, setFilters] = useState({
      severity: 'all',
      timeRange: 'today'
    });
  
    const getSeverityIcon = (severity) => {
      switch(severity.toLowerCase()) {
        case 'error':
          return <Error color="error" />;
        case 'warning':
          return <Warning color="warning" />;
        case 'info':
          return <Info color="info" />;
        default:
          return null;
      }
    };
  
    const handleMenuOpen = (event, log) => {
      setAnchorEl(event.currentTarget);
      setSelectedLog(log);
    };
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Error Logs</Typography>
            <Box display="flex" gap={1}>
              <Button
                startIcon={<FilterList />}
                onClick={() => onAction('filter')}
              >
                Filter
              </Button>
              <Button
                startIcon={<Download />}
                onClick={() => onAction('export')}
              >
                Export
              </Button>
            </Box>
          </Box>
  
          <Box mb={3}>
            <TextField
              fullWidth
              placeholder="Search logs..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Box>
  
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getSeverityIcon(log.severity)}
                        label={log.severity}
                        size="small"
                        color={log.severity.toLowerCase()}
                      />
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, log)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => onAction('view', selectedLog)}>
              View Details
            </MenuItem>
            <MenuItem onClick={() => onAction('resolve', selectedLog)}>
              Mark as Resolved
            </MenuItem>
            <MenuItem onClick={() => onAction('delete', selectedLog)}>
              Delete Log
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>
    );
  };