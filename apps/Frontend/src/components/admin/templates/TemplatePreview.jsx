import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Desktop,
  PhoneAndroid,
  Tablet,
  Print,
  Download,
  Send,
  Refresh,
  Code
} from '@mui/icons-material';
import { useState } from 'react';

const TemplatePreview = ({ template, onClose }) => {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  const [testData, setTestData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  // Sample test data for different variable categories
  const sampleData = {
    student: {
      studentName: 'John Doe',
      rollNumber: 'CSE001',
      branch: 'Computer Science',
      semester: '6th',
      cgpa: '8.5'
    },
    company: {
      companyName: 'Tech Corp',
      position: 'Software Engineer',
      package: '12 LPA',
      location: 'Bangalore'
    },
    placement: {
      interviewDate: '2024-03-20',
      interviewTime: '10:00 AM',
      venue: 'Main Campus',
      requirements: 'Laptop, ID Card'
    }
  };

  const handleDeviceChange = (device) => {
    setActiveDevice(device);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendTest = () => {
    setOpenDialog(true);
  };

  const getPreviewWidth = () => {
    switch (activeDevice) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  const renderPreviewContent = () => {
    // Replace variables in template content with test data
    let content = template.content;
    Object.entries(testData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return (
      <Box
        sx={{
          width: getPreviewWidth(),
          margin: '0 auto',
          border: activeDevice !== 'desktop' ? '1px solid #ccc' : 'none',
          height: activeDevice === 'mobile' ? '667px' : 'auto',
          overflow: 'auto'
        }}
      >
        {template.type === 'email' && (
          <Box p={2} bgcolor="#f5f5f5">
            <Typography variant="subtitle2">Subject:</Typography>
            <Typography>{template.subject}</Typography>
          </Box>
        )}
        <Box p={2}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      </Box>
    );
  };

  const renderVariablesTester = () => (
    <Grid container spacing={2}>
      {Object.entries(sampleData).map(([category, variables]) => (
        <Grid item xs={12} key={category}>
          <Typography variant="subtitle1" gutterBottom>
            {category.charAt(0).toUpperCase() + category.slice(1)} Variables
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(variables).map(([key, defaultValue]) => (
              <Grid item xs={12} md={6} key={key}>
                <TextField
                  fullWidth
                  label={key}
                  defaultValue={defaultValue}
                  onChange={(e) => setTestData({
                    ...testData,
                    [key]: e.target.value
                  })}
                />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {/* Preview Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <IconButton
            color={activeDevice === 'desktop' ? 'primary' : 'default'}
            onClick={() => handleDeviceChange('desktop')}
          >
            <Desktop />
          </IconButton>
          <IconButton
            color={activeDevice === 'tablet' ? 'primary' : 'default'}
            onClick={() => handleDeviceChange('tablet')}
          >
            <Tablet />
          </IconButton>
          <IconButton
            color={activeDevice === 'mobile' ? 'primary' : 'default'}
            onClick={() => handleDeviceChange('mobile')}
          >
            <PhoneAndroid />
          </IconButton>
        </Box>
        <Box>
          <Button startIcon={<Print />}>
            Print
          </Button>
          <Button startIcon={<Download />}>
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleSendTest}
          >
            Send Test
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Paper sx={{ mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Preview" value="preview" />
                  <Tab label="HTML" value="html" />
                  <Tab label="Plain Text" value="text" />
                </Tabs>
              </Paper>

              {activeTab === 'preview' && renderPreviewContent()}
              {activeTab === 'html' && (
                <Box component="pre" sx={{ overflow: 'auto' }}>
                  <code>{template.content}</code>
                </Box>
              )}
              {activeTab === 'text' && (
                <Box component="pre" sx={{ overflow: 'auto' }}>
                  {/* Convert HTML to plain text */}
                  {template.content.replace(/<[^>]*>/g, '')}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Test Variables
              </Typography>
              {renderVariablesTester()}
              <Button
                fullWidth
                startIcon={<Refresh />}
                onClick={() => setTestData({})}
                sx={{ mt: 2 }}
              >
                Reset Variables
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Send Test Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Send Test</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Test Email"
                type="email"
                sx={{ mt: 1 }}
              />
            </Grid>
            {template.type === 'email' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  defaultValue={template.subject}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Handle send test
              setOpenDialog(false);
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplatePreview; 