// components/admin/communication/MessageTrackingDashboard.jsx
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
    Chip,
    IconButton,
    Button,
    LinearProgress,
    Tooltip,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';
  import {
    Refresh,
    MoreVert,
    Email,
    Sms,
    Error,
    CheckCircle,
    Schedule,
    FilterList,
    Download,
    Visibility
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const MessageTrackingDashboard = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [detailsDialog, setDetailsDialog] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
  
    // Demo data - would come from Redux/API in real app
    const stats = {
      total: 1000,
      delivered: 850,
      failed: 50,
      pending: 100,
      opened: 400
    };
  
    const messages = [
      {
        id: 1,
        type: 'email',
        subject: 'Placement Drive Update',
        recipients: 250,
        delivered: 240,
        opened: 180,
        failed: 10,
        sentAt: '2024-02-20T10:00:00Z',
        status: 'completed'
      },
      // More messages...
    ];
  
    const DeliveryStats = ({ stats }) => (
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Sent
              </Typography>
              <Typography variant="h4">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Delivered
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.delivered}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.delivered/stats.total) * 100}
                color="success"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Failed
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.failed}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.failed/stats.total) * 100}
                color="error"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Open Rate
              </Typography>
              <Typography variant="h4" color="primary.main">
                {Math.round((stats.opened/stats.delivered) * 100)}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.opened/stats.delivered) * 100}
                color="primary"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  
    const MessageList = ({ messages }) => (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Subject/Content</TableCell>
            <TableCell>Recipients</TableCell>
            <TableCell>Delivery Status</TableCell>
            <TableCell>Sent At</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>
                <Tooltip title={message.type === 'email' ? 'Email' : 'SMS'}>
                  {message.type === 'email' ? (
                    <Email color="primary" />
                  ) : (
                    <Sms color="secondary" />
                  )}
                </Tooltip>
              </TableCell>
              <TableCell>{message.subject}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  {message.recipients}
                  <Tooltip title="Delivery Details">
                    <Box>
                      <Typography variant="caption" color="success.main">
                        {message.delivered} delivered
                      </Typography>
                      {message.failed > 0 && (
                        <Typography variant="caption" color="error.main">
                          , {message.failed} failed
                        </Typography>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(message.delivered/message.recipients) * 100}
                    sx={{ width: 100 }}
                  />
                  <Typography variant="body2">
                    {Math.round((message.delivered/message.recipients) * 100)}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {new Date(message.sentAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={message.status}
                  color={message.status === 'completed' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={(event) => {
                    setSelectedMessage(message);
                    setMenuAnchor(event.currentTarget);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Message Tracking</Typography>
            <Box display="flex" gap={1}>
              <Button
                startIcon={<FilterList />}
              >
                Filter
              </Button>
              <Button
                startIcon={<Download />}
              >
                Export
              </Button>
              <IconButton>
                <Refresh />
              </IconButton>
            </Box>
          </Box>
  
          <DeliveryStats stats={stats} />
  
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Message History
            </Typography>
            <MessageList messages={messages} />
          </Box>
  
          {/* Action Menu */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => {
              setDetailsDialog(true);
              setMenuAnchor(null);
            }}>
              <ListItemIcon>
                <Visibility fontSize="small" />
              </ListItemIcon>
              View Details
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Download fontSize="small" />
              </ListItemIcon>
              Download Report
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Refresh fontSize="small" />
              </ListItemIcon>
              Retry Failed
            </MenuItem>
          </Menu>
  
          {/* Details Dialog */}
          <Dialog
            open={detailsDialog}
            onClose={() => setDetailsDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Message Details</DialogTitle>
            <DialogContent>
              {selectedMessage && (
                <Grid container spacing={2}>
                  {/* Add detailed message information */}
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialog(false)}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  };