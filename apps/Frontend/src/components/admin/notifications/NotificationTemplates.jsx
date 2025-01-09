import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';
  import {
    Add,
    Edit,
    Delete,
    ContentCopy
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const NotificationTemplates = ({ templates, onAction }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    const handleEdit = (template) => {
      setSelectedTemplate(template);
      setIsDialogOpen(true);
    };
  
    return (
      <>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Notification Templates
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleEdit(null)}
              >
                Create Template
              </Button>
            </Box>
  
            <Grid container spacing={3}>
              {templates.map((template) => (
                <Grid item xs={12} md={6} key={template.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start">
                        <Typography variant="subtitle1" gutterBottom>
                          {template.name}
                        </Typography>
                        <Box>
                          <IconButton size="small" onClick={() => onAction('copy', template)}>
                            <ContentCopy fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleEdit(template)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => onAction('delete', template)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography color="textSecondary" variant="body2" gutterBottom>
                        {template.description}
                      </Typography>
                      <Box mt={1}>
                        <Chip
                          label={template.type}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={`${template.variables.length} variables`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
  
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedTemplate ? 'Edit Template' : 'Create Template'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Template Name"
                defaultValue={selectedTemplate?.name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                defaultValue={selectedTemplate?.description}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Template Content"
                defaultValue={selectedTemplate?.content}
                helperText="Use {{variable}} for dynamic content"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onAction(selectedTemplate ? 'update' : 'create', selectedTemplate);
                setIsDialogOpen(false);
              }}
            >
              {selectedTemplate ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };