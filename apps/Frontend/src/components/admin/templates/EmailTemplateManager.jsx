import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Tooltip,
    Tab,
    Tabs
  } from '@mui/material';
  import {
    Add,
    Edit,
    Delete,
    ContentCopy,
    Preview,
    Code,
    Save
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const EmailTemplateManager = () => {
    const [templates, setTemplates] = useState([
      {
        id: 1,
        name: 'JNF Approval',
        subject: 'JNF Approval Notification',
        type: 'company',
        variables: ['companyName', 'jnfId', 'approvalDate'],
        lastModified: '2024-02-20'
      },
      // More templates...
    ]);
  
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [editDialog, setEditDialog] = useState(false);
    const [previewDialog, setPreviewDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
  
    const TemplateEditor = () => (
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTemplate ? 'Edit Template' : 'Create Template'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Name"
                defaultValue={selectedTemplate?.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Type"
                select
                SelectProps={{
                  native: true
                }}
                defaultValue={selectedTemplate?.type || ''}
              >
                <option value="company">Company</option>
                <option value="student">Student</option>
                <option value="system">System</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                defaultValue={selectedTemplate?.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                sx={{ mb: 2 }}
              >
                <Tab label="Design" />
                <Tab label="Code" />
                <Tab label="Preview" />
              </Tabs>
              {currentTab === 0 && (
                // Rich text editor component would go here
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  placeholder="Template content..."
                />
              )}
              {currentTab === 1 && (
                <Box
                  sx={{
                    bgcolor: 'grey.900',
                    color: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    fontFamily: 'monospace'
                  }}
                >
                  {/* HTML code view */}
                  <pre>{'<div>Template HTML here</div>'}</pre>
                </Box>
              )}
              {currentTab === 2 && (
                <Box
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    p: 2,
                    borderRadius: 1,
                    minHeight: 300
                  }}
                >
                  {/* Preview content */}
                  Preview of the email template
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Available Variables
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedTemplate?.variables.map((variable) => (
                  <Chip
                    key={variable}
                    label={`{{${variable}}}`}
                    onClick={() => {/* Insert variable at cursor */}}
                    size="small"
                  />
                ))}
                <Chip
                  icon={<Add />}
                  label="Add Variable"
                  onClick={() => {/* Open variable dialog */}}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<Preview />}
            onClick={() => setPreviewDialog(true)}
          >
            Preview
          </Button>
          <Button onClick={() => setEditDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={() => {
              // Save template logic
              setEditDialog(false);
            }}
          >
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    );
  
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Email Templates</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setSelectedTemplate(null);
                setEditDialog(true);
              }}
            >
              Create Template
            </Button>
          </Box>
  
          <List>
            {templates.map((template) => (
              <ListItem
                key={template.id}
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <ListItemText
                  primary={template.name}
                  secondary={
                    <Box>
                      <Typography variant="body2">
                        {template.subject}
                      </Typography>
                      <Box display="flex" gap={1} mt={0.5}>
                        <Chip
                          label={template.type}
                          size="small"
                          color="primary"
                        />
                        <Typography variant="caption" color="textSecondary">
                          Last modified: {template.lastModified}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Preview">
                    <IconButton
                      onClick={() => {
                        setSelectedTemplate(template);
                        setPreviewDialog(true);
                      }}
                    >
                      <Preview />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedTemplate(template);
                        setEditDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Duplicate">
                    <IconButton>
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
  
          {/* Template Editor Dialog */}
          <TemplateEditor />
  
          {/* Preview Dialog */}
          <Dialog
            open={previewDialog}
            onClose={() => setPreviewDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Template Preview</DialogTitle>
            <DialogContent>
              {/* Preview content */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPreviewDialog(false)}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  };
  