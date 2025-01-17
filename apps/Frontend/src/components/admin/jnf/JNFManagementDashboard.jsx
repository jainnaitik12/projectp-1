// components/admin/jnf/JNFManagementDashboard.jsx
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Alert,
    Tabs,
    Tab,
    Badge
  } from '@mui/material';
  import {
    Add,
    MoreVert,
    FilterList,
    Search,
    Download,
    Edit,
    Delete,
    Visibility,
    CheckCircle,
    Warning,
    Schedule,
    Business
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const JNFManagementDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJNF, setSelectedJNF] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
  
    // Sample data
    const jnfStats = {
      total: 50,
      pending: 8,
      active: 32,
      closed: 10
    };
  
    const recentJNFs = [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Software Engineer',
        package: '15-20 LPA',
        status: 'pending',
        applications: 45,
        deadline: '2024-03-15'
      },
      // Add more JNFs...
    ];
  
    const getStatusColor = (status) => {
      const colors = {
        pending: 'warning',
        active: 'success',
        closed: 'error',
        draft: 'default'
      };
      return colors[status] || 'default';
    };
  
    const JNFStatusCard = ({ title, count, color, icon }) => (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4">
                {count}
              </Typography>
            </Box>
            <Box 
              sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: `${color}.light`,
                color: `${color}.main`
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  
    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">JNF Management</Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {/* Handle new JNF */}}
            >
              New JNF
            </Button>
            <IconButton onClick={() => setFilterDialog(true)}>
              <FilterList />
            </IconButton>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>
  
        {/* JNF Statistics */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <JNFStatusCard
              title="Total JNFs"
              count={jnfStats.total}
              color="primary"
              icon={<Business />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <JNFStatusCard
              title="Pending Review"
              count={jnfStats.pending}
              color="warning"
              icon={<Schedule />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <JNFStatusCard
              title="Active"
              count={jnfStats.active}
              color="success"
              icon={<CheckCircle />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <JNFStatusCard
              title="Closed"
              count={jnfStats.closed}
              color="error"
              icon={<Warning />}
            />
          </Grid>
        </Grid>
  
        {/* JNF Tabs */}
        <Card>
          <CardContent>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="All JNFs" />
              <Tab 
                label={
                  <Badge badgeContent={jnfStats.pending} color="warning">
                    Pending Review
                  </Badge>
                }
              />
              <Tab label="Active" />
              <Tab label="Closed" />
            </Tabs>
  
            {/* Search and Filter */}
            <Box display="flex" gap={2} mb={2}>
              <TextField
                size="small"
                placeholder="Search JNFs..."
                InputProps={{
                  startAdornment: <Search color="action" />
                }}
                sx={{ flexGrow: 1 }}
              />
            </Box>
  
            {/* JNF Table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentJNFs.map((jnf) => (
                  <TableRow key={jnf.id}>
                    <TableCell>{jnf.company}</TableCell>
                    <TableCell>{jnf.position}</TableCell>
                    <TableCell>{jnf.package}</TableCell>
                    <TableCell>{jnf.applications}</TableCell>
                    <TableCell>{jnf.deadline}</TableCell>
                    <TableCell>
                      <Chip
                        label={jnf.status}
                        color={getStatusColor(jnf.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => {
                        setSelectedJNF(jnf);
                        setAnchorEl(e.currentTarget);
                      }}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  
        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => {
            setViewDialog(true);
            setAnchorEl(null);
          }}>
            <Visibility sx={{ mr: 1 }} /> View Details
          </MenuItem>
          <MenuItem onClick={() => {/* Handle edit */}}>
            <Edit sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => {/* Handle delete */}}>
            <Delete sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
  
        {/* View JNF Dialog */}
        <Dialog
          open={viewDialog}
          onClose={() => setViewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            JNF Details
            <IconButton
              onClick={() => setViewDialog(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedJNF && (
              <Grid container spacing={2}>
                {/* Add JNF details here */}
              </Grid>
            )}
          </DialogContent>
        </Dialog>
  
        {/* Filter Dialog */}
        <Dialog
          open={filterDialog}
          onClose={() => setFilterDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Filter JNFs</DialogTitle>
          <DialogContent>
            {/* Add filter options here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => {
              // Apply filters
              setFilterDialog(false);
            }}>
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };