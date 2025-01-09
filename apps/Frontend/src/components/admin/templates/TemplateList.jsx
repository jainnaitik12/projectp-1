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
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  InputAdornment
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  FileCopy,
  MoreVert,
  Visibility,
  Download
} from '@mui/icons-material';
import { useState } from 'react';

const TemplateList = ({ onTemplateSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Sample template data
  const templates = [
    {
      id: 1,
      name: 'Offer Letter',
      category: 'Placement',
      type: 'email',
      lastModified: '2024-03-15T10:30:00',
      status: 'active',
      variables: ['studentName', 'companyName', 'position', 'salary'],
      usage: 156
    },
    {
      id: 2,
      name: 'Interview Schedule',
      category: 'Placement',
      type: 'email',
      lastModified: '2024-03-14T15:45:00',
      status: 'active',
      variables: ['studentName', 'companyName', 'date', 'time', 'location'],
      usage: 234
    },
    // Add more templates...
  ];

  const handleMenuOpen = (event, template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const handleDuplicate = () => {
    console.log('Duplicating template:', selectedTemplate);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Deleting template:', selectedTemplate);
    handleMenuClose();
  };

  return (
    <Grid container spacing={3}>
      {/* Search and Actions */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" gap={2}>
              <TextField
                placeholder="Search templates..."
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
                variant="contained"
                startIcon={<Add />}
                onClick={() => onTemplateSelect(null)}
              >
                Create Template
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Template List */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Template Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Last Modified</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {templates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {template.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {template.variables.length} variables
                        </Typography>
                      </TableCell>
                      <TableCell>{template.category}</TableCell>
                      <TableCell>
                        <Chip
                          label={template.type}
                          size="small"
                          color={template.type === 'email' ? 'primary' : 'secondary'}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(template.lastModified).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={template.status}
                          size="small"
                          color={template.status === 'active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{template.usage}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => onTemplateSelect(template)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, template)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={templates.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => onTemplateSelect(selectedTemplate)}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          Preview
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <FileCopy fontSize="small" />
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          Export
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default TemplateList; 