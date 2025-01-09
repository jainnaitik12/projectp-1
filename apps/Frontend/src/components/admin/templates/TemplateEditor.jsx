import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Save,
  Preview,
  History,
  Code,
  Send,
  ArrowBack,
  AddCircleOutline,
  Settings,
  Help
} from '@mui/icons-material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TemplateEditor = ({ template, onSave, onBack }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    category: template?.category || '',
    type: template?.type || 'email',
    subject: template?.subject || '',
    content: template?.content || '',
    variables: template?.variables || [],
    status: template?.status || 'active',
    settings: template?.settings || {
      allowHtml: true,
      trackOpens: true,
      trackClicks: true,
      requireUnsubscribe: false,
      attachments: true
    }
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [previewData, setPreviewData] = useState({});

  // Available variables for different template types
  const availableVariables = {
    student: ['studentName', 'rollNumber', 'branch', 'semester', 'cgpa'],
    company: ['companyName', 'position', 'package', 'location'],
    placement: ['interviewDate', 'interviewTime', 'venue', 'requirements'],
    general: ['instituteName', 'date', 'time', 'signature']
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  const handleVariableInsert = (variable) => {
    const variableTag = `{{${variable}}}`;
    // Insert at cursor position in ReactQuill
    // Implementation depends on your rich text editor
  };

  const handlePreview = () => {
    setDialogType('preview');
    setOpenDialog(true);
  };

  const handleSendTest = () => {
    setDialogType('test');
    setOpenDialog(true);
  };

  const handleVersionHistory = () => {
    setDialogType('history');
    setOpenDialog(true);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
        >
          Back to Templates
        </Button>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<History />}
            onClick={handleVersionHistory}
          >
            Version History
          </Button>
          <Button
            startIcon={<Preview />}
            onClick={handlePreview}
          >
            Preview
          </Button>
          <Button
            startIcon={<Send />}
            onClick={handleSendTest}
          >
            Send Test
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={() => onSave(formData)}
          >
            Save Template
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Template Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Template Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) => handleChange('category', e.target.value)}
                    >
                      <MenuItem value="placement">Placement</MenuItem>
                      <MenuItem value="academic">Academic</MenuItem>
                      <MenuItem value="general">General</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={formData.type}
                      label="Type"
                      onChange={(e) => handleChange('type', e.target.value)}
                    >
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="sms">SMS</MenuItem>
                      <MenuItem value="letter">Letter</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {formData.type === 'email' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Template Settings */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.settings.allowHtml}
                    onChange={(e) => handleSettingsChange('allowHtml', e.target.checked)}
                  />
                }
                label="Allow HTML"
              />
              {formData.type === 'email' && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings.trackOpens}
                        onChange={(e) => handleSettingsChange('trackOpens', e.target.checked)}
                      />
                    }
                    label="Track Opens"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.settings.trackClicks}
                        onChange={(e) => handleSettingsChange('trackClicks', e.target.checked)}
                      />
                    }
                    label="Track Clicks"
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Template Content */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <ReactQuill
                value={formData.content}
                onChange={(content) => handleChange('content', content)}
                modules={modules}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Variables Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Variables
              </Typography>
              {Object.entries(availableVariables).map(([category, vars]) => (
                <Box key={category} mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {vars.map((variable) => (
                      <Chip
                        key={variable}
                        label={variable}
                        onClick={() => handleVariableInsert(variable)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'preview' ? 'Template Preview' :
           dialogType === 'test' ? 'Send Test' :
           'Version History'}
        </DialogTitle>
        <DialogContent>
          {/* Add appropriate content based on dialog type */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Close
          </Button>
          {dialogType === 'test' && (
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Send Test
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateEditor; 