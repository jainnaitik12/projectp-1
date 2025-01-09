import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Chip,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Divider,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Search,
  FilterList,
  Edit,
  Delete,
  Download,
  Mail,
  Person,
  Sort,
  Clear,
  Save,
  MoreVert
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import studentService from '../../../services/admin/studentService';
import { useAudit } from '../../../hooks/admin/useAudit';

const StudentList = ({ onStudentSelect }) => {
  const { logEvent } = useAudit();
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    batch: [],
    branch: [],
    section: [],
    status: [],
    gender: [],
    placementStatus: [],
    cgpaRange: [0, 10],
    backlogsRange: [0, 10],
    hasInternship: null,
    hasProjects: null,
    hasCertifications: null,
    activeBacklogs: null,
    eligibilityStatus: [],
    offerStatus: [],
    interviewStatus: [],
    skillTags: [],
    location: [],
    category: [],
    admissionType: [],
    feesStatus: [],
    hostelStatus: []
  });

  // State for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc'
  });

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter options
  const filterOptions = {
    batch: ['2020-24', '2021-25', '2022-26', '2023-27'],
    branch: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
    section: ['A', 'B', 'C', 'D'],
    status: ['Active', 'Inactive', 'Alumni', 'Suspended'],
    gender: ['Male', 'Female', 'Other'],
    placementStatus: ['Placed', 'Unplaced', 'Not Eligible', 'Opted Out'],
    eligibilityStatus: ['Eligible', 'Not Eligible', 'Conditional'],
    offerStatus: ['No Offers', 'Single Offer', 'Multiple Offers'],
    interviewStatus: ['Scheduled', 'Completed', 'Not Started'],
    skillTags: ['Python', 'Java', 'React', 'Node.js', 'Machine Learning'],
    location: ['On Campus', 'Off Campus'],
    category: ['General', 'OBC', 'SC', 'ST'],
    admissionType: ['Regular', 'Management Quota', 'Sports Quota'],
    feesStatus: ['Paid', 'Pending', 'Defaulter'],
    hostelStatus: ['Day Scholar', 'Hosteller']
  };

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNo: 'CSE001',
      batch: '2020-24',
      branch: 'CSE',
      section: 'A',
      cgpa: 8.5,
      backlogs: 0,
      placementStatus: 'Placed',
      // ... add more fields
    },
    // Add more students
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    logEvent('filter', 'StudentList', `Applied filter: ${field} = ${value}`);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      batch: [],
      branch: [],
      // ... reset all filters
    });
  };

  const handleSaveFilters = () => {
    // Save current filters as preset
    console.log('Saving filters:', filters);
  };

  const handleEditStudent = async (student, event) => {
    event.stopPropagation();
    try {
      // Your existing edit logic
      logEvent('update', 'Student', `Initiated edit for student: ${student.name} (${student.rollNo})`);
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  const handleSendEmail = async (student, event) => {
    event.stopPropagation();
    try {
      // Your existing email logic
      logEvent('communication', 'Student', `Sent email to student: ${student.name} (${student.rollNo})`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleDeleteStudent = async (student, event) => {
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await studentService.deleteStudent(student.id);
        logEvent('delete', 'Student', `Deleted student: ${student.name} (${student.rollNo})`);
        // Refresh student list or provide feedback
      } catch (error) {
        console.error('Failed to delete student:', error);
        alert('Failed to delete student');
      }
    }
  };

  const handleExport = async () => {
    try {
      // Your export logic here
      logEvent('export', 'StudentList', 'Exported student data');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  // Filter drawer content
  const filterDrawerContent = (
    <Box sx={{ width: 320, p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Box>
          <IconButton onClick={handleClearFilters} title="Clear filters">
            <Clear />
          </IconButton>
          <IconButton onClick={handleSaveFilters} title="Save filters">
            <Save />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Academic Filters */}
      <Typography variant="subtitle1" gutterBottom>
        Academic Details
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Batch</InputLabel>
        <Select
          multiple
          value={filters.batch}
          onChange={(e) => handleFilterChange('batch', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {filterOptions.batch.map((batch) => (
            <MenuItem key={batch} value={batch}>
              {batch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Branch</InputLabel>
        <Select
          multiple
          value={filters.branch}
          onChange={(e) => handleFilterChange('branch', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {filterOptions.branch.map((branch) => (
            <MenuItem key={branch} value={branch}>
              {branch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom>CGPA Range</Typography>
      <Slider
        value={filters.cgpaRange}
        onChange={(e, newValue) => handleFilterChange('cgpaRange', newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
        step={0.1}
      />

      <Typography gutterBottom>Backlogs</Typography>
      <Slider
        value={filters.backlogsRange}
        onChange={(e, newValue) => handleFilterChange('backlogsRange', newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={10}
      />

      {/* Placement Filters */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Placement Status
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Placement Status</InputLabel>
        <Select
          multiple
          value={filters.placementStatus}
          onChange={(e) => handleFilterChange('placementStatus', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {filterOptions.placementStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.hasInternship}
              onChange={(e) => handleFilterChange('hasInternship', e.target.checked)}
            />
          }
          label="Has Internship Experience"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.hasCertifications}
              onChange={(e) => handleFilterChange('hasCertifications', e.target.checked)}
            />
          }
          label="Has Certifications"
        />
      </FormGroup>

      {/* Additional Filters */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Additional Filters
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          multiple
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {filterOptions.category.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Fees Status</InputLabel>
        <Select
          multiple
          value={filters.feesStatus}
          onChange={(e) => handleFilterChange('feesStatus', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {filterOptions.feesStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      {/* Search and Filters */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                placeholder="Search students..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
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
                onClick={() => setDrawerOpen(true)}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
              >
                Export
              </Button>
            </Box>

            {/* Active Filters Display */}
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {Object.entries(filters).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  return value.map((v) => (
                    <Chip
                      key={`${key}-${v}`}
                      label={`${key}: ${v}`}
                      onDelete={() => {
                        const newValue = filters[key].filter(item => item !== v);
                        handleFilterChange(key, newValue);
                      }}
                      size="small"
                    />
                  ));
                }
                return null;
              })}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Student List */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>CGPA</TableCell>
                  <TableCell>Placement Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell onClick={() => onStudentSelect(student)}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar>
                          <Person />
                        </Avatar>
                        {student.name}
                      </Box>
                    </TableCell>
                    <TableCell onClick={() => onStudentSelect(student)}>{student.rollNo}</TableCell>
                    <TableCell onClick={() => onStudentSelect(student)}>{student.batch}</TableCell>
                    <TableCell onClick={() => onStudentSelect(student)}>{student.branch}</TableCell>
                    <TableCell onClick={() => onStudentSelect(student)}>{student.cgpa}</TableCell>
                    <TableCell onClick={() => onStudentSelect(student)}>
                      <Chip
                        label={student.placementStatus}
                        color={student.placementStatus === 'Placed' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(event) => handleEditStudent(student, event)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={(event) => handleSendEmail(student, event)}>
                        <Mail />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={(event) => handleDeleteStudent(student, event)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {filterDrawerContent}
      </Drawer>
    </Grid>
  );
};

export default StudentList;