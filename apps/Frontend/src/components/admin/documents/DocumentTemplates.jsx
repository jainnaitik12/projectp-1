import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import {
  Description,
  Download,
  Edit,
  Delete,
  MoreVert,
  Add
} from '@mui/icons-material';
import { useState } from 'react';

const DocumentTemplates = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'Offer Letter Template',
      description: 'Standard offer letter format for companies',
      lastModified: '2024-02-15'
    },
    {
      id: 2,
      name: 'Company Registration Form',
      description: 'Template for new company registration',
      lastModified: '2024-02-10'
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

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Document Templates</Typography>
          <Button startIcon={<Add />} variant="contained">
            Create Template
          </Button>
        </Box>

        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box display="flex" gap={1} alignItems="center">
                      <Description color="primary" />
                      <Typography variant="subtitle2">
                        {template.name}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, template)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {template.description}
                  </Typography>

                  <Typography variant="caption" color="textSecondary">
                    Last modified: {new Date(template.lastModified).toLocaleDateString()}
                  </Typography>
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
              <Download fontSize="small" />
            </ListItemIcon>
            Download
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

export default DocumentTemplates; 