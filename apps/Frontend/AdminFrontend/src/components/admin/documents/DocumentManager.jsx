// components/admin/documents/DocumentManager.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Visibility,
  Edit,
  Delete,
  Share,
  Description,
  PictureAsPdf,
  InsertDriveFile,
  MoreVert
} from '@mui/icons-material';
import { useState } from 'react';

const DocumentManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = [
    {
      id: 1,
      name: 'Placement Policy 2024',
      type: 'pdf',
      size: '2.5 MB',
      uploadedBy: 'Admin',
      uploadedAt: '2024-02-20',
      category: 'Policy',
      access: 'All Students'
    },
    {
      id: 2,
      name: 'Company Registration Form',
      type: 'docx',
      size: '1.2 MB',
      uploadedBy: 'Placement Officer',
      uploadedAt: '2024-02-18',
      category: 'Template',
      access: 'Staff Only'
    },
    // Add more documents...
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'docx':
        return <Description color="primary" />;
      default:
        return <InsertDriveFile />;
    }
  };

  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoc(null);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Document Manager</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search documents..."
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
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {documents.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box display="flex" gap={1} alignItems="center">
                      {getFileIcon(doc.type)}
                      <Typography variant="subtitle2" noWrap>
                        {doc.name}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, doc)}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={doc.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="textSecondary">
                      {doc.size}
                    </Typography>
                  </Box>
                  
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary" display="block">
                      Uploaded by: {doc.uploadedBy}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" display="block">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            View
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Download fontSize="small" />
            </ListItemIcon>
            Download
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Share fontSize="small" />
            </ListItemIcon>
            Share
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Delete</Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default DocumentManager;
  
  