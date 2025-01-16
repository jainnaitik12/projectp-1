// components/admin/communication/CommunicationLogs.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Email,
  Sms,
  CheckCircle,
  Error,
  Schedule
} from '@mui/icons-material';
import { useState } from 'react';

export const CommunicationLogs = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle color="success" fontSize="small" />;
      case 'failed':
        return <Error color="error" fontSize="small" />;
      case 'scheduled':
        return <Schedule color="info" fontSize="small" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'email' ? <Email fontSize="small" /> : <Sms fontSize="small" />;
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Communication Logs</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search communications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="sms">SMS</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject/Content</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getTypeIcon(log.type)}
                    <Typography variant="body2">
                      {log.type.toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{log.recipient}</TableCell>
                <TableCell>{log.subject}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(log.status)}
                    <Chip 
                      label={log.status} 
                      size="small"
                      color={
                        log.status === 'delivered' 
                          ? 'success' 
                          : log.status === 'failed' 
                          ? 'error' 
                          : 'default'
                      }
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
  
 